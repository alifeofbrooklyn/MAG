"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Briefcase, Building2, ChevronLeft, ChevronRight, Maximize2, MapPin, X } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { projects, serviceShort, type Project, type ProjectCategory } from "@/data/projects";
import { sectionIds } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";

const INITIAL = 6; // จำนวนการ์ดที่แสดงก่อนกด "ดูผลงานทั้งหมด"

/** 6. ผลงาน — ตัวกรองตามประเภท + การ์ดผลงาน (ข้อมูลอยู่ที่ src/data/projects.ts) */
export default function Projects({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [showAll, setShowAll] = useState(false);
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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
                <button
                  type="button"
                  onClick={() => setOpenIdx(filtered.indexOf(p))}
                  aria-label={`${t.projects.view}: ${p.name[locale]}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-200 text-left dark:bg-navy-700"
                >
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
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      onError={() => setBroken((b) => ({ ...b, [p.image]: true }))}
                    />
                  )}
                  {/* ชั้นไล่สี + ปุ่ม "ดูโครงการ" ที่โผล่ขึ้นมาเมื่อชี้เมาส์ */}
                  <span className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {t.projects.view}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                      <Maximize2 className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="absolute left-4 top-4 rounded bg-navy/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                    {t.projects.categories[p.category]}
                  </span>
                </button>
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

      {openIdx !== null && (
        <Lightbox
          items={filtered}
          index={openIdx}
          setIndex={setOpenIdx}
          t={t}
          locale={locale}
          broken={broken}
        />
      )}
    </section>
  );
}

/** หน้าต่างดูผลงานแบบเต็มจอ — ปุ่มลูกศร / คีย์บอร์ด ← → / Esc เพื่อปิด */
function Lightbox({
  items,
  index,
  setIndex,
  t,
  locale,
  broken,
}: {
  items: Project[];
  index: number;
  setIndex: (i: number | null) => void;
  t: Dictionary;
  locale: Locale;
  broken: Record<string, boolean>;
}) {
  const p = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = useCallback((dir: number) => setIndex((index + dir + items.length) % items.length), [index, items.length, setIndex]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, setIndex]);

  const navBtn =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-navy";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.name[locale]}
      className="fade-in fixed inset-0 z-[70] flex items-center justify-center bg-navy-900/90 p-4 backdrop-blur-md sm:p-8"
      onClick={(e) => e.target === e.currentTarget && setIndex(null)}
    >
      <button ref={closeRef} type="button" onClick={() => setIndex(null)} aria-label={t.projects.close} className={`${navBtn} absolute right-4 top-4`}>
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <div key={index} className="pop-in grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-5 dark:bg-navy-800">
        <div className="relative aspect-[4/3] bg-slate-200 md:col-span-3 md:aspect-auto md:min-h-[420px] dark:bg-navy-700">
          {broken[p.image] ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-navy">
              <Building2 className="h-16 w-16 text-white/40" strokeWidth={1.2} aria-hidden="true" />
            </div>
          ) : (
            <Image src={p.image} alt={p.name[locale]} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
          )}
        </div>
        <div className="flex flex-col p-7 md:col-span-2 md:p-9">
          <span className="eyebrow">{t.projects.categories[p.category]}</span>
          <h3 className="mt-3 text-2xl font-bold text-navy dark:text-white">{p.name[locale]}</h3>
          {p.detail && <p className="mt-3 text-slate-600 dark:text-slate-300">{p.detail[locale]}</p>}
          <dl className="mt-6 space-y-4 text-sm">
            {p.location && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.projects.labels.location}</dt>
                <dd className="mt-1 flex items-center gap-2 text-navy dark:text-slate-100">
                  <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                  {p.location[locale]}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.projects.labels.service}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {p.services.map((s) => (
                  <span key={s} className="rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold text-brand dark:bg-white/10 dark:text-accent-light">
                    {serviceShort[s][locale]}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <div className="mt-auto flex items-center justify-between gap-3 pt-8">
            <span className="text-sm tabular-nums text-slate-400">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label={t.projects.prev} className={`${navBtn} !bg-sky-soft !text-brand hover:!bg-brand hover:!text-white dark:!bg-white/10 dark:!text-white`}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t.projects.next} className={`${navBtn} !bg-sky-soft !text-brand hover:!bg-brand hover:!text-white dark:!bg-white/10 dark:!text-white`}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
