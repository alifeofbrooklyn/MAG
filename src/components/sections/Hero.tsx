"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { images } from "@/data/images";
import { products } from "@/data/products";
import { sectionIds } from "@/data/site";
import { buttonClass } from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import { lerp, range, useReducedMotion, useScrollProgress } from "@/components/motion/useScrollProgress";

// รูปที่หมุนเวียนในกรอบ Hero (ครอปแนวกว้างจากรูป Products) — ไฟล์ public/images/products/hero-*.webp
const SLIDES = ["harn", "ratchawong", "kene", "volvo", "dplus-office"].map((slug) => {
  const pr = products.find((p) => p.slug === slug)!;
  return { slug, name: pr.name, image: `/images/products/hero-${slug}.webp` };
});

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * 2. Hero แบบภาพยนตร์ (แรงบันดาลใจจาก planpm.com.au)
 * - หัวข้อใหญ่กลางจอบนพื้นท้องฟ้าโทนน้ำเงิน
 * - กรอบรูปผลงานด้านล่าง "ขยายเต็มจอ" เมื่อเลื่อนลง (หน้าจอถูกปักหมุดระหว่างเลื่อน)
 * - รูปในกรอบหมุนเวียนอัตโนมัติ
 */
export default function Hero({ t }: { t: Dictionary }) {
  const reduce = useReducedMotion();
  const [ref, raw] = useScrollProgress<HTMLElement>("pin");
  const p = reduce ? 0 : raw;
  const [slide, setSlide] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  // ค่าที่เปลี่ยนตามการเลื่อน
  const grow = range(p, 0.05, 0.6);
  // ถ้าเครื่องผู้ชมปิด animation (ลดการเคลื่อนไหว) จะแสดงกรอบรูปแบบนิ่ง เห็นเต็มกรอบ
  const frameW = reduce ? (mobile ? 90 : 72) : lerp(mobile ? 90 : 62, 100, grow); // % ของความกว้าง
  const frameH = reduce ? (mobile ? 34 : 40) : lerp(mobile ? 38 : 44, 100, grow); // vh
  const radius = reduce ? 24 : lerp(28, 0, grow);
  const bottom = reduce ? 5 : lerp(mobile ? -6 : -10, 0, grow); // vh (เริ่มโผล่จากขอบล่างจอ)
  const headFade = 1 - range(p, 0.02, 0.35);
  const finalIn = range(p, 0.6, 0.85);

  // แยกคำเน้น (ตัวเอียง/ไล่สี) ออกจากหัวข้อ
  const [before, after] = t.hero.title.includes(t.hero.accent)
    ? t.hero.title.split(t.hero.accent)
    : [t.hero.title, ""];

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative bg-navy"
      style={{ height: reduce ? "max(100svh, 720px)" : "240vh" }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ท้องฟ้าโทนน้ำเงิน */}
        <div className="hero-sky absolute inset-0" aria-hidden="true" />
        <div className="hero-grid absolute inset-0 opacity-[0.08]" aria-hidden="true" />
        <div className="aurora absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-accent/30 blur-[120px]" aria-hidden="true" />

        {/* หัวข้อ */}
        <div
          className="container relative z-10 flex max-w-6xl flex-col items-center pt-24 text-center sm:pt-28 lg:pt-[7.5rem]"
          style={{ opacity: headFade, transform: `translateY(${-p * 120}px)` }}
        >
          <h1
            id="hero-title"
            className="hero-in text-[2.3rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-[3.4rem] lg:text-[4.1rem]"
            style={d(250)}
          >
            {before}
            <em className="hero-accent">{t.hero.accent}</em>
            {after}
          </h1>
          <p className="hero-in mt-4 max-w-2xl text-base text-slate-300 sm:text-lg" style={d(450)}>
            {t.hero.subtitle}
          </p>
          <div className="hero-in mt-7 flex flex-col items-center gap-4 sm:flex-row" style={d(600)}>
            <Magnetic>
              <a href={`#${sectionIds.services}`} className="btn-outline-light group shine">
                {t.hero.ctaSecondary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Magnetic>
            <a href={`#${sectionIds.profile}`} className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline">
              {t.nav.profile}
            </a>
          </div>
        </div>

        {/* กรอบรูปที่ขยายเต็มจอ */}
        <div
          className="absolute left-1/2 z-0 overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]"
          style={{
            width: `${frameW}%`,
            height: `${frameH}vh`,
            bottom: `${bottom}vh`,
            borderRadius: radius,
            transform: "translateX(-50%)",
          }}
        >
          <Image src={images.hero} alt="" fill priority sizes="100vw" className="object-cover" />
          {SLIDES.map((s, i) =>
            broken[i] ? null : (
              <Image
                key={s.slug}
                src={s.image}
                alt={s.name}
                fill
                priority={i === 0}
                sizes="100vw"
                onError={() => setBroken((b) => ({ ...b, [i]: true }))}
                className={`object-cover transition-[opacity,transform] duration-[1600ms] ease-out ${
                  i === slide ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ),
          )}
          {/* รูปพื้นหลัง "Manage to Achieve Goal" (จากเพจ Facebook) */}
          <Image
            src="/images/gallery/mission.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ opacity: finalIn, transform: `scale(${1.08 - finalIn * 0.08})` }}
          />
          <div className="absolute inset-0 bg-navy/45" style={{ opacity: finalIn }} />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-navy/10" style={{ opacity: 0.35 + finalIn * 0.65 }} />

          {/* ชื่อโครงการในกรอบ */}
          <div className="absolute bottom-4 left-5 flex items-center gap-3 text-xs font-medium text-white/85 sm:bottom-6 sm:left-8" style={{ opacity: 1 - finalIn }}>
            <span className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <span key={i} className={`h-1 rounded-full bg-white transition-all duration-500 ${i === slide ? "w-6" : "w-2 opacity-50"}`} />
              ))}
            </span>
            {SLIDES[slide]?.name}
          </div>

          {/* ข้อความตอนขยายเต็มจอ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: finalIn, transform: `translateY(${(1 - finalIn) * 40}px)` }}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">MAG CONSULTANT</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">{t.hero.tagline}</p>
            <dl className="mt-10 grid grid-cols-3 gap-6 sm:gap-14">
              {t.stats.items.slice(0, 3).map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-slate-300 sm:text-sm">{s.label}</dt>
                  <dd className="text-3xl font-bold text-white sm:text-5xl">{finalIn > 0.2 ? <CountUp value={s.value} /> : s.value}</dd>
                </div>
              ))}
            </dl>
            <a href={`#${sectionIds.contact}`} className={buttonClass("white", "lg", "mt-10")} tabIndex={finalIn < 0.5 ? -1 : 0}>
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ชวนเลื่อน */}
        {!reduce && (
          <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/70 md:flex" style={{ opacity: 1 - range(p, 0, 0.1) }}>
            {t.hero.scroll}
            <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}
