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
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3334.8243802692887!2d100.509328!3d13.7998261!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29bea345598c7%3A0x46a523680b83c174!2zNTUg4LiL4Lit4LiiIOC4iOC4o-C4seC4jeC4quC4meC4tOC4l-C4p-C4h-C4qOC5jCDguYHguILguKfguIfguJrguLLguIfguK3guYnguK0g4Lia4Liy4LiH4Lie4Lil4Lix4LiUIOC4geC4o-C4uOC4h-C5gOC4l-C4nuC4oeC4q-C4suC4meC4hOC4oyAxMDcwMA!5e1!3m2!1sth!2sth!4v1794578020242!5m2!1sth!2sth",
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
