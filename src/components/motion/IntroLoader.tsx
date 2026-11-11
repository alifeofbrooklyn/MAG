"use client";

import { useEffect, useRef } from "react";

/**
 * Intro 3D ตอนเปิดเว็บ (คล้าย planpm.com.au)
 * 1) โลโก้ "ละลาย" เข้ามา (SVG displacement + blur + หมุน 3D แบบมีความหนา)
 * 2) เห็นโลโก้เต็ม + แสงวิ่งผ่าน + คำว่า Manage to Achieve Goal
 * 3) ม่านเลื่อนขึ้น เปิดเข้าหน้าเว็บ
 *
 * - เล่นครั้งเดียวต่อการเปิดแท็บ (sessionStorage "mag-intro")
 * - สคริปต์ใน <head> (layout.tsx) ใส่ class "intro" ให้ <html> ก่อนวาดหน้า จึงไม่กระพริบ
 * - กดปุ่ม Esc เพื่อข้ามได้ (ไม่มีปุ่มข้ามบนจอ)
 * - ปรับเวลาได้ที่ globals.css (หัวข้อ INTRO)
 */
const LAYERS = 7; // จำนวนชั้นที่ซ้อนกันเป็นความหนาของโลโก้ 3D
const TOTAL_MS = 5000;

export default function IntroLoader({ tagline }: { tagline: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro")) return;
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    lenis?.stop();

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      root.classList.remove("intro");
      try {
        sessionStorage.setItem("mag-intro", "1");
      } catch {}
      (window as unknown as { __lenis?: { start(): void } }).__lenis?.start();
      window.scrollTo(0, 0);
    };

    // ถ้า JS โหลดช้าจนแอนิเมชันจบไปแล้ว ให้ปิดทันที
    const elapsed = Number(document.timeline?.currentTime ?? 0);
    const timer = window.setTimeout(finish, Math.max(0, TOTAL_MS - elapsed) + 150);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);


  return (
    <div ref={ref} className="intro-overlay" aria-hidden="true">
      {/* ฟิลเตอร์ "ละลาย": คลื่นบิดภาพแรง ๆ แล้วค่อย ๆ นิ่งจนเป็นโลโก้คมชัด */}
      <svg width="0" height="0" className="absolute">
        <filter id="mag-melt" x="-30%" y="-60%" width="160%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="7" result="noise">
            <animate attributeName="baseFrequency" dur="1.9s" begin="0.15s" values="0.012 0.05;0.004 0.012;0 0" keyTimes="0;0.6;1" fill="freeze" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="140" xChannelSelector="R" yChannelSelector="G">
            <animate
              attributeName="scale"
              dur="1.9s"
              begin="0.15s"
              values="140;40;0"
              keyTimes="0;0.55;1"
              calcMode="spline"
              keySplines="0.2 0.8 0.2 1;0.2 0.8 0.2 1"
              fill="freeze"
            />
          </feDisplacementMap>
        </filter>
      </svg>

      <div className="intro-glow" />

      <div className="intro-stage">
        <div className="intro-logo">
          {Array.from({ length: LAYERS }, (_, k) => LAYERS - 1 - k).map((i) => (
            // ชั้นหลังวาดก่อน ชั้นหน้า (i=0) วาดทีหลังสุด
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src="/images/logo-white.png"
              alt=""
              width={699}
              height={402}
              className="intro-layer"
              style={{
                transform: `translateZ(${-i * 2.2}px)`,
                filter: i === 0 ? "url(#mag-melt)" : `url(#mag-melt) brightness(${0.55 - i * 0.05})`,
                opacity: i === 0 ? 1 : 0.9,
              }}
            />
          ))}
          <span className="intro-sheen" />
        </div>
        <p className="intro-tagline">{tagline}</p>
      </div>

    </div>
  );
}
