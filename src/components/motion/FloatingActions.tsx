"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";

/**
 * ปุ่มลอยมุมขวาล่าง:
 * - กลับขึ้นด้านบน พร้อมวงแหวนบอกความคืบหน้าการเลื่อนหน้า
 * - ปุ่มโทร (แสดงเฉพาะมือถือ)
 */
export default function FloatingActions({ phoneHref, phoneLabel, topLabel }: { phoneHref: string; phoneLabel: string; topLabel: string }) {
  const [show, setShow] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const C = 2 * Math.PI * 20;

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShow(window.scrollY > 600);
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [C]);

  const base =
    "flex h-12 w-12 items-center justify-center rounded-full shadow-lift transition-all duration-500 ease-out";
  const vis = show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <a href={phoneHref} aria-label={phoneLabel} className={`${base} ${vis} bg-accent text-white hover:bg-brand sm:hidden`}>
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
      <button
        type="button"
        aria-label={topLabel}
        onClick={() => {
          const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
          if (lenis) lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`${base} ${vis} group relative bg-white text-navy hover:bg-navy hover:text-white dark:bg-navy-700 dark:text-white`}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="2.5" />
          <circle
            ref={ringRef}
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#2E86AB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
          />
        </svg>
        <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
      </button>
    </div>
  );
}
