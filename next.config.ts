import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // อนุญาตรูปจาก Unsplash (รูปตัวอย่าง) — ถ้าเปลี่ยนเป็นรูปของบริษัทใน /public/images แล้ว ลบส่วนนี้ได้
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
