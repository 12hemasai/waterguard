import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const [workersResult, sensorsResult, incidentsResult] =
      await Promise.all([
        supabaseAdmin
          .from("workers")
          .select("*", { count: "exact" }),
        supabaseAdmin.from("sensors").select("*"),
        supabaseAdmin
          .from("incidents")
          .select("*")
          .order("detected_at", { ascending: false }),
      ]);

    console.log("WORKERS RESULT:", JSON.stringify(workersResult, null, 2));

    if (workersResult.error) throw workersResult.error;
    if (sensorsResult.error) throw sensorsResult.error;
    if (incidentsResult.error) throw incidentsResult.error;

    return NextResponse.json({
      success: true,
      workers: workersResult.data ?? [],
      workersCount: workersResult.count,
      sensors: sensorsResult.data ?? [],
      incidents: incidentsResult.data ?? [],
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not load dashboard data.",
      },
      { status: 500 }
    );
  }
}
