"use client";

import { useRef, type ReactNode } from "react";

/** ปุ่ม "แม่เหล็ก" — ขยับตามเมาส์เล็กน้อยเมื่อชี้ใกล้ๆ (เฉพาะเมาส์) */
export default function Magnetic({ children, strength = 0.25, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={`inline-flex transition-transform duration-300 ease-out ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }}
      onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
    >
      {children}
    </span>
  );
}
