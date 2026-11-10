import type { Dictionary, Locale } from "@/i18n";
import { projects } from "@/data/projects";
import { sectionIds } from "@/data/site";

/**
 * แถบชื่อโครงการเลื่อนวนไม่สิ้นสุด (ชี้เมาส์เพื่อหยุด)
 * ชื่อดึงจาก src/data/projects.ts อัตโนมัติ
 */
export default function ProjectMarquee({ t, locale }: { t: Dictionary; locale: Locale }) {
  const items = projects.map((p) => ({ name: p.name[locale], cat: t.projects.categories[p.category] }));
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} className="flex items-center">
          <a
            href={`#${sectionIds.projects}`}
            tabIndex={hidden ? -1 : undefined}
            className="group flex items-baseline gap-3 px-8 transition-colors"
          >
            <span className="whitespace-nowrap text-xl font-semibold text-navy/80 transition-colors group-hover:text-brand sm:text-2xl dark:text-white/80 dark:group-hover:text-white">
              {it.name}
            </span>
            <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-slate-400">{it.cat}</span>
          </a>
          <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={t.projects.marquee} className="border-y border-slate-200/70 bg-white py-7 dark:border-white/10 dark:bg-navy-900">
      <p className="container mb-4 max-w-8xl text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {t.projects.marquee}
      </p>
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
