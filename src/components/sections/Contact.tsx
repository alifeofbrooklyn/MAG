import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { CSSProperties } from "react";
import type { Dictionary, Locale } from "@/i18n";
import { sectionIds, site } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { FacebookIcon } from "@/components/ui/Icons";
import ContactForm from "./ContactForm";

/** 10. ติดต่อเรา — ข้อมูลติดต่อ + แผนที่ + ฟอร์ม */
export default function Contact({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.contact;
  const items = [
    { icon: MapPin, label: c.addressLabel, value: t.company.address, href: site.mapLink, external: true },
    { icon: Phone, label: c.phoneLabel, value: site.phone, href: site.phoneHref },
    { icon: Mail, label: c.emailLabel, value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: c.hoursLabel, value: c.hours },
    { icon: FacebookIcon, label: c.facebookLabel, value: "facebook.com/magconsultant", href: site.facebook, external: true },
  ];

  return (
    <section id={sectionIds.contact} aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="container max-w-8xl">
        <SectionHeading id="contact-title" eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* ข้อมูลติดต่อ + แผนที่ */}
          <div className="reveal-left flex flex-col gap-6 lg:col-span-2">
            <address className="card not-italic">
              <ul className="divide-y divide-slate-100 dark:divide-white/10">
                {items.map(({ icon: Icon, label, value, href, external }) => {
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sky-soft text-brand dark:bg-white/5 dark:text-accent-light">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          {label}
                        </span>
                        <span className="mt-0.5 block break-words text-[0.95rem] font-medium text-navy dark:text-slate-100">
                          {value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex items-start gap-4 p-5 transition-colors hover:bg-sky-soft/50 dark:hover:bg-white/5"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 p-5">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </address>

            <div className="card overflow-hidden">
              <iframe
                src={site.mapEmbed}
                title={c.mapTitle}
                className="block h-72 w-full border-0 dark:opacity-90 dark:[filter:grayscale(.2)]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <a
                href={site.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-slate-100 py-3 text-sm font-semibold text-brand hover:bg-sky-soft/60 dark:border-white/10 dark:text-accent-light dark:hover:bg-white/5"
              >
                {c.mapLabel}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ฟอร์มติดต่อ */}
          <div className="reveal-right lg:col-span-3" style={{ "--d": "120ms" } as CSSProperties}>
            <ContactForm t={t} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
