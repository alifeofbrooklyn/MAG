import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { images } from "@/data/images";
import { sectionIds } from "@/data/site";
import { buttonClass } from "@/components/ui/Button";

/** 3. About — ข้อความซ้าย / รูปขวา */
export default function About({ t }: { t: Dictionary }) {
  return (
    <section id={sectionIds.about} aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="container grid max-w-8xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal-left">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-title" className="h2 mt-3">
            {t.about.title}
          </h2>
          <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
            <p className="text-lg text-ink dark:text-slate-200">{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {t.about.stages.map((s, i) => (
              <li
                key={s}
                className="flex items-center gap-3 rounded-md border border-slate-200 bg-sky-soft/60 px-3.5 py-3 text-sm font-medium text-navy dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>

          <a href={`#${sectionIds.services}`} className={buttonClass("outline", "md", "mt-10")}>
            {t.about.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="reveal-right relative" style={{ "--d": "150ms" } as CSSProperties}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={images.about}
              alt={t.about.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {/* กรอบตกแต่ง */}
          <div
            className="absolute -bottom-5 -left-5 -z-10 hidden h-40 w-40 rounded-lg border-2 border-accent/40 sm:block"
            aria-hidden="true"
          />
          <div className="float absolute -bottom-6 right-6 flex items-center gap-3 rounded-md bg-navy px-5 py-4 text-white shadow-lift dark:bg-brand">
            <Check className="h-5 w-5 text-accent-light dark:text-white" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-wide">{t.about.badge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
