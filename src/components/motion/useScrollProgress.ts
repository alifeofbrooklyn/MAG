"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * คืนค่าความคืบหน้าการเลื่อนผ่าน element (0 → 1)
 * - mode "pin": 0 เมื่อขอบบนของ element ชนขอบบนจอ, 1 เมื่อเลื่อนจนขอบล่างชนขอบล่างจอ (ใช้กับ section ที่ปักหมุด sticky)
 * - mode "pass": 0 เมื่อขอบบน element เข้าจอด้านล่าง, 1 เมื่อขอบล่างออกจากจอด้านบน
 */
export function useScrollProgress<T extends HTMLElement>(mode: "pin" | "pass" = "pin"): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let v: number;
      if (mode === "pin") {
        const total = r.height - vh;
        v = total > 0 ? -r.top / total : r.top < 0 ? 1 : 0;
      } else {
        v = (vh - r.top) / (vh + r.height);
      }
      setP(Math.min(1, Math.max(0, v)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  return [ref, p];
}

/** แปลงช่วงค่า: map(p, 0.2, 0.8) → 0..1 ภายในช่วง */
export const range = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** ผู้ใช้ตั้งค่าลดการเคลื่อนไหวไว้หรือไม่ */
export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return r;
}
