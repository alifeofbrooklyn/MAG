/**
 * ผลงานอ้างอิง — ข้อมูลจากโพสต์ในเพจ Facebook "Mag Consultant"
 * https://www.facebook.com/magconsultant/
 *
 * - รูปอยู่ที่ public/images/projects/ (ชื่อไฟล์ mag-xxx.webp)
 *   ถ้ามีรูปต้นฉบับความละเอียดสูงกว่า วางทับชื่อไฟล์เดิมได้เลย
 * - location / detail ใส่หรือไม่ใส่ก็ได้ (ถ้าไม่ใส่ การ์ดจะไม่แสดงบรรทัดนั้น)
 * - ลำดับในรายการ = ลำดับที่แสดงบนเว็บ (6 รายการแรกแสดงก่อนกด "ดูผลงานทั้งหมด")
 */

export type ProjectCategory =
  | "hotel"
  | "resort"
  | "residential"
  | "condominium"
  | "mixedUse"
  | "commercial"
  | "industrial"
  | "hospital"
  | "education"
  | "infrastructure";

export type ServiceKey = "pm" | "cm" | "qs";

type Text = { th: string; en: string };

export type Project = {
  category: ProjectCategory;
  image: string;
  name: Text;
  location?: Text;
  /** รายละเอียดสั้นๆ ของอาคาร (ไม่บังคับ) */
  detail?: Text;
  services: ServiceKey[];
};

const img = (file: string) => `/images/projects/${file}`;
const ALL: ServiceKey[] = ["pm", "cm", "qs"];

export const projects: Project[] = [
  {
    category: "hotel",
    image: img("mag-ratchawong.webp"),
    name: { th: "เดอะ ราชวงศ์ โฮเทล", en: "The Ratchawong Hotel" },
    location: { th: "ถนนทรงวาด กรุงเทพฯ", en: "Song Wat Road, Bangkok" },
    detail: { th: "โรงแรมริมแม่น้ำเจ้าพระยา ย่านทรงวาด-เยาวราช", en: "Riverside hotel in the Song Wat – Yaowarat district" },
    services: ALL,
  },
  {
    category: "hotel",
    image: img("mag-oblique.webp"),
    name: { th: "OBLIQUE RESIDENCE", en: "OBLIQUE RESIDENCE" },
    location: { th: "อ.บางใหญ่ จ.นนทบุรี", en: "Bang Yai, Nonthaburi" },
    detail: { th: "โรงแรม สูง 7 ชั้น จำนวน 78 ห้อง", en: "7-storey hotel, 78 rooms" },
    services: ALL,
  },
  {
    category: "mixedUse",
    image: img("mag-baan100.webp"),
    name: { th: "บ้าน 100 – ราชกรีฑาสโมสร (RBSC)", en: "Baan 100 – Royal Bangkok Sports Club" },
    location: { th: "เขตปทุมวัน กรุงเทพฯ", en: "Pathum Wan, Bangkok" },
    detail: {
      th: "ปรับปรุงอาคารเดิมและก่อสร้างอาคารใหม่ — ร้านอาหาร คาเฟ่ บาร์ และสปา",
      en: "Renovation and new building — restaurants, café, bar and spa",
    },
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-yannawa.webp"),
    name: { th: "บ้านยานนาวา", en: "Yannawa Residence" },
    location: { th: "ยานนาวา กรุงเทพฯ", en: "Yannawa, Bangkok" },
    detail: { th: "อาคารพักอาศัยสไตล์นีโอคลาสสิก", en: "Neoclassical-style residential building" },
    services: ["pm", "cm"],
  },
  {
    category: "resort",
    image: img("mag-avani.webp"),
    name: { th: "Avani Samui (Chaweng Beach Club)", en: "Avani Samui (Chaweng Beach Club)" },
    location: { th: "หาดเฉวง เกาะสมุย", en: "Chaweng Beach, Koh Samui" },
    services: ALL,
  },
  {
    category: "hotel",
    image: img("mag-kene.webp"),
    name: { th: "Kene Hotel Bangkok", en: "Kene Hotel Bangkok" },
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    services: ALL,
  },
  {
    category: "hotel",
    image: img("mag-akara.webp"),
    name: { th: "AKARA HOTEL (นาเกลือ)", en: "AKARA HOTEL (Naklua)" },
    location: { th: "นาเกลือ จ.ชลบุรี", en: "Naklua, Chonburi" },
    services: ALL,
  },
  {
    category: "hotel",
    image: img("mag-vista.webp"),
    name: { th: "Vista Hotel", en: "Vista Hotel" },
    location: { th: "พัทยา จ.ชลบุรี", en: "Pattaya, Chonburi" },
    services: ALL,
  },
  {
    category: "commercial",
    image: img("mag-harn.webp"),
    name: { th: "Harn Office Building", en: "Harn Office Building" },
    detail: { th: "อาคารสำนักงาน (DGNB)", en: "Office building (DGNB)" },
    services: ALL,
  },
  {
    category: "commercial",
    image: img("mag-volvo.webp"),
    name: { th: "Volvo Showroom", en: "Volvo Showroom" },
    services: ALL,
  },
  {
    category: "commercial",
    image: img("mag-vadini.webp"),
    name: { th: "VADINI Showroom", en: "VADINI Showroom" },
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-suradet.webp"),
    name: { th: "K.Suradet House", en: "K.Suradet House" },
    location: { th: "ถนนสาทร กรุงเทพฯ", en: "Sathorn Road, Bangkok" },
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-plume.webp"),
    name: { th: "Plume Townhome", en: "Plume Townhome" },
    location: { th: "วัชรพล กรุงเทพฯ", en: "Watcharapol, Bangkok" },
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-setthasiri.webp"),
    name: { th: "Setthasiri Pattanakarn", en: "Setthasiri Pattanakarn" },
    location: { th: "พัฒนาการ กรุงเทพฯ", en: "Pattanakarn, Bangkok" },
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-philo.webp"),
    name: { th: "PHILO Ladprao 18", en: "PHILO Ladprao 18" },
    location: { th: "ลาดพร้าว 18 กรุงเทพฯ", en: "Ladprao 18, Bangkok" },
    services: ALL,
  },
];

export const serviceShort: Record<ServiceKey, Text> = {
  pm: { th: "บริหารโครงการ (PM)", en: "Project Management" },
  cm: { th: "บริหารงานก่อสร้าง (CM)", en: "Construction Management" },
  qs: { th: "สำรวจปริมาณ (QS)", en: "Quantity Surveying" },
};
