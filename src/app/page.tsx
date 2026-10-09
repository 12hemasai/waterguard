"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Droplets,
  Factory,
  Gauge,
  Globe2,
  LayoutDashboard,
  Map,
  Menu,
  MessageSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
  Users,
  Waves,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Page =
  | "Dashboard"
  | "Live Network"
  | "Incidents"
  | "Workers"
  | "Repairs"
  | "Analytics"
  | "Impact";

const navItems: {
  name: Page;
  icon: LucideIcon;
}[] = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Live Network", icon: Activity },
  { name: "Incidents", icon: AlertTriangle },
  { name: "Workers", icon: Users },
  { name: "Repairs", icon: Wrench },
  { name: "Analytics", icon: BarChart3 },
  { name: "Impact", icon: Globe2 },
];

const workers = [
  {
    name: "Ravi Kumar",
    status: "In Progress",
    color: "green",
    incident: "WG-042",
    sector: "Sector 03",
    initials: "RK",
  },
  {
    name: "Suresh Babu",
    status: "Assigned",
    color: "blue",
    incident: "WG-018",
    sector: "Sector 01",
    initials: "SB",
  },
  {
    name: "Manoj Reddy",
    status: "On Route",
    color: "orange",
    incident: "WG-027",
    sector: "Sector 05",
    initials: "MR",
  },
  {
    name: "Anjali Devi",
    status: "Available",
    color: "green",
    incident: "—",
    sector: "—",
    initials: "AD",
  },
];

const incidents = [
  {
    id: "WG-042",
    sector: "Sector 03",
    type: "LEAK",
    probability: "72%",
    time: "2 min ago",
    severity: "critical",
  },
  {
    id: "WG-018",
    sector: "Sector 01",
    type: "LOW PRESSURE",
    probability: "48%",
    time: "14 min ago",
    severity: "warning",
  },
  {
    id: "WG-027",
    sector: "Sector 05",
    type: "SENSOR FAULT",
    probability: "36%",
    time: "1 hour ago",
    severity: "normal",
  },
];

function Glass({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-cyan-300/15 bg-[#03131be8] shadow-[0_0_35px_rgba(0,180,255,.06)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  action?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/5">
          <Icon size={18} className="text-cyan-300" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>

          {subtitle && (
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && (
        <button className="text-[10px] font-medium text-cyan-300 transition hover:text-white">
          {action} →
        </button>
      )}
    </div>
  );
}

function StatusDot({
  status,
}: {
  status: "green" | "red" | "orange" | "blue";
}) {
  const styles = {
    green:
      "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]",
    red: "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,.9)]",
    orange:
      "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,.9)]",
    blue: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.9)]",
  };

  return <span className={`h-2 w-2 rounded-full ${styles[status]}`} />;
}

/* ----------------------------- */
/* SIDEBAR */
/* ----------------------------- */

function Sidebar({
  current,
  setCurrent,
  open,
  setOpen,
}: {
  current: Page;
  setCurrent: (page: Page) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 w-[245px] border-r border-cyan-300/10 bg-[#020d14]/95 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center border-b border-white/10 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10">
            <Droplets
              size={24}
              className="text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,.8)]"
            />
          </div>

          <div className="ml-3">
            <div className="text-sm font-bold tracking-[0.2em]">
              WATERGUARD
            </div>

            <div className="text-[8px] tracking-[0.15em] text-slate-500">
              AUTONOMOUS WATER PROTECTION
            </div>
          </div>

          <button
            className="ml-auto lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        <div className="px-3 py-6">
          <div className="mb-3 px-3 text-[9px] uppercase tracking-[0.2em] text-slate-600">
            Command Center
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = current === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrent(item.name);
                    setOpen(false);
                  }}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs transition ${
                    active
                      ? "bg-cyan-300/10 text-cyan-300"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]"
                    />
                  )}

                  <Icon
                    size={18}
                    className={
                      active
                        ? "text-cyan-300"
                        : "text-slate-500 group-hover:text-slate-300"
                    }
                  />

                  <span>{item.name}</span>

                  {item.name === "Incidents" && (
                    <span className="ml-auto rounded-full bg-red-500/20 px-2 py-0.5 text-[9px] font-bold text-red-400">
                      3
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs text-slate-400 hover:bg-white/[0.04] hover:text-white">
            <Settings size={18} />
            Settings
          </button>

          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-bold text-cyan-300">
              K
            </div>

            <div className="min-w-0">
              <div className="truncate text-xs font-semibold text-white">
                Command Operator
              </div>
              <div className="text-[9px] text-slate-500">
                System Administrator
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ----------------------------- */
/* TOP BAR */
/* ----------------------------- */

function TopBar({ setOpen }: { setOpen: (value: boolean) => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-white/10 bg-[#020b12]/80 px-4 backdrop-blur-2xl lg:ml-[245px] lg:px-7">
      <button
        className="mr-4 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu size={23} />
      </button>

      <div className="hidden text-xs text-slate-400 sm:block">
        WaterGuard /{" "}
        <span className="text-white">Command Center</span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden items-center gap-2 md:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
          <span className="text-[10px] text-slate-300">
            Network Operational
          </span>
        </div>

        <button className="relative rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white">
          <Bell size={18} />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/20 text-[10px] font-bold text-violet-200">
          K
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- */
/* HERO */
/* ----------------------------- */

function Hero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden border-b border-cyan-300/10">
      <img
        src="/waterguard-environment.jpg"
        alt="WaterGuard infrastructure"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,8,14,.9)_0%,rgba(1,8,14,.4)_42%,rgba(1,8,14,.2)_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(1,8,14,.95)_0%,transparent_60%)]" />

      {/* animated atmospheric glow */}
      <motion.div
        className="absolute inset-0 bg-cyan-400/[0.035] mix-blend-screen"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* HERO TEXT */}
      <div className="relative z-10 max-w-[650px] px-6 pb-20 pt-20 lg:px-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-9 bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />

          <span className="text-[10px] font-semibold tracking-[0.22em] text-cyan-300">
            AI-POWERED WATER PROTECTION
          </span>
        </div>

        <h1 className="text-[clamp(3.2rem,6vw,6rem)] font-black leading-[.85] tracking-[-0.06em]">
          PROTECT
          <br />
          EVERY{" "}
          <span className="text-cyan-300 drop-shadow-[0_0_35px_rgba(34,211,238,.6)]">
            DROP.
          </span>
        </h1>

        <p className="mt-6 max-w-[480px] text-sm leading-6 text-slate-200">
          Real-time intelligence for water infrastructure.
          <br />
          Detect loss. Coordinate repairs. Independently verify recovery.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-3 rounded-xl bg-cyan-300 px-6 py-3.5 text-xs font-bold text-[#021017] shadow-[0_0_35px_rgba(34,211,238,.25)] transition hover:bg-cyan-200 hover:shadow-[0_0_55px_rgba(34,211,238,.45)]">
            View Live Network
            <ChevronRight size={16} />
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-white/[0.04] px-5 py-3.5 text-xs font-semibold text-cyan-300 backdrop-blur transition hover:border-cyan-300/50 hover:bg-white/[0.07]">
            <Activity size={14} />
            Live Status
          </button>
        </div>
        <div className="mt-8 flex items-center gap-6">
          {[["12", "Sensors Active"], ["3", "Incidents"], ["97.4%", "Uptime"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-lg font-bold text-white">{val}</div>
              <div className="text-[9px] uppercase tracking-widest text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SENSOR CARD */}
      <div className="absolute right-5 top-6 z-20 hidden w-[220px] rounded-2xl border border-cyan-300/20 bg-[#03141be8] p-4 backdrop-blur-xl md:block lg:right-7">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white">
            Live Sensors
          </span>
          <Activity size={17} className="text-cyan-300" />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            ["12", "Total", "green"],
            ["11", "Online", "green"],
            ["01", "Anomaly", "red"],
            ["00", "Offline", "blue"],
          ].map(([value, label, status]) => (
            <div key={label} className="text-center">
              <div className="flex justify-center">
                <StatusDot
                  status={status as "green" | "red" | "blue"}
                />
              </div>

              <div className="mt-1 text-lg font-semibold text-white">
                {value}
              </div>

              <div className="text-[8px] text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INFRASTRUCTURE LABELS */}
      <div className="absolute bottom-[25%] left-[23%] z-20 hidden rounded-xl border border-cyan-300/25 bg-[#03141be8] px-4 py-3 backdrop-blur-xl md:block">
        <div className="flex items-center gap-3">
          <Waves className="text-cyan-300" size={20} />
          <div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500">
              Reservoir
            </div>
            <div className="text-sm font-semibold text-white">
              Level 78%
            </div>
          </div>
        </div>

        <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <div className="mt-1 text-[8px] text-emerald-400">? +2% since yesterday</div>
      </div>

      <div className="absolute bottom-[28%] left-[48%] z-20 hidden rounded-xl border border-cyan-300/25 bg-[#03141be8] px-4 py-3 backdrop-blur-xl md:block">
        <div className="flex items-center gap-3">
          <Factory className="text-cyan-300" size={20} />

          <div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500">
              Treatment Plant
            </div>

            <div className="text-sm font-semibold text-white">
              Flow: 12.4 L/s
            </div>

            <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-300">
              <StatusDot status="green" />
              Normal
            </div>
          </div>
        </div>
      </div>

      {/* LEAK */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(239,68,68,.12)",
            "0 0 45px rgba(239,68,68,.4)",
            "0 0 20px rgba(239,68,68,.12)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-[18%] right-[14%] z-20 w-[235px] rounded-2xl border border-red-400/40 bg-[#21070bdd] p-4 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <AlertTriangle className="text-red-400" size={22} />
          </motion.div>

          <div>
            <div className="text-xs font-bold text-red-400">
              Leak Detected
            </div>
            <div className="text-[10px] text-slate-300">
              Sector 03 · WG-042
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-between text-[10px]">
          <span className="text-slate-400">Probability</span>
          <span className="font-bold text-red-400">72%</span>
        </div>

        <div className="mt-2 h-1.5 rounded-full bg-red-950">
          <div className="h-full w-[72%] rounded-full bg-red-400 shadow-[0_0_12px_#ef4444]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px]">
          <span className="text-slate-500">Last detected: 2 min ago</span>
          <span className="flex items-center gap-1 text-red-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />Live</span>
        </div>
      </motion.div>

      {/* CITY */}
      <div className="absolute bottom-[23%] right-[1%] z-20 hidden rounded-xl border border-cyan-300/25 bg-[#03141be8] px-4 py-3 backdrop-blur-xl xl:block">
        <div className="flex items-center gap-3">
          <Building2 className="text-cyan-300" size={20} />

          <div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500">
              City Network
            </div>

            <div className="text-sm font-semibold text-white">
              Flow: 11.8 L/s
            </div>

            <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-300">
              <StatusDot status="green" />
              Stable
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- */
/* KPI ROW */
/* ----------------------------- */

function KPISection() {
  const data = [
    {
      icon: Droplets,
      value: "12,480 L",
      label: "Water Saved",
      trend: "+18%",
      danger: false,
    },
    {
      icon: ShieldCheck,
      value: "98.4%",
      label: "Network Health",
      trend: "+2.1%",
      danger: false,
    },
    {
      icon: AlertTriangle,
      value: "03",
      label: "Active Incidents",
      trend: "CRITICAL",
      danger: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {data.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl ${item.danger ? "border-red-400/25 bg-[#130a0a]/90" : "border-cyan-300/15 bg-[#03141be8]"}`}
          >
            {/* background glow */}
            <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full blur-2xl ${item.danger ? "bg-red-500/10" : "bg-cyan-400/8"}`} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.danger ? "border-red-400/20 bg-red-400/10" : "border-cyan-300/20 bg-cyan-300/8"}`}>
                  <Icon size={20} className={item.danger ? "text-red-400 drop-shadow-[0_0_8px_#ef4444]" : "text-cyan-300 drop-shadow-[0_0_8px_#22d3ee]"} />
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${item.danger ? "bg-red-500/15 text-red-400" : "bg-emerald-400/10 text-emerald-300"}`}>
                  {item.trend}
                </span>
              </div>
              <div className="mt-4 text-2xl font-bold text-white">{item.value}</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
              <div className={`mt-3 h-0.5 w-full rounded-full ${item.danger ? "bg-red-400/20" : "bg-cyan-300/10"}`}>
                <motion.div
                  className={`h-full rounded-full ${item.danger ? "bg-red-400" : "bg-cyan-300"}`}
                  animate={{ width: item.danger ? ["20%","35%","20%"] : ["60%","80%","60%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ----------------------------- */
/* FLOW ANALYTICS */
/* ----------------------------- */

function FlowAnalytics() {
  const points = [32, 40, 30, 46, 35, 52, 45, 61, 49, 58, 68, 54, 65, 57, 74, 62, 78, 68, 84, 71];

  return (
    <Glass className="p-5">
      <SectionTitle
        icon={Activity}
        title="Flow Analytics"
        subtitle="Live flow / L/s"
        action="Last 24 Hours"
      />

      <div className="relative h-[190px] overflow-hidden rounded-xl border border-white/5 bg-[#020c12]/70 p-4">
        {/* grid lines */}
        <div className="absolute inset-x-4 top-1/4 border-t border-white/[0.04]" />
        <div className="absolute inset-x-4 top-1/2 border-t border-white/[0.04]" />
        <div className="absolute inset-x-4 top-3/4 border-t border-white/[0.04]" />
        {/* y-axis labels */}
        <div className="absolute left-1 top-2 text-[8px] text-slate-600">84</div>
        <div className="absolute left-1 top-1/4 text-[8px] text-slate-600">63</div>
        <div className="absolute left-1 top-1/2 text-[8px] text-slate-600">42</div>
        <div className="absolute left-1 top-3/4 text-[8px] text-slate-600">21</div>
        {/* anomaly marker */}
        <div className="absolute top-2 right-3 flex items-center gap-1.5 rounded-full border border-red-400/20 bg-red-400/10 px-2 py-0.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
          <span className="text-[8px] font-semibold text-red-400">ANOMALY +5.1%</span>
        </div>
        <svg viewBox="0 0 700 180" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity=".4" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="areaRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity=".25" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* expected baseline */}
          <path d={`M 0 180 L ${points.map((p, i) => `${(i / (points.length - 1)) * 700} ${180 - (p * 0.92) * 1.65}`).join(" L ")} L 700 180 Z`} fill="url(#areaRed)" opacity="0.5" />
          <polyline points={points.map((p, i) => `${(i / (points.length - 1)) * 700},${180 - (p * 0.92) * 1.65}`).join(" ")} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
          {/* actual flow */}
          <path d={`M 0 180 L ${points.map((p, i) => `${(i / (points.length - 1)) * 700} ${180 - p * 1.65}`).join(" L ")} L 700 180 Z`} fill="url(#area)" />
          <polyline points={points.map((p, i) => `${(i / (points.length - 1)) * 700},${180 - p * 1.65}`).join(" ")} fill="none" stroke="#22d3ee" strokeWidth="2.5" filter="url(#lineGlow)" />
          {/* live dot at end */}
          <circle cx="700" cy={180 - points[points.length-1] * 1.65} r="4" fill="#22d3ee" filter="url(#lineGlow)" />
          <circle cx="700" cy={180 - points[points.length-1] * 1.65} r="7" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.03] p-3">
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Current Flow</div>
          <div className="mt-1 text-xl font-bold text-white">12.4 <span className="text-xs font-normal text-slate-400">L/s</span></div>
          <div className="mt-1.5 h-0.5 w-full rounded-full bg-white/5">
            <div className="h-full w-[74%] rounded-full bg-cyan-300/60" />
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Expected</div>
          <div className="mt-1 text-xl font-bold text-cyan-300">11.8 <span className="text-xs font-normal text-slate-400">L/s</span></div>
          <div className="mt-1.5 h-0.5 w-full rounded-full bg-white/5">
            <div className="h-full w-[70%] rounded-full bg-cyan-300/30" />
          </div>
        </div>
        <div className="rounded-xl border border-red-400/15 bg-red-400/[0.04] p-3">
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Deviation</div>
          <div className="mt-1 text-xl font-bold text-red-400">+5.1<span className="text-xs font-normal text-slate-400">%</span></div>
          <div className="mt-1.5 h-0.5 w-full rounded-full bg-white/5">
            <motion.div className="h-full rounded-full bg-red-400" animate={{ width: ["5%","20%","5%"] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </div>
      </div>
    </Glass>
  );
}

/* ----------------------------- */
/* NETWORK MAP */
/* ----------------------------- */

function NetworkMap() {
  const nodes = [
    [18, 65, "green"],
    [30, 45, "green"],
    [44, 68, "blue"],
    [56, 38, "green"],
    [68, 60, "red"],
    [80, 34, "green"],
    [87, 72, "green"],
    [50, 22, "blue"],
  ];

  const pipes = [
    "M18 65 L30 45 L44 68 L56 38 L68 60 L80 34 L87 72",
    "M44 68 L50 22 L56 38",
  ];

  return (
    <Glass className="p-5">
      <SectionTitle
        icon={Map}
        title="Network Map"
        subtitle="Infrastructure topology"
        action="All Zones"
      />

      <div className="relative h-[260px] overflow-hidden rounded-xl border border-cyan-300/10 bg-[#03121a]">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* radial glow center */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 55% 50%, rgba(34,211,238,0.05) 0%, transparent 70%)" }} />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* glow base pipes */}
          {pipes.map((d, i) => (
            <path key={`base-${i}`} d={d} fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.15" vectorEffect="non-scaling-stroke" />
          ))}

          {/* main pipes */}
          {pipes.map((d, i) => (
            <path key={`pipe-${i}`} d={d} fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.5" vectorEffect="non-scaling-stroke" filter="url(#glow)" />
          ))}

          {/* animated flow dots on pipe 1 */}
          <circle r="1.2" fill="#7ffcff" opacity="0.9" filter="url(#glow)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M18 65 L30 45 L44 68 L56 38 L68 60 L80 34 L87 72" />
          </circle>
          <circle r="1.2" fill="#7ffcff" opacity="0.9" filter="url(#glow)">
            <animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M18 65 L30 45 L44 68 L56 38 L68 60 L80 34 L87 72" />
          </circle>
          <circle r="1.2" fill="#7ffcff" opacity="0.9" filter="url(#glow)">
            <animateMotion dur="3s" begin="2s" repeatCount="indefinite" path="M18 65 L30 45 L44 68 L56 38 L68 60 L80 34 L87 72" />
          </circle>

          {/* animated flow dots on pipe 2 */}
          <circle r="1.2" fill="#7ffcff" opacity="0.9" filter="url(#glow)">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M44 68 L50 22 L56 38" />
          </circle>
          <circle r="1.2" fill="#7ffcff" opacity="0.9" filter="url(#glow)">
            <animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" path="M44 68 L50 22 L56 38" />
          </circle>

          {/* anomaly pulse rings */}
          <circle cx="68" cy="60" r="4" fill="#ef4444" opacity="0.12" />
          <circle cx="68" cy="60" r="3" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0.6">
            <animate attributeName="r" values="3;7;3" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="68" cy="60" r="3" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0.4">
            <animate attributeName="r" values="3;9;3" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* nodes */}
        {nodes.map(([x, y, color], index) => (
          <div key={index} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
            {color === "red" && (
              <motion.div
                className="absolute inset-0 rounded-full bg-red-400"
                animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 12, height: 12, marginLeft: -0, marginTop: -0 }}
              />
            )}
            <motion.div
              className={`h-3 w-3 rounded-full ${
                color === "red"
                  ? "bg-red-400 shadow-[0_0_12px_#ef4444]"
                  : color === "blue"
                    ? "bg-cyan-300 shadow-[0_0_12px_#22d3ee]"
                    : "bg-emerald-400 shadow-[0_0_12px_#34d399]"
              }`}
              animate={{ scale: color === "red" ? [1, 1.3, 1] : [0.9, 1.1, 0.9] }}
              transition={{ duration: color === "red" ? 1.2 : 2.5, repeat: Infinity }}
            />
          </div>
        ))}

        {/* live badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[9px] font-semibold uppercase tracking-widest text-emerald-400">Live</span>
        </div>

        {/* stats overlay */}
        <div className="absolute right-3 bottom-3 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-[9px] text-slate-400 backdrop-blur">
          <div className="flex flex-col gap-1">
            <span className="text-white font-semibold">8 Nodes</span>
            <span className="text-emerald-400">7 Operational</span>
            <span className="text-red-400">1 Anomaly</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-[9px] text-slate-400 backdrop-blur">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Normal
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              Anomaly
            </span>
            <span className="flex items-center gap-1">
              <span className="h-[2px] w-4 bg-cyan-300" />
              Pipeline
            </span>
          </div>
        </div>
      </div>
    </Glass>
  );
}

/* ----------------------------- */
/* INCIDENTS */
/* ----------------------------- */

function IncidentsPanel() {
  return (
    <Glass className="p-5">
      <SectionTitle
        icon={AlertTriangle}
        title="Active Incidents"
        subtitle="Requires attention"
        action="View All"
      />

      <div className="space-y-2.5">
        {incidents.map((incident, index) => (
          <motion.div
            key={incident.id}
            whileHover={{ x: 4, scale: 1.01 }}
            className={`relative overflow-hidden rounded-xl border p-3.5 ${
              incident.severity === "critical"
                ? "border-red-400/40 bg-red-500/[0.07]"
                : incident.severity === "warning"
                  ? "border-orange-400/30 bg-orange-500/[0.05]"
                  : "border-white/10 bg-white/[0.025]"
            }`}
          >
            {/* left accent bar */}
            <div className={`absolute left-0 top-0 h-full w-0.5 rounded-l-xl ${
              incident.severity === "critical" ? "bg-red-400" : incident.severity === "warning" ? "bg-orange-400" : "bg-cyan-300/40"
            }`} />

            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                incident.severity === "critical"
                  ? "bg-red-500/15 text-red-400"
                  : incident.severity === "warning"
                    ? "bg-orange-400/10 text-orange-400"
                    : "bg-cyan-300/10 text-cyan-300"
              }`}>
                {incident.severity === "critical" ? (
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                    <AlertTriangle size={17} />
                  </motion.div>
                ) : (
                  <Activity size={17} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">{incident.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                    incident.severity === "critical"
                      ? "bg-red-500/20 text-red-400"
                      : incident.severity === "warning"
                        ? "bg-orange-400/15 text-orange-400"
                        : "bg-white/10 text-slate-400"
                  }`}>{incident.type}</span>
                </div>
                <div className="mt-0.5 text-[10px] text-slate-500">{incident.sector}</div>
              </div>
            </div>

            <div className="mt-2.5">
              <div className="flex items-center justify-between text-[9px] mb-1">
                <span className="text-slate-500">Probability</span>
                <span className={`font-bold ${incident.severity === "critical" ? "text-red-400" : incident.severity === "warning" ? "text-orange-400" : "text-slate-400"}`}>{incident.probability}</span>
              </div>
              <div className="h-1 w-full rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full ${incident.severity === "critical" ? "bg-red-400 shadow-[0_0_6px_#ef4444]" : incident.severity === "warning" ? "bg-orange-400" : "bg-cyan-300/50"}`}
                  style={{ width: incident.probability }}
                />
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[8px] text-slate-600">{incident.time}</span>
              {incident.severity === "critical" && (
                <span className="flex items-center gap-1 text-[8px] text-red-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                  Monitoring
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Glass>
  );
}

/* ----------------------------- */
/* WORKERS */
/* ----------------------------- */

function WorkersPanel() {
  return (
    <Glass className="p-5">
      <SectionTitle
        icon={Users}
        title="Maintenance Workers"
        subtitle="Field operations"
        action="View All"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {workers.map((worker) => (
          <motion.div
            key={worker.name}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-xs font-bold text-cyan-300">
                {worker.initials}
              </div>

              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-white">
                  {worker.name}
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-[9px]">
                  <StatusDot
                    status={
                      worker.color as
                        | "green"
                        | "blue"
                        | "orange"
                        | "red"
                    }
                  />
                  <span className="text-slate-400">
                    {worker.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="text-[9px] uppercase tracking-widest text-slate-600">
                Assignment
              </div>

              <div className="mt-1 text-xs text-slate-300">
                {worker.incident}
                {worker.sector !== "—" && ` · ${worker.sector}`}
              </div>
            </div>

            <button className="mt-3 w-full rounded-lg border border-cyan-300/20 py-2 text-[9px] font-semibold text-cyan-300 transition hover:bg-cyan-300/10">
              View Worker
            </button>
          </motion.div>
        ))}
      </div>
    </Glass>
  );
}

/* ----------------------------- */
/* REPAIR WORKFLOW */
/* ----------------------------- */

function RepairWorkflow() {
  const steps = [
    ["Leak Detected", "10:14 AM", "done"],
    ["Assigned to Worker", "10:16 AM", "done"],
    ["Repair In Progress", "10:28 AM", "active"],
    ["Verification (Sensor)", "Pending", "pending"],
  ];

  return (
    <Glass className="p-5">
      <SectionTitle
        icon={Wrench}
        title="Repair Workflow"
        subtitle="Incident WG-042"
      />

      <div className="space-y-5">
        {steps.map(([label, time, status], index) => (
          <div key={label} className="relative flex gap-3">
            {index < steps.length - 1 && (
              <div
                className={`absolute left-[14px] top-7 h-7 w-px ${
                  status === "done"
                    ? "bg-cyan-300/50"
                    : "bg-white/10"
                }`}
              />
            )}

            <div
              className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                status === "done"
                  ? "bg-emerald-400/15 text-emerald-300"
                  : status === "active"
                    ? "bg-cyan-300/15 text-cyan-300"
                    : "bg-white/10 text-slate-500"
              }`}
            >
              {status === "done" ? (
                <CheckCircle2 size={15} />
              ) : (
                <span className="text-[10px]">{index + 1}</span>
              )}
            </div>

            <div className="flex-1">
              <div className="text-xs font-medium text-white">
                {label}
              </div>

              <div className="mt-1 text-[9px] text-slate-500">
                {time}
              </div>
            </div>

            {status === "active" && (
              <span className="text-[8px] font-bold text-cyan-300">
                ACTIVE
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-cyan-300/10 bg-cyan-300/[0.03] p-3">
        <div className="flex gap-2">
          <ShieldCheck size={16} className="shrink-0 text-cyan-300" />

          <p className="text-[9px] leading-4 text-slate-400">
            Repair is not considered complete until sensor telemetry
            confirms that abnormal flow has stopped.
          </p>
        </div>
      </div>
    </Glass>
  );
}

/* ----------------------------- */
/* AI ASSISTANT */
/* ----------------------------- */

function AIAssistant() {
  const [message, setMessage] = useState("");

  return (
    <Glass className="p-5">
      <SectionTitle
        icon={Sparkles}
        title="AI Assistant"
        subtitle="WaterGuard intelligence"
      />

      <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.035] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10">
            <Sparkles size={15} className="text-cyan-300" />
          </div>

          <div className="rounded-xl rounded-tl-none bg-white/5 px-3 py-2 text-[10px] leading-4 text-slate-300">
            I detected an abnormal flow pattern in Sector 03.
            Worker Ravi Kumar is currently assigned to WG-042.
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          "Show all leaks",
          "Assign nearest worker",
          "Predict next incidents",
          "Generate impact report",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setMessage(item)}
            className="rounded-lg border border-white/10 px-2 py-2 text-[9px] text-slate-400 transition hover:border-cyan-300/20 hover:bg-cyan-300/5 hover:text-cyan-300"
          >
            {item}
          </button>
        ))}
      </div>

      {message && (
        <div className="mt-3 text-[9px] text-cyan-300">
          AI action selected: {message}
        </div>
      )}
    </Glass>
  );
}

/* ----------------------------- */
/* MAIN DASHBOARD */
/* ----------------------------- */

function Dashboard() {
  return (
    <>
      <Hero />

      <div className="space-y-5 p-4 lg:p-6">
        <KPISection />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_1fr_.85fr]">
          <FlowAnalytics />
          <NetworkMap />
          <IncidentsPanel />
        </div>

        <WorkersPanel />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_1fr]">
          <RepairWorkflow />
          <AIAssistant />

          <Glass className="p-5">
            <SectionTitle
              icon={Zap}
              title="Network Efficiency"
              subtitle="Infrastructure health"
            />

            <div className="flex items-center justify-center py-4">
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 144 144" width="144" height="144">
                  <circle cx="72" cy="72" r="60" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="10" />
                  <circle cx="72" cy="72" r="60" fill="none" stroke="#22d3ee" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 60 * 0.974} ${2 * Math.PI * 60}`} style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.7))" }} />
                </svg>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    97.4%
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">
                    Efficiency
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.03] p-3">
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Response Time</div>
                <div className="mt-1 text-lg font-bold text-white">1.8<span className="text-xs font-normal text-slate-400">s</span></div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  <span className="text-[8px] text-emerald-400">Optimal</span>
                </div>
              </div>
              <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.03] p-3">
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Sensors</div>
                <div className="mt-1 text-lg font-bold text-white">12<span className="text-xs font-normal text-slate-400"> active</span></div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
                  <span className="text-[8px] text-cyan-300">All Online</span>
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Uptime</div>
                <div className="mt-1 text-lg font-bold text-white">99.9<span className="text-xs font-normal text-slate-400">%</span></div>
                <div className="mt-2 h-1 w-full rounded-full bg-white/5">
                  <div className="h-full w-[99%] rounded-full bg-emerald-400/60" />
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Alerts Today</div>
                <div className="mt-1 text-lg font-bold text-red-400">03</div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                  <span className="text-[8px] text-red-400">Needs Review</span>
                </div>
              </div>
            </div>
          </Glass>
        </div>
      </div>
    </>
  );
}

/* ----------------------------- */
/* GENERIC PAGES */
/* ----------------------------- */

function PlaceholderPage({
  page,
  icon: Icon,
}: {
  page: string;
  icon: LucideIcon;
}) {
  return (
    <div className="p-5 lg:p-8">
      <div className="mb-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10">
            <Icon size={21} className="text-cyan-300" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">{page}</h1>
            <p className="mt-1 text-xs text-slate-500">
              WaterGuard operational intelligence
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          ["Live Status", "Operational"],
          ["Connected Sensors", "12"],
          ["Active Records", "03"],
        ].map(([label, value]) => (
          <Glass key={label} className="p-5">
            <div className="text-[9px] uppercase tracking-widest text-slate-500">
              {label}
            </div>

            <div className="mt-3 text-2xl font-semibold text-white">
              {value}
            </div>
          </Glass>
        ))}
      </div>

      <Glass className="mt-5 flex min-h-[350px] items-center justify-center p-8">
        <div className="text-center">
          <Icon
            size={42}
            className="mx-auto text-cyan-300 opacity-60"
          />

          <h2 className="mt-5 text-lg font-semibold text-white">
            {page} Control Center
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
            This module is ready for the real WaterGuard data layer.
            We will connect sensors, incidents, workers and AWS
            services here.
          </p>
        </div>
      </Glass>
    </div>
  );
}

/* ----------------------------- */
/* APP */
/* ----------------------------- */

export default function Home() {
  const [current, setCurrent] = useState<Page>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageIcons: Record<Page, LucideIcon> = {
    Dashboard: LayoutDashboard,
    "Live Network": Activity,
    Incidents: AlertTriangle,
    Workers: Users,
    Repairs: Wrench,
    Analytics: BarChart3,
    Impact: Globe2,
  };

  return (
    <main className="min-h-screen bg-[#02080d] text-white">
      <Sidebar
        current={current}
        setCurrent={setCurrent}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <TopBar setOpen={setSidebarOpen} />

      <div className="lg:ml-[245px]">
        <AnimatePresence mode="wait">
          {current === "Dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard />
            </motion.div>
          ) : (
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <PlaceholderPage
                page={current}
                icon={pageIcons[current]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}