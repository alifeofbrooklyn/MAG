"use client";

import { useEffect } from "react";

/**
 * ทำให้ element ที่มี class "reveal" / "reveal-left" / "reveal-right" / "reveal-zoom" ค่อยๆ ปรากฏเมื่อเลื่อนมาถึง (animation เบาๆ)
 * ถ้าไม่ต้องการ animation ให้ลบ <Reveal /> ออกจาก page.tsx และลบ .reveal ใน globals.css
 */
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-zoom");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add("is-visible");
            io.unobserve(el);
            // เมื่อ animation จบ ถอด class ออก เพื่อให้ hover effect (เช่น การ์ดลอยขึ้น) ทำงานได้ตามปกติ
            const done = () => el.classList.remove("reveal", "reveal-left", "reveal-right", "reveal-zoom", "is-visible");
            el.addEventListener("transitionend", (ev) => ev.target === el && ev.propertyName === "transform" && done());
            setTimeout(done, 2500);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
