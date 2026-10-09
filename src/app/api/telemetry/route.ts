
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sensorId, location } = body;
    const flowRate = Number(body.flowRate);
    const threshold = Number(process.env.WATERGUARD_FLOW_THRESHOLD ?? 10);

    if (
      typeof sensorId !== "string" ||
      !sensorId.trim() ||
      typeof location !== "string" ||
      !location.trim() ||
      !Number.isFinite(flowRate) ||
      flowRate < 0
    ) {
      return NextResponse.json(
        { error: "Invalid sensor data." },
        { status: 400 }
      );
    }

    const isAnomaly = flowRate > threshold;
    const now = new Date().toISOString();

    const { error: sensorError } = await supabaseAdmin
      .from("sensors")
      .upsert(
        {
          id: sensorId,
          location,
          flow_rate: flowRate,
          status: isAnomaly ? "DETECTED" : "NORMAL",
          last_reading_at: now,
        },
        { onConflict: "id" }
      );

    if (sensorError) throw sensorError;

    const { error: telemetryError } = await supabaseAdmin
      .from("telemetry")
      .insert({
        sensor_id: sensorId,
        flow_rate: flowRate,
        is_anomaly: isAnomaly,
        recorded_at: now,
      });

    if (telemetryError) throw telemetryError;

    let incidentCreated = false;

    if (isAnomaly) {
      const { data: activeIncident, error: lookupError } =
        await supabaseAdmin
          .from("incidents")
          .select("id")
          .eq("sensor_id", sensorId)
          .in("status", ["DETECTED", "OPEN", "IN_REPAIR", "VERIFYING", "REOPENED"])
          .limit(1)
          .maybeSingle();

      if (lookupError) throw lookupError;

      if (!activeIncident) {
        const { error: incidentError } = await supabaseAdmin
          .from("incidents")
          .insert({
            sensor_id: sensorId,
            description: `Abnormal flow: ${flowRate}. Threshold: ${threshold}.`,
            status: "OPEN",
            detected_at: now,
          });

        if (incidentError) throw incidentError;
        incidentCreated = true;
      }
    }

    return NextResponse.json({
      success: true,
      sensorId,
      flowRate,
      threshold,
      status: isAnomaly ? "DETECTED" : "NORMAL",
      incidentCreated,
    });
  } catch (error) {
    console.error("Telemetry API error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
