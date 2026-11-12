/**
 * Products — รูปผลงานจากเว็บเดิม magconsultant.co.th (หัวข้อ Products/Services)
 * รูปอยู่ที่ public/images/products/
 * เพิ่ม/ลบ/สลับลำดับได้ที่นี่
 */
export type Product = {
  slug: string;
  image: string;
  name: string;
  /** ประเภท (ไทย / อังกฤษ) */
  type: { th: string; en: string };
};

const img = (slug: string) => `/images/products/${slug}.webp`;
const t = (th: string, en: string) => ({ th, en });

export const products: Product[] = [
  { slug: "lubd-siem-reap", image: img("lubd-siem-reap"), name: "LUB-D Siem Reap", type: t("โรงแรม", "Hotel") },
  { slug: "dplus-office", image: img("dplus-office"), name: "Dplus Office", type: t("อาคารสำนักงาน", "Office") },
  { slug: "philo", image: img("philo"), name: "Philo", type: t("ที่อยู่อาศัย", "Residential") },
  { slug: "setthasiri", image: img("setthasiri"), name: "Setthasiri Pattanakarn Clubhouse", type: t("คลับเฮาส์", "Clubhouse") },
  { slug: "vadini", image: img("vadini"), name: "Vadini", type: t("โชว์รูม", "Showroom") },
  { slug: "volvo", image: img("volvo"), name: "Show Room VOLVO", type: t("โชว์รูม", "Showroom") },
  { slug: "vista-naklua", image: img("vista-naklua"), name: "Vista Hotel (Naklua)", type: t("โรงแรม", "Hotel") },
  { slug: "harn", image: img("harn"), name: "Harn", type: t("อาคารสำนักงาน", "Office") },
  { slug: "kene", image: img("kene"), name: "Kene Hotel Bangkok", type: t("โรงแรม", "Hotel") },
  { slug: "vista-sukhumvit", image: img("vista-sukhumvit"), name: "Vista Hotel (Sukhumvit)", type: t("โรงแรม", "Hotel") },
  { slug: "dplus-factory", image: img("dplus-factory"), name: "Dplus Factory & Warehouse", type: t("โรงงานและคลังสินค้า", "Factory & Warehouse") },
  { slug: "ratchawong", image: img("ratchawong"), name: "Ratchawong Hotel", type: t("โรงแรม", "Hotel") },
];

/** สไลด์ Company Profile (8 หน้า) — public/images/profile/ และไฟล์ PDF public/company-profile.pdf */
export const profileSlides = Array.from({ length: 8 }, (_, i) => `/images/profile/profile-${String(i + 1).padStart(2, "0")}.webp`);
export const profilePdf = "/company-profile.pdf";
