/**
 * ผลงานอ้างอิง — ข้อมูลจากโพสต์ในเพจ Facebook "Mag Consultant"
 * https://www.facebook.com/magconsultant/
 *
 * - รูปการ์ดอยู่ที่ public/images/projects/  รูปแกลเลอรีอยู่ที่ public/images/gallery/
 * - location / detail / description / credits / gallery / note ใส่หรือไม่ใส่ก็ได้
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

export type Text = { th: string; en: string };

export type Project = {
  category: ProjectCategory;
  image: string;
  name: Text;
  location?: Text;
  /** รายละเอียดสั้นๆ ใต้ชื่อบนการ์ด */
  detail?: Text;
  /** คำอธิบายโครงการ (แสดงตอนกดเปิดดู) */
  description?: Text;
  /** ทีมโครงการ เช่น เจ้าของ ผู้ออกแบบ ผู้รับเหมา */
  credits?: { label: Text; value: string }[];
  /** ข้อมูลเพิ่มเติมจากโพสต์ เช่น ช่วงเวลาหรือความคืบหน้างาน */
  note?: Text;
  /** รูปเพิ่มเติม (แสดงตอนกดเปิดดู) */
  gallery?: string[];
  services: ServiceKey[];
};

const img = (file: string) => `/images/projects/${file}`;
const gal = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/images/gallery/${prefix}-${String(i + 1).padStart(2, "0")}.webp`);
const t = (th: string, en: string): Text => ({ th, en });
const ALL: ServiceKey[] = ["pm", "cm", "qs"];

const L = {
  owner: t("เจ้าของโครงการ", "Owner"),
  supervisor: t("ผู้ควบคุมงาน", "Supervisor"),
  consultant: t("ที่ปรึกษางานก่อสร้าง", "Consultant"),
  designer: t("ผู้ออกแบบ", "Designer"),
  designBuild: t("ผู้ออกแบบ / ผู้รับเหมา", "Designer / Contractor"),
  interior: t("ผู้ออกแบบภายใน", "Interior Design"),
  building: t("รายละเอียดอาคาร", "Building"),
  timeline: t("ระยะเวลาก่อสร้าง", "Construction Period"),
};

export const projects: Project[] = [
  {
    category: "hotel",
    image: img("mag-ratchawong.webp"),
    name: t("เดอะ ราชวงศ์ โฮเทล", "The Ratchawong Hotel"),
    location: t("ถนนทรงวาด กรุงเทพฯ", "Song Wat Road, Bangkok"),
    detail: t("โรงแรมริมแม่น้ำเจ้าพระยา ย่านทรงวาด-เยาวราช", "Riverside hotel in the Song Wat – Yaowarat district"),
    description: t(
      "มิติใหม่แห่งการพักผ่อนริมแม่น้ำเจ้าพระยา ใจกลางย่านประวัติศาสตร์ทรงวาด-เยาวราช โรงแรมที่ผสมผสานอัตลักษณ์ทางประวัติศาสตร์ ดีไซน์ร่วมสมัย และความสะดวกสบายสมัยใหม่ มอบประสบการณ์การพักผ่อนที่ทลายเส้นคั่นระหว่างการเข้าพักกับการออกไปสัมผัสชุมชน MAG CONSULTANT ทำหน้าที่เป็นตัวแทนเจ้าของโครงการ ขับเคลื่อนโครงการอย่างโปร่งใส ทั้งด้านบริหารภาพรวม (PM) ควบคุมหน้างาน (CM) และบริหารต้นทุน (QS) เพื่อลดความเสี่ยงและเพิ่มความมั่นใจในทุกขั้นตอนของการลงทุน",
      "A new paradigm of relaxation by the Chao Phraya River, in the heart of the historic Song Wat – Yaowarat district. The Ratchawong blends historical identity, contemporary design and modern comfort, dissolving the boundaries between accommodation and neighbourhood exploration. MAG CONSULTANT serves as the owner's representative, steering the project with transparency through Project Management, Construction Management and Quantity Surveying — mitigating construction risks and building confidence at every stage of the investment.",
    ),
    credits: [
      { label: L.designer, value: "Tava Architects Co., Ltd." },
      { label: L.consultant, value: "MAG CONSULTANT CO., LTD." },
    ],
    gallery: gal("ratchawong", 4).filter((g) => !g.endsWith("-02.webp")), // รูป 02 = รูปหน้าการ์ดแล้ว
    services: ALL,
  },
  {
    category: "hotel",
    image: img("mag-oblique.webp"),
    name: t("OBLIQUE RESIDENCE", "OBLIQUE RESIDENCE"),
    location: t("ต.บางม่วง อ.บางใหญ่ จ.นนทบุรี", "Bang Muang, Bang Yai, Nonthaburi"),
    detail: t("โรงแรม สูง 7 ชั้น จำนวน 78 ห้อง", "7-storey hotel, 78 rooms"),
    description: t(
      "โรงแรม Modern Urban Style สูง 7 ชั้น บนทำเลศักยภาพ อ.บางใหญ่ จ.นนทบุรี โดดเด่นด้วยงานออกแบบสถาปัตยกรรมเรียบหรู ทันสมัย สะท้อนเอกลักษณ์ผ่านเส้นสายและมิติที่เฉียบคม แนวคิดการออกแบบผสมผสานความเรียบง่ายและความทันสมัย ตอบโจทย์ทั้งการพักผ่อนและการใช้งานเชิงธุรกิจ พร้อมบรรยากาศที่เป็นส่วนตัวและเชื่อมต่อเมืองได้อย่างลงตัว MAG CONSULTANT ร่วมบริหารโครงการด้าน PM / CM / QS ตั้งแต่โครงสร้างจนแล้วเสร็จ — วางแผนและบริหารงานก่อสร้างทั้งระบบ ควบคุมคุณภาพ เวลา และงบประมาณ ตรวจสอบงานและติดตามความก้าวหน้าอย่างใกล้ชิด",
      "A 7-storey, 78-room modern urban-style hotel in Bang Yai, Nonthaburi — from its raw structural beginnings to a sophisticated, modern finish. Its sleek, contemporary architecture with sharp lines and elegant geometric forms offers travellers and business professionals a private urban oasis. MAG CONSULTANT provided PM / CM / QS services: planning and managing the overall construction process, controlling quality, timeline and budget, supervising works and monitoring progress closely, and managing quantities and cost.",
    ),
    credits: [
      { label: L.owner, value: "OBLIQUE 2019 CO., LTD." },
      { label: L.supervisor, value: "MAG CONSULTANT CO., LTD." },
      { label: L.designBuild, value: "K.BUILD CONSTRUCTION CO., LTD." },
      { label: L.interior, value: "LIVING INHABIT CO., LTD." },
    ],
    gallery: ["/images/gallery/oblique-01.webp", "/images/gallery/oblique-02.webp", "/images/gallery/oblique-03.webp"],
    services: ALL,
  },
  {
    category: "mixedUse",
    image: img("mag-baan100.webp"),
    name: t("บ้าน 100 – ราชกรีฑาสโมสร (RBSC)", "Baan 100 – Royal Bangkok Sports Club"),
    location: t("เลขที่ 1 ถ.อังรีดูนังต์ แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330", "1 Henri Dunant Road, Pathum Wan, Bangkok 10330"),
    detail: t("ปรับปรุงอาคารประวัติศาสตร์และก่อสร้างอาคารใหม่ — ร้านอาหาร คาเฟ่ บาร์ และสปา", "Historic renovation and new building — fine dining, café, bar and spa"),
    description: t(
      "ราชกรีฑาสโมสร (The Royal Bangkok Sports Club – RBSC) เป็นสปอร์ตคลับระดับเอ็กซ์คลูซีฟในกรุงเทพฯ ก่อตั้งขึ้นในปี พ.ศ. 2444 เป็นที่รู้จักจากสนามแข่งม้าแห่งแรกของประเทศ และเป็นหนึ่งในสนามกอล์ฟที่เก่าแก่ที่สุดแห่งหนึ่ง โครงการ “บ้าน 100” มีวัตถุประสงค์เพื่อปรับปรุงอาคารประวัติศาสตร์เดิมและก่อสร้างอาคารหลังใหม่บนถนนราชดำริ ให้เป็นอาคารอเนกประสงค์ ประกอบด้วยร้านอาหาร คาเฟ่ บาร์ และสปา สำหรับการพบปะและพักผ่อนของสมาชิกสโมสร พัฒนาโดย Gooodlux Design Consultancy ในฐานะผู้ออกแบบและผู้รับเหมา โดยมี MAG CONSULTANT เป็นผู้บริหารจัดการงานก่อสร้าง ด้วยความใส่ใจในทุกรายละเอียดของงานปรับปรุงอาคารเก่าแก่อายุกว่า 100 ปี",
      "The Royal Bangkok Sports Club (RBSC), founded in 1901, is an exclusive sports club in Bangkok, home to the country's first racecourse and one of its oldest golf courses. Baan 100 transforms a 100-year-old historic property on Rajadamri and adds a new building to create a luxurious lifestyle destination for members — fine dining, a café, a bar and a spa. Designed and built by Gooodlux Design Consultancy, with MAG CONSULTANT as the construction / project manager, delivering meticulous execution and the utmost attention to every detail of this delicate historic renovation.",
    ),
    credits: [
      { label: L.owner, value: "The Royal Bangkok Sports Club (RBSC)" },
      { label: L.supervisor, value: "MAG CONSULTANT CO., LTD." },
      { label: L.designBuild, value: "Gooodlux Design Consultancy" },
      { label: L.interior, value: "Gooodlux Design Consultancy" },
      { label: L.building, value: "Renovation & extension, 1–2 storeys" },
    ],
    note: t("ระยะเวลาก่อสร้างตามแผน ประมาณ 1 ปี: พฤษภาคม 2568 – พฤษภาคม 2569", "Planned construction period approx. 1 year: May 2025 – May 2026"),
    gallery: gal("baan100", 7), // รูป 08 = รูปหน้าการ์ดแล้ว
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-yannawa.webp"),
    name: t("บ้านยานนาวา", "Yannawa Residence"),
    location: t("ยานนาวา กรุงเทพฯ", "Yannawa, Bangkok"),
    detail: t("อาคารพักอาศัยสไตล์นีโอคลาสสิก", "Neoclassical-style residential building"),
    description: t(
      "อาคารพักอาศัยสไตล์นีโอคลาสสิกที่โดดเด่นด้วยความสมมาตรอันสง่างาม สัดส่วนที่ลงตัว และโทนสีอบอุ่นที่กลมกลืนกับธรรมชาติรอบข้าง การออกแบบเน้นความโปร่ง โล่ง รับแสงธรรมชาติ สะท้อนเสน่ห์แบบยุโรปคลาสสิก ผสานฟังก์ชันการใช้งานที่ทันสมัยสำหรับการอยู่อาศัยในเมือง MAG CONSULTANT มีบทบาทสำคัญในการบริหารและควบคุมงานก่อสร้าง เพื่อให้โครงการดำเนินไปอย่างมีคุณภาพ แม่นยำ และสำเร็จตามเป้าหมาย",
      "A neoclassical-style residential building distinguished by elegant symmetry, well-balanced proportions and warm tones that harmonise with the surrounding nature. The design emphasises openness and natural light, reflecting classic European charm while integrating modern functionality for urban living. MAG CONSULTANT plays a key role in project management and construction supervision, ensuring quality, precision and successful delivery.",
    ),
    credits: [
      { label: L.designer, value: "Death by Arch Co., Ltd." },
      { label: L.consultant, value: "MAG CONSULTANT CO., LTD." },
    ],
    gallery: gal("yannawa", 3).filter((g) => !g.endsWith("-02.webp")), // รูป 02 = รูปหน้าการ์ดแล้ว
    services: ["pm", "cm"],
  },
  {
    category: "resort",
    image: img("mag-avani.webp"),
    name: t("Avani Samui (Chaweng Beach Club)", "Avani Samui (Chaweng Beach Club)"),
    location: t("หาดเฉวง เกาะสมุย", "Chaweng Beach, Koh Samui"),
    note: t("ข้อมูลจากเพจ Facebook: งานพื้นที่ส่วนกลาง เฟส 1 (Phase 1 Public Area)", "From our Facebook page: Phase 1 — public area"),
    services: ALL,
  },
  {
    category: "hotel",
    image: img("mag-kene.webp"),
    name: t("Kene Hotel Bangkok", "Kene Hotel Bangkok"),
    location: t("กรุงเทพฯ", "Bangkok"),
    note: t("ข้อมูลจากเพจ Facebook: อัปเดตงานรื้อถอน (Demolition Stage) กันยายน 2561", "From our Facebook page: demolition stage update, September 2018"),
    services: ALL,
  },
  {
    category: "hotel",
    image: img("mag-akara.webp"),
    name: t("AKARA HOTEL (นาเกลือ)", "AKARA HOTEL (Naklua)"),
    location: t("นาเกลือ จ.ชลบุรี", "Naklua, Chonburi"),
    note: t("ข้อมูลจากเพจ Facebook: อัปเดตความคืบหน้างาน กันยายน 2563", "From our Facebook page: progress update, September 2020"),
    services: ALL,
  },
  {
    category: "hotel",
    image: img("mag-vista.webp"),
    name: t("Vista Hotel", "Vista Hotel"),
    location: t("พัทยา จ.ชลบุรี", "Pattaya, Chonburi"),
    services: ALL,
  },
  {
    category: "commercial",
    image: img("mag-harn.webp"),
    name: t("Harn Office Building", "Harn Office Building"),
    detail: t("อาคารสำนักงาน (DGNB)", "Office building (DGNB)"),
    note: t(
      "ข้อมูลจากเพจ Facebook: ทดสอบเสาเข็มแบบ Dynamic Load Test (ม.ค. 2562) และอัปเดตความคืบหน้างาน ตุลาคม 2562 — อาคารตามมาตรฐาน DGNB",
      "From our Facebook page: pile dynamic load test (Jan 2019) and progress update, October 2019 — DGNB building",
    ),
    gallery: ["/images/about.webp"],
    services: ALL,
  },
  {
    category: "commercial",
    image: img("mag-volvo.webp"),
    name: t("Volvo Showroom", "Volvo Showroom"),
    note: t("ข้อมูลจากเพจ Facebook: อัปเดตความคืบหน้างาน สิงหาคม – ตุลาคม 2561", "From our Facebook page: progress updates, August – October 2018"),
    services: ALL,
  },
  {
    category: "commercial",
    image: img("mag-vadini.webp"),
    name: t("VADINI Showroom", "VADINI Showroom"),
    note: t("ข้อมูลจากเพจ Facebook: อัปเดตความคืบหน้างาน สิงหาคม 2561 – กุมภาพันธ์ 2562", "From our Facebook page: progress updates, August 2018 – February 2019"),
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-suradet.webp"),
    name: t("K.Suradet House", "K.Suradet House"),
    location: t("ถนนสาทร กรุงเทพฯ", "Sathorn Road, Bangkok"),
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-plume.webp"),
    name: t("Plume Townhome", "Plume Townhome"),
    location: t("วัชรพล กรุงเทพฯ", "Watcharapol, Bangkok"),
    note: t("ข้อมูลจากเพจ Facebook: อัปเดตความคืบหน้างาน มีนาคม – มิถุนายน 2562", "From our Facebook page: progress updates, March – June 2019"),
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-setthasiri.webp"),
    name: t("Setthasiri Pattanakarn", "Setthasiri Pattanakarn"),
    location: t("พัฒนาการ กรุงเทพฯ", "Pattanakarn, Bangkok"),
    services: ALL,
  },
  {
    category: "residential",
    image: img("mag-philo.webp"),
    name: t("PHILO Ladprao 18", "PHILO Ladprao 18"),
    location: t("ลาดพร้าว 18 กรุงเทพฯ", "Ladprao 18, Bangkok"),
    services: ALL,
  },
];

export const serviceShort: Record<ServiceKey, Text> = {
  pm: { th: "บริหารโครงการ (PM)", en: "Project Management" },
  cm: { th: "บริหารงานก่อสร้าง (CM)", en: "Construction Management" },
  qs: { th: "สำรวจปริมาณ (QS)", en: "Quantity Surveying" },
};
