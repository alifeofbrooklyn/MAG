/**
 * รูปภาพทั้งเว็บ — ตอนนี้เป็น "รูปตัวอย่าง" จาก Unsplash
 *
 * วิธีเปลี่ยนเป็นรูปจริงของบริษัท:
 *   1) วางไฟล์รูปใน public/images/ เช่น public/images/hero.jpg
 *   2) เปลี่ยนค่าด้านล่างเป็น "/images/hero.jpg"
 */
const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  hero: unsplash("1565008447742-97f6f38c985c", 2000),
  about: unsplash("1541888946425-d81bb19240f5", 1200),
  quality: unsplash("1486406146926-c627a92ad1ab", 1600),

  // รูปผลงานอยู่ใน src/data/projects.ts (ไฟล์ public/images/projects/)
};
