"use client";

import type { Dictionary } from "@/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import { range, useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * ขั้นตอนการทำงาน 01–04 — เส้นเวลาค่อยๆ ลากยาวตามการเลื่อน และแต่ละขั้นสว่างขึ้นทีละขั้น
 * ข้อมูลจาก Company Profile หน้า "Project Management"
 */
export default function Process({ t }: { t: Dictionary }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>("pass");
  const prog = range(p, 0.25, 0.65);
  const steps = t.process.steps;

  return (
    <section className="py-24 sm:py-32">
      <div className="container max-w-7xl">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} intro={t.process.intro} />
        <div ref={ref} className="relative mt-16">
          {/* เส้นเวลา — มือถือ: แนวตั้ง */}
          <div className="absolute left-[1.15rem] top-0 h-full w-0.5 bg-slate-200 lg:hidden dark:bg-white/10" aria-hidden="true">
            <div className="h-full w-full origin-top bg-gradient-to-b from-brand to-accent" style={{ transform: `scaleY(${prog})` }} />
          </div>
          {/* เส้นเวลา — จอใหญ่: แนวนอน */}
          <div className="absolute left-0 top-[1.15rem] hidden h-0.5 w-full bg-slate-200 lg:block dark:bg-white/10" aria-hidden="true">
            <div className="h-full w-full origin-left bg-gradient-to-r from-brand to-accent" style={{ transform: `scaleX(${prog})` }} />
          </div>
          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => {
              const on = prog >= (i + 0.2) / steps.length;
              return (
                <li key={s.title} className="relative pl-14 lg:pl-0 lg:pt-16">
                  <span
                    className={`absolute left-0 top-0 flex h-[2.3rem] w-[2.3rem] items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-500 ${
                      on ? "scale-110 border-accent bg-accent text-white shadow-[0_0_0_8px_rgba(46,134,171,.15)]" : "border-slate-300 bg-white text-slate-400 dark:border-white/20 dark:bg-navy-900"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`text-xl font-semibold transition-colors duration-500 ${on ? "text-navy dark:text-white" : "text-slate-400"}`}>{s.title}</h3>
                  <p className={`mt-2 text-slate-600 transition-opacity duration-500 dark:text-slate-400 ${on ? "opacity-100" : "opacity-50"}`}>{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
