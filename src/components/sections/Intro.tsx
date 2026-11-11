"use client";

import type { Dictionary } from "@/i18n";
import CountUp from "@/components/ui/CountUp";
import { range, useReducedMotion, useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * ข้อความใหญ่ที่ "ค่อยๆ เข้มขึ้นทีละคำ" ตามการเลื่อน + ตัวเลขสถิติ
 * (แรงบันดาลใจจาก planpm.com.au — Efficient Project Delivery)
 */
export default function Intro({ t }: { t: Dictionary }) {
  const reduce = useReducedMotion();
  const [ref, p] = useScrollProgress<HTMLDivElement>("pass");
  const words = t.intro.statement.split(" ");
  const fill = range(p, 0.18, reduce ? 0.5 : 0.62);

  return (
    <section className="bg-mist py-24 sm:py-32 dark:bg-navy-900">
      <div ref={ref} className="container max-w-6xl">
        <p className="eyebrow">{t.intro.eyebrow}</p>
        <p className="mt-6 text-[1.7rem] font-semibold leading-[1.3] tracking-tight sm:text-4xl lg:text-[3.2rem] lg:leading-[1.2]">
          {words.map((w, i) => {
            const on = fill * words.length > i;
            return (
              <span key={i} className={`transition-colors duration-300 ${on ? "text-navy dark:text-white" : "text-slate-300 dark:text-white/15"}`}>
                {w}{" "}
              </span>
            );
          })}
        </p>

        <dl className="mt-16 grid gap-10 border-t border-slate-200 pt-12 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10">
          {t.stats.items.map((s, i) => (
            <div key={s.label} className="reveal flex flex-col-reverse" style={{ ["--d" as string]: `${i * 110}ms` }}>
              <dt className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</dt>
              <dd className="text-5xl font-semibold tracking-tight text-brand sm:text-6xl dark:text-accent-light">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
