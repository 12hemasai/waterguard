
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const { incidentId } = await request.json();

    if (typeof incidentId !== "string" || !incidentId.trim()) {
      return NextResponse.json(
        { error: "incidentId is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("incidents")
      .update({
        status: "VERIFYING",
        repair_submitted_at: new Date().toISOString(),
      })
      .eq("id", incidentId)
      .in("status", ["OPEN", "ASSIGNED", "IN_REPAIR", "REOPENED"])
      .select("id, status, repair_submitted_at")
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { error: "Incident not found or not eligible for repair submission." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Repair submitted. Waiting for sensor verification.",
      incident: data,
    });
  } catch (error) {
    console.error("Repair submission error:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Repair submission failed." },
      { status: 500 }
    );
  }
}
