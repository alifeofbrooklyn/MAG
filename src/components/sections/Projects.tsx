"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ArrowRight, Briefcase, Building2, MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { projects, serviceShort, type ProjectCategory } from "@/data/projects";
import { sectionIds } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";

const INITIAL = 6; // จำนวนการ์ดที่แสดงก่อนกด "ดูผลงานทั้งหมด"

/** 6. ผลงาน — ตัวกรองตามประเภท + การ์ดผลงาน (ข้อมูลอยู่ที่ src/data/projects.ts) */
export default function Projects({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [showAll, setShowAll] = useState(false);
  const [broken, setBroken] = useState<Record<string, boolean>>({});

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const visible = showAll || filter !== "all" ? filtered : filtered.slice(0, INITIAL);
  // แสดงเฉพาะประเภทที่มีผลงานอยู่จริงใน projects.ts
  const categories = (Object.keys(t.projects.categories) as ProjectCategory[]).filter((c) =>
    projects.some((p) => p.category === c),
  );

  return (
    <section id={sectionIds.projects} aria-labelledby="projects-title" className="py-20 sm:py-28">
      <div className="container max-w-8xl">
        <SectionHeading id="projects-title" eyebrow={t.projects.eyebrow} title={t.projects.title} intro={t.projects.intro} />

        {/* ตัวกรองประเภทโครงการ */}
        <div className="reveal mt-10 flex flex-wrap justify-center gap-2" role="toolbar" aria-label={t.projects.labels.category}>
          {(["all", ...categories] as const).map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-brand bg-brand text-white dark:border-accent dark:bg-accent dark:text-navy"
                    : "border-slate-200 text-slate-600 hover:border-brand hover:text-brand dark:border-white/15 dark:text-slate-300 dark:hover:border-white dark:hover:text-white"
                }`}
              >
                {c === "all" ? t.projects.all : t.projects.categories[c]}
              </button>
            );
          })}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            // key รวม filter ไว้ด้วย → การ์ดเล่น animation ใหม่ทุกครั้งที่เปลี่ยนตัวกรอง
            <li
              key={filter + p.name.en}
              className="card-in"
              style={{ "--d": `${(showAll && filter === "all" && i >= INITIAL ? i - INITIAL : i) * 70}ms` } as CSSProperties}
            >
              <article className="card group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-navy-700">
                  {broken[p.image] ? (
                    // ถ้ายังไม่มีไฟล์รูป แสดงพื้นหลังสีแบรนด์แทน
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-navy">
                      <Building2 className="h-12 w-12 text-white/40" strokeWidth={1.2} aria-hidden="true" />
                    </div>
                  ) : (
                    <Image
                      src={p.image}
                      alt={p.name[locale]}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => setBroken((b) => ({ ...b, [p.image]: true }))}
                    />
                  )}
                  <span className="absolute left-4 top-4 rounded bg-navy/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                    {t.projects.categories[p.category]}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy dark:text-white">{p.name[locale]}</h3>
                  {p.detail && <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{p.detail[locale]}</p>}
                  <dl className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {p.location && (
                      <div className="flex items-start gap-2.5">
                        <dt className="sr-only">{t.projects.labels.location}</dt>
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <dd>{p.location[locale]}</dd>
                      </div>
                    )}
                    <div className="flex items-start gap-2.5">
                      <dt className="sr-only">{t.projects.labels.service}</dt>
                      <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <dd>{p.services.map((s) => serviceShort[s][locale]).join(" · ")}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {filter === "all" && !showAll && filtered.length > INITIAL && (
          <div className="mt-12 text-center">
            <button type="button" onClick={() => setShowAll(true)} className={buttonClass("primary", "lg", "group")}>
              {t.projects.viewAll}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
