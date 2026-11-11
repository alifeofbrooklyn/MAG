"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { sectionIds } from "@/data/site";
import Logo from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Header — ลอยโปร่งใสทับ Hero แล้วเปลี่ยนเป็นพื้นขาว/เบลอเมื่อเลื่อนลง
 * + ไฮไลต์เมนูของ section ที่กำลังดูอยู่ (scroll spy)
 */
export default function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  // เมนูหลัก — เพิ่ม/ลบ/สลับลำดับได้ที่นี่
  const links = [
    { id: sectionIds.about, label: t.nav.about },
    { id: sectionIds.services, label: t.nav.services },
    { id: sectionIds.products, label: t.nav.productsNav },
    { id: sectionIds.projects, label: t.nav.projects },
    { id: sectionIds.profile, label: t.nav.profile },
    { id: sectionIds.contact, label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // scroll spy: section ไหนอยู่กลางจอ → เมนูนั้น active
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    Object.values(sectionIds).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  // ปิดเมนูมือถือเมื่อกด Esc / ล็อกการเลื่อนหน้าเวลาเปิดเมนู
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const transparent = !scrolled && !open;

  return (
    <header
      data-transparent={transparent}
      className={`group fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "border-b border-slate-200/70 bg-white/80 shadow-[0_8px_30px_-12px_rgba(11,31,58,.18)] backdrop-blur-xl dark:border-white/10 dark:bg-navy-900/80"
      }`}
    >
      <div
        className={`container flex max-w-8xl items-center justify-between gap-4 transition-all duration-500 ${
          transparent ? "h-[5.25rem]" : "h-[4.5rem]"
        }`}
      >
        <Logo href={`/${locale}`} />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {links.slice(0, 5).map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative whitespace-nowrap rounded-md px-2.5 py-2 text-[0.9rem] font-medium xl:px-3 transition-colors
                      after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300
                      ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
                      ${
                        transparent
                          ? "text-white/85 hover:text-white"
                          : `hover:text-brand dark:hover:text-white ${isActive ? "text-brand dark:text-white" : "text-slate-700 dark:text-slate-300"}`
                      }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher locale={locale} label={t.nav.language} />
          <ThemeToggle labelLight={t.nav.themeLight} labelDark={t.nav.themeDark} />
          <a
            href={`#${sectionIds.contact}`}
            className={buttonClass(transparent ? "white" : "primary", "md", "ml-1 hidden sm:inline-flex")}
          >
            {t.nav.contact}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md xl:hidden ${
              transparent ? "text-white hover:bg-white/10" : "text-navy hover:bg-sky-soft dark:text-white dark:hover:bg-white/10"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* เมนูมือถือ */}
      <div id="mobile-menu" hidden={!open} className="border-t border-slate-200 bg-white xl:hidden dark:border-white/10 dark:bg-navy-900">
        <nav aria-label="Mobile" className="container max-h-[calc(100dvh-4.5rem)] overflow-y-auto py-4">
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.id} className="card-in" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-slate-100 py-3.5 text-base font-medium text-navy dark:border-white/5 dark:text-white"
                >
                  {l.label}
                  <span className={`h-1.5 w-1.5 rounded-full ${active === l.id ? "bg-accent" : "bg-transparent"}`} />
                </a>
              </li>
            ))}
          </ul>
          <Link href={`#${sectionIds.contact}`} onClick={() => setOpen(false)} className={buttonClass("primary", "lg", "mt-5 w-full")}>
            {t.nav.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}
