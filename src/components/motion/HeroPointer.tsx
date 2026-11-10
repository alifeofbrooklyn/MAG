"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * ส่งตำแหน่งเมาส์ใน Hero ให้ CSS (--mx, --my จาก -1 ถึง 1)
 * ใช้ทำ parallax ตามเมาส์ของรูปพื้นหลังและการ์ดกระจก
 */
export default function HeroPointer({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty("--my", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
