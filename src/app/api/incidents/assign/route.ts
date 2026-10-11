import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const { incidentId, workerId } = await request.json();

    if (!incidentId || !workerId) {
      return NextResponse.json(
        { success: false, error: "Incident ID and worker ID are required." },
        { status: 400 }
      );
    }

    const { data: worker, error: workerError } = await supabaseAdmin
      .from("workers")
      .select("id, name")
      .eq("id", workerId)
      .maybeSingle();

    if (workerError) throw workerError;

    if (!worker) {
      return NextResponse.json(
        { success: false, error: "Worker not found." },
        { status: 404 }
      );
    }

    const { data: incident, error: incidentError } = await supabaseAdmin
      .from("incidents")
      .select("id, status")
      .eq("id", incidentId)
      .maybeSingle();

    if (incidentError) throw incidentError;

    if (!incident) {
      return NextResponse.json(
        { success: false, error: "Incident not found." },
        { status: 404 }
      );
    }

    if (!["OPEN", "DETECTED", "REOPENED", "ASSIGNED"].includes(incident.status)) {
      return NextResponse.json(
        { success: false, error: "This incident cannot be assigned in its current status." },
        { status: 409 }
      );
    }

    const { data: updatedIncident, error: updateError } = await supabaseAdmin
      .from("incidents")
      .update({
        assigned_worker_id: worker.id,
        status: "ASSIGNED",
      })
      .eq("id", incidentId)
      .select("id, sensor_id, status, assigned_worker_id")
      .maybeSingle();

    if (updateError) throw updateError;

    if (!updatedIncident || updatedIncident.assigned_worker_id !== worker.id) {
      console.error("Assignment was not persisted:", updatedIncident);

      return NextResponse.json(
        {
          success: false,
          error: "The database did not confirm that the worker assignment was saved.",
          incident: updatedIncident,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Incident assigned to ${worker.name}.`,
      incident: updatedIncident,
    });
  } catch (error) {
    console.error("Assign incident error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Could not assign incident.",
      },
      { status: 500 }
    );
  }
}
