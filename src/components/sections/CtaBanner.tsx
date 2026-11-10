import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { sectionIds } from "@/data/site";
import { buttonClass } from "@/components/ui/Button";
import Magnetic from "@/components/motion/Magnetic";

/** 9. Call-to-Action — พื้นหลังน้ำเงินเข้ม */
export default function CtaBanner({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy py-20 sm:py-24 dark:bg-navy-700">
      {/* เส้นตกแต่งแนวสถาปัตยกรรม */}
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id="cta-lines" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="0" y2="56" stroke="#fff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-lines)" />
      </svg>
      <div className="glow absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

      <div className="container flex max-w-6xl flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="reveal-left max-w-2xl">
          <h2 id="cta-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-lg text-slate-300">{t.cta.text}</p>
        </div>
        <Magnetic className="reveal-right shrink-0">
        <a href={`#${sectionIds.contact}`} className={buttonClass("white", "lg", "group shine")}>
          {t.cta.button}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
        </Magnetic>
      </div>
    </section>
  );
}
