"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { products } from "@/data/products";
import { sectionIds } from "@/data/site";
import { range, useReducedMotion, useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * Products — แกลเลอรีแนวนอน
 * - จอใหญ่: หน้าจอปักหมุด แล้วการ์ดเลื่อนไปทางซ้ายตามการเลื่อนลง (horizontal scroll)
 * - มือถือ/แท็บเล็ต: ปัดซ้าย-ขวา
 * - กดรูปเพื่อดูแบบเต็มจอ
 */
export default function Products({ t, locale }: { t: Dictionary; locale: Locale }) {
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [ref, p] = useScrollProgress<HTMLElement>("pin");
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const pinned = desktop && !reduce;

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  // ระยะที่ต้องเลื่อนแนวนอน = ความกว้างแถบการ์ด - ความกว้างจอ
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (el) setShift(Math.max(0, el.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [desktop]);

  const x = pinned ? -shift * range(p, 0.08, 0.92) : 0;

  const card = (pr: (typeof products)[number], i: number) => (
    <li key={pr.slug} className={`group shrink-0 ${pinned ? "w-[34vw] max-w-[520px]" : "w-[78vw] snap-start sm:w-[46vw]"}`}>
      <button type="button" onClick={() => setOpen(i)} className="block w-full text-left" aria-label={`${t.products.view}: ${pr.name}`}>
        <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-navy shadow-card">
          {broken[pr.slug] ? (
            <div className="flex h-full items-center justify-center"><Building2 className="h-14 w-14 text-white/30" strokeWidth={1.2} /></div>
          ) : (
            <Image
              src={pr.image}
              alt={pr.name}
              fill
              sizes="(min-width:1024px) 34vw, 80vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              onError={() => setBroken((b) => ({ ...b, [pr.slug]: true }))}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute right-4 top-4 flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="absolute left-5 top-4 text-sm font-semibold tabular-nums text-white/80">{String(i + 1).padStart(2, "0")}</span>
          <div className="absolute inset-x-5 bottom-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-light">{pr.type[locale]}</p>
            <p className="mt-1 text-xl font-semibold text-white sm:text-2xl">{pr.name}</p>
          </div>
        </div>
      </button>
    </li>
  );

  return (
    <section
      ref={ref}
      id={sectionIds.products}
      aria-labelledby="products-title"
      className="relative bg-white dark:bg-navy-800"
      style={{ height: pinned ? `calc(100vh + ${shift}px)` : undefined }}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="container mb-10 flex max-w-8xl flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.products.eyebrow}</p>
            <h2 id="products-title" className="h2 mt-3">{t.products.title}</h2>
            <p className="lead mt-4">{t.products.intro}</p>
          </div>
          {pinned ? (
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
              <span className="tabular-nums">{String(Math.min(products.length, Math.round(range(p, 0.08, 0.92) * (products.length - 1)) + 1)).padStart(2, "0")}</span>
              <span className="h-0.5 w-40 overflow-hidden rounded bg-slate-200 dark:bg-white/10">
                <span className="block h-full origin-left bg-accent" style={{ transform: `scaleX(${range(p, 0.08, 0.92)})` }} />
              </span>
              <span className="tabular-nums">{String(products.length).padStart(2, "0")}</span>
            </div>
          ) : (
            <div className="flex gap-2">
              {[ArrowLeft, ArrowRight].map((Icon, k) => (
                <button
                  key={k}
                  type="button"
                  aria-label={k ? t.projects.next : t.projects.prev}
                  onClick={() => trackRef.current?.scrollBy({ left: (k ? 1 : -1) * window.innerWidth * 0.7, behavior: "smooth" })}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-navy transition hover:bg-navy hover:text-white dark:border-white/20 dark:text-white"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          className={pinned ? "will-change-transform" : "no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-pl-5"}
          style={pinned ? { transform: `translate3d(${x}px,0,0)` } : undefined}
        >
          <ul className={`flex gap-6 ${pinned ? "pl-[max(2rem,calc((100vw-88rem)/2+2rem))] pr-8" : "px-5 pb-4"}`}>
            {products.map(card)}
          </ul>
        </div>
      </div>

      {open !== null && <ProductLightbox index={open} setIndex={setOpen} t={t} locale={locale} broken={broken} />}
    </section>
  );
}

function ProductLightbox({
  index,
  setIndex,
  t,
  locale,
  broken,
}: {
  index: number;
  setIndex: (i: number | null) => void;
  t: Dictionary;
  locale: Locale;
  broken: Record<string, boolean>;
}) {
  const pr = products[index];
  const go = useCallback((d: number) => setIndex((index + d + products.length) % products.length), [index, setIndex]);
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [go, setIndex]);

  const btn = "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-navy";
  return (
    <div role="dialog" aria-modal="true" aria-label={pr.name} className="fade-in fixed inset-0 z-[70] flex flex-col items-center justify-center bg-navy-900/95 p-4 backdrop-blur" onClick={(e) => e.target === e.currentTarget && setIndex(null)}>
      <button type="button" autoFocus onClick={() => setIndex(null)} aria-label={t.projects.close} className={`${btn} absolute right-4 top-4`}>
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <div key={index} className="pop-in relative h-[72vh] w-full max-w-5xl">
        {!broken[pr.slug] && <Image src={pr.image} alt={pr.name} fill sizes="90vw" className="object-contain" />}
      </div>
      <div className="mt-5 flex w-full max-w-5xl items-center justify-between gap-4 text-white">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-light">{pr.type[locale]}</p>
          <p className="text-xl font-semibold">{pr.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm tabular-nums text-white/60">{String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => go(-1)} aria-label={t.projects.prev} className={btn}><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => go(1)} aria-label={t.projects.next} className={btn}><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </div>
  );
}
