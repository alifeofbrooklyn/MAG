import { Award, Building2, Layers, MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n";
import CountUp from "@/components/ui/CountUp";

const icons = [Award, Building2, Layers, MapPin];

/** 4. ตัวเลขสถิติ (ข้อความอยู่ใน i18n → stats.items) */
export default function Stats({ t }: { t: Dictionary }) {
  return (
    <section aria-label={t.stats.label} className="bg-sky-soft dark:bg-navy-800">
      <div className="container max-w-8xl">
        <dl className="grid grid-cols-2 divide-slate-300/60 lg:grid-cols-4 lg:divide-x dark:divide-white/10">
          {t.stats.items.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={s.label} style={{ "--d": `${i * 120}ms` } as CSSProperties} className="reveal flex flex-col items-center px-4 py-10 text-center sm:py-12">
                <Icon className="order-1 h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
                <dt className="order-3 mt-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">{s.label}</dt>
                <dd className="order-2 mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl dark:text-white">
                  <CountUp value={s.value} />
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
