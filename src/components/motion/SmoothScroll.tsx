"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * เลื่อนหน้าแบบนุ่มนวล (smooth scroll) ด้วยไลบรารี Lenis
 * - ลิงก์ #section จะเลื่อนแบบนุ่มนวล และเว้นที่ให้ header
 * - ปิดอัตโนมัติถ้าผู้ใช้ตั้งค่าลดการเคลื่อนไหว
 * ไม่ชอบ → ลบ <SmoothScroll /> ออกจาก page.tsx
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      anchors: { offset: -80 },
    });
    document.documentElement.classList.add("lenis-on");
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);
  return null;
}
