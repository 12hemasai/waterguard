"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Droplets,
  Gauge,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Worker = {
  name: string;
  role: string;
  initials: string;
  status: "In Repair" | "Assigned" | "On Route" | "Available";
  sector: string;
  sensor: string;
  incident: string;
  task: string;
  currentFlow: string;
  expectedFlow: string;
  anomaly: string;
  eta: string;
  progress: number;
  repairs: number;
  efficiency: string;
  verification: string;
};

const workers: Worker[] = [
  {
    name: "Ravi Kumar",
    role: "Field Technician",
    initials: "RK",
    status: "In Repair",
    sector: "Sector 03",
    sensor: "WG-S03-07",
    incident: "WG-042",
    task: "Pipeline leak repair",
    currentFlow: "2.1 L/min",
    expectedFlow: "12.0 L/min",
    anomaly: "82.5%",
    eta: "8 min",
    progress: 68,
    repairs: 18,
    efficiency: "96%",
    verification: "Waiting for repair",
  },
  {
    name: "Suresh Babu",
    role: "Maintenance Engineer",
    initials: "SB",
    status: "Assigned",
    sector: "Sector 01",
    sensor: "WG-S01-03",
    incident: "WG-018",
    task: "Pressure inspection",
    currentFlow: "8.4 L/min",
    expectedFlow: "11.8 L/min",
    anomaly: "28.8%",
    eta: "14 min",
    progress: 35,
    repairs: 24,
    efficiency: "94%",
    verification: "Not started",
  },
  {
    name: "Manoj Reddy",
    role: "Field Technician",
    initials: "MR",
    status: "On Route",
    sector: "Sector 05",
    sensor: "WG-S05-11",
    incident: "WG-027",
    task: "Sensor replacement",
    currentFlow: "0.0 L/min",
    expectedFlow: "9.6 L/min",
    anomaly: "100%",
    eta: "21 min",
    progress: 18,
    repairs: 15,
    efficiency: "91%",
    verification: "Sensor offline",
  },
  {
    name: "Anjali Devi",
    role: "Maintenance Engineer",
    initials: "AD",
    status: "Available",
    sector: "—",
    sensor: "—",
    incident: "—",
    task: "Available for assignment",
    currentFlow: "—",
    expectedFlow: "—",
    anomaly: "—",
    eta: "—",
    progress: 0,
    repairs: 21,
    efficiency: "98%",
    verification: "Ready",
  },
];

const statusConfig = {
  "In Repair": {
    text: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dot: "bg-emerald-400",
  },
  Assigned: {
    text: "text-cyan-300",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    dot: "bg-cyan-400",
  },
  "On Route": {
    text: "text-orange-300",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    dot: "bg-orange-400",
  },
  Available: {
    text: "text-slate-300",
    bg: "bg-white/5",
    border: "border-white/10",
    dot: "bg-slate-400",
  },
};

function Glass({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#04121ae8] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: Worker["status"] }) {
  const s = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[9px] font-semibold ${s.text} ${s.bg} ${s.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Glass className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-slate-600">{detail}</p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/10">
          <Icon size={17} className="text-cyan-300" />
        </div>
      </div>
    </Glass>
  );
}

export default function WorkersPage() {
  return (
    <main className="min-h-screen bg-[#02090e] text-white">
      {/* HEADER */}
      <header className="border-b border-white/[0.08] px-5 py-7 lg:px-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              <Users size={14} />
              WaterGuard / Field Operations
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Maintenance Workers
            </h1>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">
              Field teams responding to sensor-detected water
              infrastructure incidents.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-[10px] font-bold text-[#021017] shadow-[0_0_30px_rgba(34,211,238,.18)] transition hover:bg-cyan-200">
            <Wrench size={15} />
            Assign Worker
          </button>
        </div>
      </header>

      <div className="space-y-6 p-5 lg:p-8">
        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total Workers"
            value="24"
            detail="Registered field team"
          />

          <StatCard
            icon={Activity}
            label="Active Workers"
            value="17"
            detail="Responding to incidents"
          />

          <StatCard
            icon={Wrench}
            label="Repairs Today"
            value="12"
            detail="8 sensor verified"
          />

          <StatCard
            icon={ShieldCheck}
            label="Team Efficiency"
            value="96.2%"
            detail="+3.4% this week"
          />
        </div>

        {/* DATA FLOW */}
        <Glass className="overflow-hidden">
          <div className="border-b border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-cyan-300" />

              <h2 className="text-xs font-semibold text-white">
                WaterGuard Response Chain
              </h2>
            </div>

            <p className="mt-1 text-[9px] text-slate-600">
              Every field assignment originates from a detected sensor
              anomaly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-5">
            {[
              ["01", "Sensor", "Detect anomaly"],
              ["02", "Sector", "Identify zone"],
              ["03", "Incident", "Create ticket"],
              ["04", "Worker", "Dispatch repair"],
              ["05", "Verification", "Confirm recovery"],
            ].map(([number, title, description], index) => (
              <div key={title} className="relative">
                <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.025] p-4">
                  <span className="text-[8px] font-bold text-cyan-300">
                    {number}
                  </span>

                  <p className="mt-2 text-[11px] font-semibold">
                    {title}
                  </p>

                  <p className="mt-1 text-[8px] text-slate-600">
                    {description}
                  </p>
                </div>

                {index < 4 && (
                  <ArrowRight
                    size={12}
                    className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-cyan-300/40 md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </Glass>

        {/* SEARCH */}
        <Glass className="flex flex-col gap-3 p-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
            />

            <input
              placeholder="Search worker, sensor, sector or incident..."
              className="h-11 w-full rounded-xl border border-white/[0.06] bg-white/[0.025] pl-11 pr-4 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/20"
            />
          </div>

          <button className="h-11 rounded-xl border border-white/10 px-5 text-[9px] text-slate-400 hover:bg-white/5 hover:text-white">
            All Workers
          </button>

          <button className="h-11 rounded-xl border border-white/10 px-5 text-[9px] text-slate-400 hover:bg-white/5 hover:text-white">
            Active
          </button>
        </Glass>

        {/* WORKER CARDS */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-sm font-semibold">Field Team</h2>

              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-600">
                Sensor-linked assignments
              </p>
            </div>

            <div className="flex items-center gap-2 text-[8px] uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live telemetry
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {workers
  .filter(
    (worker, index, list) =>
      list.findIndex((item) => item.name === worker.name) === index
  )
  .map((worker, index) => (
              <motion.div
                key={worker.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.35 }}
              >
                <Glass className="overflow-hidden">
                  <div className="p-5">
                    {/* WORKER */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-xs font-bold text-cyan-300">
                            {worker.initials}
                          </div>

                          <span
                            className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#04121a] ${
                              statusConfig[worker.status].dot
                            }`}
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold">
                            {worker.name}
                          </h3>

                          <p className="mt-1 text-[9px] text-slate-500">
                            {worker.role}
                          </p>

                          <div className="mt-2">
                            <StatusBadge status={worker.status} />
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[8px] uppercase tracking-wider text-slate-600">
                          ETA
                        </p>

                        <p className="mt-1 text-xs font-semibold text-white">
                          {worker.eta}
                        </p>
                      </div>
                    </div>

                    {/* SOURCE */}
                    <div className="mt-5 rounded-xl border border-cyan-300/10 bg-cyan-300/[0.025] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets
                            size={14}
                            className="text-cyan-300"
                          />

                          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-300">
                            Detection Source
                          </span>
                        </div>

                        {worker.sensor !== "—" && (
                          <span className="rounded-md bg-cyan-300/10 px-2 py-1 text-[8px] font-semibold text-cyan-300">
                            SENSOR ONLINE
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-[8px] uppercase tracking-wider text-slate-600">
                            Sector
                          </p>

                          <p className="mt-1 text-xs font-semibold">
                            {worker.sector}
                          </p>
                        </div>

                        <div>
                          <p className="text-[8px] uppercase tracking-wider text-slate-600">
                            Sensor
                          </p>

                          <p className="mt-1 text-xs font-semibold text-cyan-300">
                            {worker.sensor}
                          </p>
                        </div>

                        <div>
                          <p className="text-[8px] uppercase tracking-wider text-slate-600">
                            Incident
                          </p>

                          <p className="mt-1 text-xs font-semibold text-red-300">
                            {worker.incident}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TELEMETRY */}
                    {worker.sensor !== "—" && (
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                          <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-slate-600">
                            <Gauge size={12} />
                            Current
                          </div>

                          <p className="mt-2 text-sm font-semibold text-red-300">
                            {worker.currentFlow}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                          <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-slate-600">
                            <Activity size={12} />
                            Expected
                          </div>

                          <p className="mt-2 text-sm font-semibold text-white">
                            {worker.expectedFlow}
                          </p>
                        </div>

                        <div className="rounded-xl border border-red-400/10 bg-red-400/[0.025] p-3">
                          <div className="text-[8px] uppercase tracking-wider text-slate-600">
                            Anomaly
                          </div>

                          <p className="mt-2 text-sm font-semibold text-red-300">
                            {worker.anomaly}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* INCIDENT */}
                    <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <div>
                        <p className="text-[8px] uppercase tracking-wider text-slate-600">
                          Active assignment
                        </p>

                        <p className="mt-1 text-xs font-semibold text-white">
                          {worker.task}
                        </p>

                        <p className="mt-1 text-[9px] text-slate-500">
                          {worker.sector} · {worker.incident}
                        </p>
                      </div>

                      <Wrench
                        size={17}
                        className="text-cyan-300"
                      />
                    </div>

                    {/* PROGRESS */}
                    {worker.progress > 0 && (
                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[8px] uppercase tracking-[0.15em] text-slate-600">
                            Repair progress
                          </span>

                          <span className="text-[9px] font-semibold text-cyan-300">
                            {worker.progress}%
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${worker.progress}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3 + index * 0.05,
                            }}
                            className="h-full rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,.65)]"
                          />
                        </div>
                      </div>
                    )}

                    {/* VERIFICATION */}
                    <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-400/10 bg-emerald-400/[0.025] p-3">
                      <div className="flex items-center gap-3">
                        <ShieldCheck
                          size={16}
                          className={
                            worker.verification === "Sensor offline"
                              ? "text-red-300"
                              : "text-emerald-300"
                          }
                        />

                        <div>
                          <p className="text-[8px] uppercase tracking-wider text-slate-600">
                            Sensor verification
                          </p>

                          <p className="mt-1 text-[9px] font-semibold text-white">
                            {worker.verification}
                          </p>
                        </div>
                      </div>

                      {worker.verification === "Waiting for repair" ? (
                        <Clock3
                          size={15}
                          className="text-orange-300"
                        />
                      ) : worker.verification === "Sensor offline" ? (
                        <Zap
                          size={15}
                          className="text-red-300"
                        />
                      ) : (
                        <CheckCircle2
                          size={15}
                          className="text-emerald-300"
                        />
                      )}
                    </div>

                    {/* FOOTER METRICS */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-[8px] uppercase tracking-wider text-slate-600">
                            Repairs
                          </p>
                          <p className="mt-1 text-xs font-semibold">
                            {worker.repairs}
                          </p>
                        </div>

                        <div>
                          <p className="text-[8px] uppercase tracking-wider text-slate-600">
                            Efficiency
                          </p>
                          <p className="mt-1 text-xs font-semibold text-emerald-300">
                            {worker.efficiency}
                          </p>
                        </div>
                      </div>

                      <button className="flex items-center gap-2 text-[9px] font-semibold text-cyan-300 hover:text-cyan-200">
                        View incident
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </section>

        {/* VERIFICATION PRINCIPLE */}
        <Glass className="overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10">
                  <ShieldCheck
                    size={19}
                    className="text-cyan-300"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Sensor-confirmed repairs
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-slate-600">
                    WaterGuard verification principle
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-[10px] leading-5 text-slate-500">
                Workers can report that a repair is complete, but
                WaterGuard does not automatically close the incident.
                The same infrastructure sensor must observe stable
                flow before the incident becomes verified.
              </p>
            </div>

            <div className="border-t border-white/[0.06] p-6 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-emerald-300">
                    78
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-wider text-slate-600">
                    Verified
                  </p>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div className="text-center">
                  <p className="text-2xl font-semibold text-cyan-300">
                    04
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-wider text-slate-600">
                    Verifying
                  </p>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div className="text-center">
                  <p className="text-2xl font-semibold text-red-300">
                    02
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-wider text-slate-600">
                    Reopened
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Glass>
      </div>
    </main>
  );
}