"use client";

import { CalendarCheck, ShieldCheck, Wallet } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { range, useScrollProgress } from "@/components/motion/useScrollProgress";

const icons = [CalendarCheck, Wallet, ShieldCheck];

/**
 * พันธกิจ "Manage · Achieve · Goal" — คำใหญ่เปลี่ยนจากเส้นขอบเป็นสีเต็มทีละคำเมื่อเลื่อน
 * ข้อมูลจาก Company Profile หน้า "Our mission"
 */
export default function Mission({ t }: { t: Dictionary }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>("pass");

  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div className="hero-grid absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div ref={ref} className="container relative grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow !text-accent-light before:!bg-accent-light">{t.mission.eyebrow}</p>
          <p className="mt-6" aria-label={t.mission.words.join(" ")}>
            {t.mission.words.map((w, i) => {
              const on = range(p, 0.2 + i * 0.1, 0.3 + i * 0.1) >= 1;
              return (
                <span
                  key={w}
                  aria-hidden="true"
                  className={`block text-[4.2rem] font-bold leading-[0.95] tracking-tight transition-all duration-700 sm:text-[6.5rem] lg:text-[8rem] ${
                    on ? "mission-fill translate-x-0" : "mission-outline -translate-x-4"
                  }`}
                >
                  {w}
                </span>
              );
            })}
          </p>
        </div>
        <div>
          <p className="reveal text-2xl font-medium leading-snug text-white sm:text-3xl">{t.mission.lead}</p>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {t.mission.items.map((it, i) => {
              const Icon = icons[i];
              return (
                <li key={it.title} className="reveal group flex items-center gap-5 py-6" style={{ ["--d" as string]: `${i * 120}ms` }}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-accent-light transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold uppercase tracking-wide">{it.title}</p>
                    <p className="text-sm text-slate-400">{it.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
