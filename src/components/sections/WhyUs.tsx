import { CalendarCheck, Handshake, ShieldCheck, UsersRound, Wallet, Workflow } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/motion/SpotlightCard";

// ไอคอน เรียงตาม why.items ใน i18n
const icons = [UsersRound, CalendarCheck, Wallet, ShieldCheck, Handshake, Workflow];

/** 7. ทำไมต้องเลือกเรา — การ์ด 6 ใบ */
export default function WhyUs({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="why-title" className="bg-slate-50 py-20 sm:py-28 dark:bg-navy-800/40">
      <div className="container max-w-8xl">
        <SectionHeading id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-white/10 dark:bg-white/10">
          {t.why.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <SpotlightCard
                as="li"
                tilt={0}
                key={item.title}
                style={{ "--d": `${(i % 3) * 120 + Math.floor(i / 3) * 80}ms` } as CSSProperties}
                className="reveal group bg-white p-8 transition-colors hover:bg-sky-soft/60 dark:bg-navy-900 dark:hover:bg-navy-800"
              >
                <Icon className="h-9 w-9 text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 dark:text-accent-light" strokeWidth={1.4} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-bold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{item.desc}</p>
              </SpotlightCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
