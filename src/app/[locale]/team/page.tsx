import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GraduationCap, Briefcase, Building2 } from "lucide-react";
import { getDictionary, isLocale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { team } from "@/data/team";

/** หน้า Meet Our Team — แก้ข้อมูลที่ src/data/team.ts */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: `${t.team.title} | MAG CONSULTANT`, description: t.team.intro };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const h = "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent";

  return (
    <>
      <Header t={t} locale={locale} home={false} />
      <main id="main" className="pt-[4.5rem]">
        <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
          <div className="hero-sky absolute inset-0 opacity-90" aria-hidden="true" />
          <div className="hero-grid absolute inset-0 opacity-[0.08]" aria-hidden="true" />
          <div className="container relative max-w-6xl">
            <p className="hero-in text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">{t.team.eyebrow}</p>
            <h1 className="hero-in mt-4 text-4xl font-bold sm:text-6xl" style={{ ["--d" as string]: "120ms" }}>
              {t.team.title}
            </h1>
            <p className="hero-in mt-5 max-w-2xl text-lg text-white/75" style={{ ["--d" as string]: "240ms" }}>
              {t.team.intro}
            </p>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24 dark:bg-navy-900">
          <div className="container max-w-6xl space-y-16">
            {team.map((m, i) => (
              <article key={m.initials} className="reveal grid gap-8 lg:grid-cols-12" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-navy text-3xl font-bold tracking-wide text-white shadow-xl">
                      {m.initials}
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-navy dark:text-white">{m.name[locale]}</h2>
                    <p className="mt-1 font-medium text-brand dark:text-accent-light">{m.role[locale]}</p>
                  </div>
                </div>

                <div className="space-y-8 lg:col-span-8">
                  {m.education.length > 0 && (
                    <div>
                      <p className={h}><GraduationCap className="h-4 w-4" aria-hidden="true" />{t.team.education}</p>
                      <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
                        {m.education.map((e) => <li key={e.en}>{e[locale]}</li>)}
                      </ul>
                    </div>
                  )}
                  {m.positions.length > 0 && (
                    <div>
                      <p className={h}><Briefcase className="h-4 w-4" aria-hidden="true" />{t.team.positions}</p>
                      <ol className="mt-3 border-l border-slate-200 dark:border-white/10">
                        {m.positions.map((p) => (
                          <li key={p.period + p.title} className="relative py-2 pl-6 before:absolute before:-left-[5px] before:top-4 before:h-2.5 before:w-2.5 before:rounded-full before:bg-accent">
                            <span className="text-sm tabular-nums text-slate-400">{p.period}</span>
                            <p className="font-semibold text-navy dark:text-white">{p.title}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{p.company}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {m.experience.length > 0 && (
                    <div>
                      <p className={h}><Building2 className="h-4 w-4" aria-hidden="true" />{t.team.experience}</p>
                      <div className="mt-3 space-y-3">
                        {m.experience.map((g) => (
                          <details key={g.period + (g.company ?? "")} className="group rounded-xl border border-slate-200 p-4 open:bg-sky-soft/40 dark:border-white/10 dark:open:bg-white/5">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-navy dark:text-white">
                              <span>{g.period}{g.company ? ` · ${g.company}` : ""}</span>
                              <span className="rounded-full bg-sky-soft px-2.5 py-0.5 text-xs text-brand dark:bg-white/10 dark:text-accent-light">
                                {g.projects.length} {t.team.projects}
                              </span>
                            </summary>
                            <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-slate-700 sm:grid-cols-2 dark:text-slate-300">
                              {g.projects.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{p}</li>)}
                            </ul>
                          </details>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer t={t} locale={locale} home={false} />
      <Reveal />
    </>
  );
}
