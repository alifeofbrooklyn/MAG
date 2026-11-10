import Image from "next/image";
import { Quote } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import { images } from "@/data/images";
import { sectionIds } from "@/data/site";
import Parallax from "@/components/motion/Parallax";

/** 8. นโยบายคุณภาพ — พื้นฟ้าอ่อน + ลายเส้น blueprint + รูปอาคารจางๆ */
export default function QualityPolicy({ t }: { t: Dictionary }) {
  return (
    <section
      id={sectionIds.quality}
      aria-labelledby="quality-title"
      className="relative isolate overflow-hidden bg-sky-soft py-24 sm:py-32 dark:bg-navy-800"
    >
      <div className="blueprint-grid grid-drift absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 -z-20 hidden w-1/2 lg:block" aria-hidden="true">
        <Parallax speed={-0.15} className="absolute -inset-y-24 inset-x-0">
          <Image src={images.quality} alt="" fill sizes="50vw" className="object-cover opacity-[0.12] grayscale dark:opacity-[0.08]" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-soft via-sky-soft/70 to-transparent dark:from-navy-800 dark:via-navy-800/70" />
      </div>

      <div className="container max-w-5xl text-center">
        <p id="quality-title" className="eyebrow reveal justify-center">
          {t.quality.eyebrow}
        </p>
        <figure className="reveal-zoom mt-8" style={{ "--d": "120ms" } as CSSProperties}>
          <Quote className="mx-auto h-12 w-12 text-accent/60" strokeWidth={1.2} aria-hidden="true" />
          <blockquote className="mt-6 text-2xl font-semibold leading-snug text-navy sm:text-3xl lg:text-[2.1rem] dark:text-white">
            “{t.quality.quote}”
          </blockquote>
          <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand dark:text-accent-light">
            MAG CONSULTANT CO., LTD.
          </figcaption>
        </figure>
        <ul className="reveal mt-12 flex flex-wrap justify-center gap-3" style={{ "--d": "300ms" } as CSSProperties}>
          {t.quality.pillars.map((p) => (
            <li
              key={p}
              className="rounded-full border border-brand/20 bg-white/70 px-5 py-2 text-sm font-medium text-brand backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-slate-200"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
