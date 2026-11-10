"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { sectionIds } from "@/data/site";
import Logo from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // เมนูหลัก — เพิ่ม/ลบ/สลับลำดับได้ที่นี่
  const links = [
    { href: `#${sectionIds.about}`, label: t.nav.about },
    { href: `#${sectionIds.services}`, label: t.nav.services },
    { href: `#${sectionIds.projects}`, label: t.nav.projects },
    { href: `#${sectionIds.quality}`, label: t.nav.quality },
    { href: `#${sectionIds.contact}`, label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // แถบความคืบหน้าการเลื่อนหน้า
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current?.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ปิดเมนูมือถือเมื่อกด Esc / ล็อกการเลื่อนหน้าเวลาเปิดเมนู
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow dark:bg-navy-900/90 ${
        scrolled ? "border-slate-200 shadow-sm dark:border-white/10" : "border-transparent"
      }`}
    >
      <div className="container flex h-[4.5rem] max-w-8xl items-center justify-between gap-4">
        <Logo href={`/${locale}`} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.slice(0, 4).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-2 text-[0.94rem] font-medium text-slate-700 transition-colors hover:bg-sky-soft hover:text-brand dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher locale={locale} label={t.nav.language} />
          <ThemeToggle labelLight={t.nav.themeLight} labelDark={t.nav.themeDark} />
          <a href={`#${sectionIds.contact}`} className={buttonClass("primary", "md", "ml-1 hidden sm:inline-flex")}>
            {t.nav.contact}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy hover:bg-sky-soft lg:hidden dark:text-white dark:hover:bg-white/10"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* แถบความคืบหน้าการเลื่อนหน้า (เส้นบางสีฟ้าใต้ header) */}
      <div
        ref={barRef}
        className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-brand to-accent"
        aria-hidden="true"
      />

      {/* เมนูมือถือ */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-slate-200 bg-white lg:hidden dark:border-white/10 dark:bg-navy-900"
      >
        <nav aria-label="Mobile" className="container max-h-[calc(100dvh-4.5rem)] overflow-y-auto py-4">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-slate-100 py-3.5 text-base font-medium text-navy dark:border-white/5 dark:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href={`#${sectionIds.contact}`}
            onClick={() => setOpen(false)}
            className={buttonClass("primary", "lg", "mt-5 w-full")}
          >
            {t.nav.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}
