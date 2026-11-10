import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import { images } from "@/data/images";
import { sectionIds } from "@/data/site";
import { buttonClass } from "@/components/ui/Button";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** 2. Hero — รูปใหญ่ (ซูมช้าๆ) + overlay สีน้ำเงินเข้ม + ข้อความค่อยๆ ขึ้นทีละบรรทัด */
export default function Hero({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy">
      <div className="ken-burns absolute inset-0 -z-20">
        <Image src={images.hero} alt={t.hero.imageAlt} fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      {/* overlay สีน้ำเงินเข้ม ให้อ่านตัวอักษรได้ชัด */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy/70 to-transparent" aria-hidden="true" />

      <div className="container flex min-h-[calc(100svh-4.5rem)] max-w-8xl items-center py-24 sm:min-h-[640px] lg:min-h-[720px]">
        <div className="max-w-3xl">
          <p
            className="hero-in inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light sm:text-sm"
            style={d(100)}
          >
            <span className="h-px w-10 bg-accent-light" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="hero-in mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={d(250)}
          >
            {t.hero.title}
          </h1>
          <p className="hero-in mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl" style={d(450)}>
            {t.hero.subtitle}
          </p>
          <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={d(650)}>
            <a href={`#${sectionIds.contact}`} className={buttonClass("white", "lg", "group")}>
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href={`#${sectionIds.services}`} className={buttonClass("ghost-light", "lg")}>
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* ลูกศรชวนเลื่อนลง */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <a
          href={`#${sectionIds.about}`}
          aria-label={t.nav.about}
          className="hero-in block text-white/70 hover:text-white"
          style={d(1100)}
        >
          <ChevronDown className="scroll-cue h-7 w-7" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
