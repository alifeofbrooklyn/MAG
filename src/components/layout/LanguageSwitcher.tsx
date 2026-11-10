"use client";

import type { MouseEvent } from "react";
import { locales, type Locale } from "@/i18n/config";

/** ปุ่มสลับภาษา TH / EN — จำภาษาที่เลือกไว้ใน cookie (NEXT_LOCALE) */
export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const choose = (e: MouseEvent, l: Locale) => {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
    // คงตำแหน่ง section เดิม (#hash) ไว้เมื่อเปลี่ยนภาษา
    if (window.location.hash) {
      e.preventDefault();
      window.location.href = `/${l}${window.location.hash}`;
    }
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-md border border-slate-200 p-0.5 text-xs font-semibold dark:border-white/15"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <a
            key={l}
            href={`/${l}`}
            onClick={(e) => choose(e, l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            className={`rounded px-2 py-1.5 uppercase transition-colors ${
              active
                ? "bg-navy text-white dark:bg-white dark:text-navy"
                : "text-slate-600 hover:text-brand dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {l}
          </a>
        );
      })}
    </div>
  );
}
