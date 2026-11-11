"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Calculator, Check, ClipboardList, HardHat } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { sectionIds } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";

const icons = [ClipboardList, HardHat, Calculator];
// รูปประกอบของแต่ละแท็บ (Service จากเว็บเดิม + รูปผลงาน)
const tabImages = ["/images/service.webp", "/images/about.webp", "/images/products/dplus-office.webp"];

/**
 * 5. Service — แท็บ PM / CM / QS พร้อมรายละเอียดจาก Company Profile
 */
export default function Services({ t }: { t: Dictionary }) {
  const [tab, setTab] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const tabs = t.serviceDetail.tabs;
  const cur = tabs[tab];

  return (
    <section id={sectionIds.services} aria-labelledby="services-title" className="bg-mist py-24 sm:py-32 dark:bg-navy-900">
      <div className="container max-w-7xl">
        <SectionHeading id="services-title" eyebrow={t.serviceDetail.eyebrow} title={t.serviceDetail.title} intro={t.serviceDetail.intro} />

        {/* ปุ่มแท็บ */}
        <div role="tablist" aria-label={t.serviceDetail.title} className="reveal mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-card dark:border-white/10 dark:bg-navy-800">
          {tabs.map((x, i) => {
            const Icon = icons[i];
            const on = i === tab;
            return (
              <button
                key={x.key}
                role="tab"
                id={`svc-tab-${i}`}
                aria-selected={on}
                aria-controls="svc-panel"
                onClick={() => setTab(i)}
                className={`relative flex flex-col items-center gap-1 rounded-xl px-3 py-3 text-center transition-all duration-300 sm:flex-row sm:justify-center sm:gap-3 ${
                  on ? "bg-navy text-white shadow-lg dark:bg-accent dark:text-navy" : "text-slate-600 hover:bg-sky-soft hover:text-brand dark:text-slate-300 dark:hover:bg-white/5"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="text-lg font-bold tracking-wide">{x.key}</span>
                <span className="hidden text-xs font-medium opacity-80 lg:inline">{x.title}</span>
              </button>
            );
          })}
        </div>

        {/* เนื้อหาแท็บ */}
        <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${tab}`} key={tab} className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="card-in relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-navy shadow-lift">
            {!broken[tab] && (
              <Image
                src={tabImages[tab]}
                alt={cur.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="ken-burns object-cover"
                onError={() => setBroken((b) => ({ ...b, [tab]: true }))}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
            <span className="absolute bottom-5 left-6 text-[5.5rem] font-bold leading-none text-white/90 sm:text-[7rem]">{cur.key}</span>
          </div>

          <div className="card-in" style={{ ["--d" as string]: "120ms" }}>
            <h3 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl dark:text-white">{cur.title}</h3>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{cur.lead}</p>
            <ol className="mt-8 space-y-3">
              {cur.points.map((pt, i) => (
                <li
                  key={pt}
                  className="card-in group flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card dark:border-white/10 dark:bg-navy-800"
                  style={{ ["--d" as string]: `${200 + i * 90}ms` }}
                >
                  <span className="text-sm font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-medium text-navy dark:text-slate-100">{pt}</span>
                  <Check className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </li>
              ))}
            </ol>
            <a href={`#${sectionIds.contact}`} className={buttonClass("primary", "lg", "group mt-8")}>
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
