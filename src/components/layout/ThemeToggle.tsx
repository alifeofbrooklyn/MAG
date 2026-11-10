"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** ปุ่มสลับโหมดสว่าง/มืด — จำค่าที่เลือกไว้ใน localStorage ("theme") */
export default function ThemeToggle({ labelLight, labelDark }: { labelLight: string; labelDark: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? labelLight : labelDark}
      title={dark ? labelLight : labelDark}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-sky-soft hover:text-brand dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {/* แสดงทั้งสองไอคอนแล้วซ่อนด้วย CSS เพื่อไม่ให้กระพริบตอนโหลด */}
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
      <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
    </button>
  );
}
