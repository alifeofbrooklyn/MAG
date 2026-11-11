import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { sectionIds, site } from "@/data/site";
import Logo from "@/components/ui/Logo";
import { FacebookIcon } from "@/components/ui/Icons";

/** 11. Footer */
export default function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const quick = [
    { href: `#${sectionIds.about}`, label: t.nav.about },
    { href: `#${sectionIds.services}`, label: t.nav.services },
    { href: `#${sectionIds.products}`, label: t.nav.productsNav },
    { href: `#${sectionIds.projects}`, label: t.nav.projects },
    { href: `#${sectionIds.profile}`, label: t.nav.profile },
    { href: `#${sectionIds.quality}`, label: t.nav.quality },
    { href: `#${sectionIds.contact}`, label: t.nav.contact },
  ];
  const linkCls = "text-slate-300 transition-colors hover:text-white";
  const headCls = "text-sm font-semibold uppercase tracking-[0.14em] text-white";

  return (
    <footer className="bg-navy-900 text-sm text-slate-300 dark:border-t dark:border-white/10">
      <div className="container grid max-w-8xl gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo href={`/${locale}`} tone="white" />
          <p className="mt-5 max-w-sm leading-relaxed text-slate-400">{t.footer.description}</p>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook — MAG CONSULTANT"
            className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:border-accent hover:bg-accent"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>

        <nav aria-label={t.footer.quickLinks} className="lg:col-span-2">
          <h2 className={headCls}>{t.footer.quickLinks}</h2>
          <ul className="mt-5 space-y-3">
            {quick.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.services} className="lg:col-span-3">
          <h2 className={headCls}>{t.footer.services}</h2>
          <ul className="mt-5 space-y-3">
            {t.services.items.map((s) => (
              <li key={s.title}>
                <a href={`#${sectionIds.services}`} className={linkCls}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={headCls}>{t.footer.contact}</h2>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
              <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {t.company.address}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
              <a href={site.phoneHref} className={linkCls}>
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className={`${linkCls} break-all`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex max-w-8xl flex-col items-center justify-between gap-4 py-6 text-xs text-slate-400 sm:flex-row">
          <p>{t.footer.rights}</p>
          <a href="#main" className="inline-flex items-center gap-1.5 hover:text-white">
            {t.footer.backToTop}
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
