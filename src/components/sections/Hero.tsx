import Image from "next/image";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import { images } from "@/data/images";
import { sectionIds } from "@/data/site";
import { buttonClass } from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import HeroPointer from "@/components/motion/HeroPointer";
import Magnetic from "@/components/motion/Magnetic";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * 2. Hero
 * - รูปพื้นหลังซูมช้าๆ + ขยับตามเมาส์ (parallax)
 * - หัวข้อขึ้นทีละคำ
 * - การ์ดกระจก (glass) แสดงตัวเลขสำคัญ ลอยอยู่ด้านขวา (จอใหญ่)
 */
export default function Hero({ t }: { t: Dictionary }) {
  const words = t.hero.title.split(" ");
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy">
      <HeroPointer>
        {/* รูปพื้นหลัง (ขยับตามเมาส์เล็กน้อย) */}
        <div className="hero-layer absolute -inset-6 -z-20" style={{ ["--depth" as string]: "-14px" }}>
          <div className="ken-burns absolute inset-0">
            <Image src={images.hero} alt={t.hero.imageAlt} fill priority sizes="100vw" className="object-cover object-center" />
          </div>
        </div>

        {/* overlay สีน้ำเงินเข้ม + แสงไล่สี */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/30" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy to-transparent" aria-hidden="true" />
        <div className="aurora absolute -left-40 top-1/4 -z-10 h-[32rem] w-[32rem] rounded-full bg-accent/25 blur-[120px]" aria-hidden="true" />
        {/* เส้นตารางจางๆ แบบ blueprint */}
        <div className="hero-grid absolute inset-0 -z-10 opacity-[0.07]" aria-hidden="true" />

        <div className="container relative grid min-h-[100svh] max-w-8xl items-center gap-12 pb-24 pt-32 lg:grid-cols-12 lg:pt-36">
          <div className="lg:col-span-8 xl:col-span-7">
            <p
              className="hero-in inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent-light backdrop-blur sm:text-[0.8rem]"
              style={d(100)}
            >
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                <span className="pulse-dot absolute h-2 w-2 rounded-full bg-accent-light" />
                <span className="h-2 w-2 rounded-full bg-accent-light" />
              </span>
              {t.hero.eyebrow}
            </p>

            <h1
              id="hero-title"
              className="mt-7 text-[2.6rem] font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.4rem]"
            >
              {words.map((w, i) => (
                <span key={i} className="inline-block max-w-full overflow-hidden pb-[0.12em] align-top">
                  <span className="word-in inline-block max-w-full" style={d(200 + i * 70)}>
                    {/* คำท้ายๆ ไล่สีให้เด่น (อังกฤษ 2 คำสุดท้าย / ไทยวลีสุดท้าย) */}
                    <span className={i >= words.length - (words.length > 3 ? 2 : 1) ? "text-gradient" : undefined}>{w}</span>
                    {i < words.length - 1 ? " " : ""}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-in mt-7 max-w-2xl text-lg text-slate-300 sm:text-xl" style={d(200 + words.length * 70 + 100)}>
              {t.hero.subtitle}
            </p>

            <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(200 + words.length * 70 + 250)}>
              <Magnetic>
                <a href={`#${sectionIds.contact}`} className={buttonClass("white", "lg", "group shine")}>
                  {t.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Magnetic>
              <a
                href={`#${sectionIds.services}`}
                className="group inline-flex h-12 items-center gap-3 px-2 text-base font-semibold text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-all group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-navy">
                  <Play className="h-3.5 w-3.5 translate-x-px fill-current" aria-hidden="true" />
                </span>
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* การ์ดกระจกตัวเลขสำคัญ (จอใหญ่เท่านั้น) */}
          <div className="hidden lg:col-span-4 lg:block xl:col-span-4 xl:col-start-9">
            <div className="hero-layer" style={{ ["--depth" as string]: "18px" }}>
              <div className="hero-in glass float-slow rounded-2xl p-7 text-white" style={d(900)}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-light">{t.stats.label}</p>
                <dl className="mt-6 grid grid-cols-2 gap-6">
                  {t.stats.items.slice(0, 2).map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="text-4xl font-bold tracking-tight">
                        <CountUp value={s.value} />
                      </dd>
                      <p className="mt-1 text-sm text-slate-300">{s.label}</p>
                    </div>
                  ))}
                </dl>
                <div className="mt-7 border-t border-white/15 pt-5">
                  <p className="text-sm text-slate-300">{t.services.title}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["PM", "CM", "QS"].map((x) => (
                      <span key={x} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroPointer>

      {/* ลูกศรชวนเลื่อนลง */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <a href={`#${sectionIds.about}`} aria-label={t.nav.about} className="hero-in flex flex-col items-center gap-2 text-white/60 hover:text-white" style={d(1400)}>
          <span className="flex h-10 w-6 justify-center rounded-full border border-current pt-2">
            <span className="scroll-dot h-2 w-0.5 rounded-full bg-current" />
          </span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
