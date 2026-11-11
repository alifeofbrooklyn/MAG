"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ตัวเลขนับขึ้นเมื่อเลื่อนมาถึง เช่น "20+" นับ 0 → 20 แล้วต่อท้าย "+"
 * ถ้าค่าไม่ได้ขึ้นต้นด้วยตัวเลข (เช่น "ประเทศไทย") จะแสดงตามเดิม
 */
export default function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target); // ค่าเริ่มต้น = ค่าจริง (กรณีไม่มี JS / SEO)

  useEffect(() => {
    if (!match || !ref.current) return;
    setN(0);
    const el = ref.current;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3)))); // ease-out
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}
