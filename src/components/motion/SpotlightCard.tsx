"use client";

import { useRef, type CSSProperties, type ElementType, type PointerEvent, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** องศาเอียงสูงสุดเวลาเอาเมาส์ชี้ (0 = ไม่เอียง) */
  tilt?: number;
};

/**
 * การ์ดที่มี "แสงตามเมาส์" (spotlight) และเอียงแบบ 3D เล็กน้อย
 * ทำงานเฉพาะอุปกรณ์ที่มีเมาส์ — บนมือถือเป็นการ์ดปกติ
 */
export default function SpotlightCard({ as: Tag = "div", className = "", style, children, tilt = 5 }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--x", `${x * 100}%`);
    el.style.setProperty("--y", `${y * 100}%`);
    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * tilt}deg) rotateY(${(x - 0.5) * tilt}deg) translateY(-4px)`;
    }
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={style}
      className={`spotlight transition-[transform,box-shadow,background-color] duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}
