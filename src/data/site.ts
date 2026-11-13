/**
 * ข้อมูลบริษัท — แก้เบอร์โทร อีเมล ลิงก์ ฯลฯ ได้ที่ไฟล์นี้ที่เดียว
 * (ที่อยู่แยกภาษาอยู่ใน src/i18n/th.ts และ en.ts → company.address)
 */
export const site = {
  name: "MAG CONSULTANT CO., LTD.",
  shortName: "MAG CONSULTANT",
  url: "https://magconsultant.co.th",
  phone: "+66 65 528 7891",
  phoneHref: "tel:+66655287891",
  email: "pmagconsultant@gmail.com",
  facebook: "https://www.facebook.com/magconsultant/",
  mapLink: "https://maps.app.goo.gl/tq4h1m8zd8Ruiocg9",
  // ใช้พิกัดตรง ๆ (q=lat,lng) เพื่อให้ปุ่ม "เปิดใน Maps" ในกรอบแผนที่ไปที่จุดเดียวกับ mapLink
  // t=k = ภาพดาวเทียม, z = ระดับซูม, hl = ภาษา
  mapEmbed: "https://maps.google.com/maps?q=13.7996719,100.5097453&t=k&z=17&hl=th&output=embed",
  geo: { lat: 13.7996719, lng: 100.5097453 },
  logo: "/images/logo.webp",
};

/** id ของแต่ละ section ใช้กับเมนูและปุ่ม (#about, #services, ...) */
export const sectionIds = {
  about: "about",
  services: "services",
  products: "products",
  projects: "projects",
  profile: "profile",
  quality: "quality",
  contact: "contact",
} as const;
