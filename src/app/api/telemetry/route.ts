
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const FLOW_TOLERANCE = 0.20;
const REQUIRED_NORMAL_READINGS = 3;

const ACTIVE_STATUSES = [
  "DETECTED",
  "OPEN",
  "ASSIGNED",
  "IN_REPAIR",
  "VERIFYING",
  "REOPENED",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sensorId, location } = body;

    if (
      typeof sensorId !== "string" ||
      !sensorId.trim() ||
      typeof location !== "string" ||
      !location.trim() ||
      body.flowRate === null ||
      body.flowRate === undefined ||
      body.flowRate === ""
    ) {
      return NextResponse.json(
        { error: "sensorId, location and flowRate are required." },
        { status: 400 }
      );
    }

    const flowRate = Number(body.flowRate);

    if (!Number.isFinite(flowRate) || flowRate < 0) {
      return NextResponse.json(
        { error: "flowRate must be a non-negative number." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Get this sensor's expected flow.
    const { data: existingSensor, error: sensorLookupError } =
      await supabaseAdmin
        .from("sensors")
        .select("id, expected_flow")
        .eq("id", sensorId)
        .maybeSingle();

    if (sensorLookupError) throw sensorLookupError;

    const expectedFlow = Number(existingSensor?.expected_flow ?? 10);

    if (!Number.isFinite(expectedFlow) || expectedFlow <= 0) {
      return NextResponse.json(
        { error: "Expected flow must be greater than zero." },
        { status: 400 }
      );
    }

    // High flow indicates a possible leak.
    // Low flow alone does not create a leak ticket.
    const upperLimit = expectedFlow * (1 + FLOW_TOLERANCE);
    const isLeak = flowRate > upperLimit;
    const anomalyPercent =
      ((flowRate - expectedFlow) / expectedFlow) * 100;

    // Save the latest sensor reading.
    const { error: sensorError } = await supabaseAdmin
      .from("sensors")
      .upsert(
        {
          id: sensorId,
          location,
          expected_flow: expectedFlow,
          flow_rate: flowRate,
          status: isLeak ? "DETECTED" : "NORMAL",
          last_reading_at: now,
        },
        { onConflict: "id" }
      );

    if (sensorError) throw sensorError;

    // Store the reading.
    const { error: telemetryError } = await supabaseAdmin
      .from("telemetry")
      .insert({
        sensor_id: sensorId,
        flow_rate: flowRate,
        is_anomaly: isLeak,
        recorded_at: now,
      });

    if (telemetryError) throw telemetryError;

    // Find an unresolved incident for this sensor.
    const { data: activeIncident, error: incidentLookupError } =
      await supabaseAdmin
        .from("incidents")
        .select("id, status, repair_submitted_at")
        .eq("sensor_id", sensorId)
        .in("status", ACTIVE_STATUSES)
        .order("detected_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (incidentLookupError) throw incidentLookupError;

    let incidentCreated = false;
    let incidentReopened = false;
    let incidentVerified = false;
    let incidentId = activeIncident?.id ?? null;

    const awaitingVerification =
      activeIncident !== null &&
      (
        activeIncident.status === "VERIFYING" ||
        activeIncident.repair_submitted_at !== null
      );

    if (!activeIncident && isLeak) {
      // Create a ticket for a newly detected leak.
      const { data: createdIncident, error } = await supabaseAdmin
        .from("incidents")
        .insert({
          sensor_id: sensorId,
          description:
            `Possible water leak. Current flow: ${flowRate} L/min. ` +
            `Expected flow: ${expectedFlow} L/min. ` +
            `Above expected by ${anomalyPercent.toFixed(1)}%.`,
          status: "OPEN",
          detected_at: now,
        })
        .select("id")
        .single();

      if (error) throw error;

      incidentId = createdIncident.id;
      incidentCreated = true;
    } else if (activeIncident && awaitingVerification) {
      if (isLeak) {
        // Leakage persists after repair: reopen the same ticket.
        const { error } = await supabaseAdmin
          .from("incidents")
          .update({
            status: "REOPENED",
            description:
              `Repair verification failed. High flow persists. ` +
              `Current: ${flowRate} L/min; expected: ${expectedFlow} L/min.`,
          })
          .eq("id", activeIncident.id);

        if (error) throw error;

        incidentReopened = true;
      } else {
        // Count consecutive normal readings after repair submission.
        const repairTimestamp = activeIncident.repair_submitted_at;

        if (repairTimestamp) {
          const { data: readings, error } = await supabaseAdmin
            .from("telemetry")
            .select("is_anomaly, recorded_at")
            .eq("sensor_id", sensorId)
            .gte("recorded_at", repairTimestamp)
            .order("recorded_at", { ascending: false })
            .limit(REQUIRED_NORMAL_READINGS);

          if (error) throw error;

          const enoughNormalReadings =
            readings !== null &&
            readings.length === REQUIRED_NORMAL_READINGS &&
            readings[0]?.is_anomaly === false &&
            readings.every((reading) => reading.is_anomaly === false);

          if (enoughNormalReadings) {
            const { error: updateError } = await supabaseAdmin
              .from("incidents")
              .update({
                  status: "VERIFIED",
                  verified_at: new Date().toISOString(),
                  description: "Repair verified successfully. Three consecutive normal readings confirmed.",
                })
              .eq("id", activeIncident.id);

            if (updateError) throw updateError;

            incidentVerified = true;
          }
        }
      }
    } else if (activeIncident && isLeak) {
      // Keep an unresolved incident open; do not create duplicates.
      if (
        activeIncident.status === "OPEN" ||
        activeIncident.status === "DETECTED" ||
        activeIncident.status === "REOPENED"
      ) {
        const { error } = await supabaseAdmin
          .from("incidents")
          .update({
            description:
              `Possible water leak. Current flow: ${flowRate} L/min. ` +
              `Expected flow: ${expectedFlow} L/min.`,
          })
          .eq("id", activeIncident.id);

        if (error) throw error;
      }
    }

    return NextResponse.json({
      success: true,
      sensorId,
      flowRate,
      expectedFlow,
      upperLimit: Number(upperLimit.toFixed(2)),
      anomalyPercent: Number(anomalyPercent.toFixed(1)),
      status: isLeak ? "DETECTED" : "NORMAL",
      incidentId,
      incidentCreated,
      incidentReopened,
      incidentVerified,
    });
  } catch (error) {
    console.error("Telemetry API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Telemetry processing failed.",
      },
      { status: 500 }
    );
  }
}

