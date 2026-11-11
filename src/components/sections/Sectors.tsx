import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import { sectionIds } from "@/data/site";

/** ประเภทโครงการ (จาก Company Profile หน้า "Project sectors") — รายการแบบนิตยสาร มีลูกเล่นตอนชี้เมาส์ */
export default function Sectors({ t }: { t: Dictionary }) {
  return (
    <section className="bg-mist py-24 sm:py-32 dark:bg-navy-900">
      <div className="container grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{t.sectors.eyebrow}</p>
            <h2 className="h2 mt-3">{t.sectors.title}</h2>
          </div>
        </div>
        <ul className="border-t border-slate-200 lg:col-span-8 dark:border-white/10">
          {t.sectors.items.map((s, i) => (
            <li key={s} className="reveal border-b border-slate-200 dark:border-white/10" style={{ "--d": `${i * 60}ms` } as CSSProperties}>
              <a href={`#${sectionIds.projects}`} className="sector-row group relative flex items-center gap-6 overflow-hidden py-6 sm:py-7">
                <span className="relative z-10 w-10 text-sm font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative z-10 flex-1 text-2xl font-semibold tracking-tight text-navy transition-all duration-500 group-hover:translate-x-3 group-hover:text-white sm:text-3xl dark:text-white">
                  {s}
                </span>
                <ArrowUpRight className="relative z-10 h-7 w-7 -rotate-45 text-slate-300 transition-all duration-500 group-hover:rotate-0 group-hover:text-white" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
