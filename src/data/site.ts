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
  mapLink: "https://maps.app.goo.gl/A3xvhHwmg5ZccLTn6",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4782.777008012995!2d100.50974529999999!3d13.7996719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29bea345598c7%3A0x46a523680b83c174!2zNTUg4LiL4Lit4LiiIOC4iOC4o-C4seC4jeC4quC4meC4tOC4l-C4p-C4h-C4qOC5jCDguYHguILguKfguIfguJrguLLguIfguK3guYnguK0g4Lia4Liy4LiH4Lie4Lil4Lix4LiUIOC4geC4o-C4uOC4h-C5gOC4l-C4nuC4oeC4q-C4suC4meC4hOC4oyAxMDcwMA!5e1!3m2!1sth!2sth!4v1794306061020!5m2!1sth!2sth",
  geo: { lat: 13.7996719, lng: 100.5097453 },
  logo: "/images/logo.webp",
};

/** id ของแต่ละ section ใช้กับเมนูและปุ่ม (#about, #services, ...) */
export const sectionIds = {
  about: "about",
  services: "services",
  projects: "projects",
  quality: "quality",
  contact: "contact",
} as const;
