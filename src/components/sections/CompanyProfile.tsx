"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { profilePdf, profileSlides } from "@/data/products";
import { sectionIds } from "@/data/site";
import { buttonClass } from "@/components/ui/Button";

/**
 * Company Profile — ดูสไลด์ 8 หน้าบนเว็บ + ปุ่มดาวน์โหลด PDF
 * รูปสไลด์อยู่ที่ public/images/profile/ และ PDF อยู่ที่ public/company-profile.pdf
 */
export default function CompanyProfile({ t }: { t: Dictionary }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = profileSlides.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <section id={sectionIds.profile} aria-labelledby="profile-title" className="relative overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div className="hero-grid absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="aurora absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[120px]" aria-hidden="true" />
      <div className="container relative grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        <div className="reveal-left lg:col-span-4">
          <p className="eyebrow !text-accent-light before:!bg-accent-light">{t.profile.eyebrow}</p>
          <h2 id="profile-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.profile.title}</h2>
          <p className="mt-4 text-slate-300">{t.profile.intro}</p>
          <a href={profilePdf} download className={buttonClass("white", "lg", "group mt-8")}>
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            {t.profile.download}
          </a>
          <p className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <FileText className="h-4 w-4" aria-hidden="true" /> PDF · {n} {t.profile.pages}
          </p>
        </div>

        <div className="reveal-right lg:col-span-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* สไลด์ใหญ่ */}
          <div className="profile-frame relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-white/15">
            {profileSlides.map((src, k) => (
              <Image
                key={src}
                src={src}
                alt={`${t.profile.eyebrow} — ${t.profile.page} ${k + 1}`}
                fill
                sizes="(min-width:1024px) 60vw, 100vw"
                className={`object-cover transition-all duration-700 ease-out ${k === i ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/50 to-transparent p-4">
              <span className="text-sm tabular-nums text-white/80">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label={t.profile.prev} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white hover:text-navy">
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={t.profile.next} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white hover:text-navy">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            {/* แถบเวลา autoplay */}
            {!paused && <span key={i} className="profile-timer absolute left-0 top-0 h-0.5 bg-accent" />}
          </div>
          {/* รูปย่อ */}
          <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
            {profileSlides.map((src, k) => (
              <button
                key={src}
                type="button"
                onClick={() => setI(k)}
                aria-label={`${t.profile.page} ${k + 1}`}
                aria-current={k === i ? "true" : undefined}
                className={`relative aspect-[16/9] w-28 shrink-0 overflow-hidden rounded-lg ring-2 transition-all sm:w-32 ${k === i ? "ring-accent" : "opacity-50 ring-transparent hover:opacity-100"}`}
              >
                <Image src={src} alt="" fill sizes="128px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
