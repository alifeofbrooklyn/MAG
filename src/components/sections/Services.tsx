import { ArrowRight, Calculator, ClipboardList, HardHat } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import { sectionIds } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/motion/SpotlightCard";

// ไอคอนของบริการแต่ละอย่าง เรียงตาม services.items ใน i18n
const icons = [ClipboardList, HardHat, Calculator];

/** 5. บริการ — การ์ด 3 ใบ */
export default function Services({ t }: { t: Dictionary }) {
  return (
    <section
      id={sectionIds.services}
      aria-labelledby="services-title"
      className="bg-slate-50 py-20 sm:py-28 dark:bg-navy-900"
    >
      <div className="container max-w-8xl">
        <SectionHeading id="services-title" eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <SpotlightCard
                as="article"
                key={s.title}
                style={{ "--d": `${i * 140}ms` } as CSSProperties}
                className="reveal card group relative flex flex-col overflow-hidden p-8 hover:shadow-lift"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-accent transition-transform duration-300 group-hover:scale-x-100" />
                <span className="flex h-14 w-14 items-center justify-center rounded-md bg-sky-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white dark:bg-white/5 dark:text-accent-light">
                  <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="pointer-events-none absolute -right-2 -top-6 -z-10 select-none text-[7rem] font-bold leading-none text-slate-100 transition-colors duration-500 group-hover:text-sky-soft dark:text-white/[0.04] dark:group-hover:text-white/[0.07]" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy dark:text-white">{s.title}</h3>
                <p className="mt-3 flex-1 text-slate-600 dark:text-slate-400">{s.desc}</p>
                <a
                  href={`#${sectionIds.contact}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 dark:text-accent-light"
                  aria-label={`${t.services.learnMore}: ${s.title}`}
                >
                  {t.services.learnMore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
