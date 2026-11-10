# เว็บไซต์ MAG CONSULTANT CO., LTD.

เว็บไซต์บริษัทสำหรับ **https://magconsultant.co.th** — มี 2 ภาษา (ไทย / อังกฤษ), โหมดมืด, รองรับทุกขนาดจอ และฟอร์มติดต่อที่ส่งเข้าอีเมลโดยตรง

---

## 1. ใช้อะไรสร้างเว็บนี้บ้าง

| เครื่องมือ | ใช้ทำอะไร |
|---|---|
| **Next.js 15** (App Router) | เฟรมเวิร์กหลักของเว็บ — สร้างหน้าเว็บ, ระบบ 2 ภาษา, API ส่งอีเมล, SEO (sitemap / robots / meta) |
| **React 19 + TypeScript** | เขียนหน้าเว็บเป็น "คอมโพเนนต์" แยกชิ้น นำกลับมาใช้ซ้ำได้ และ TypeScript ช่วยเช็กความผิดพลาดก่อนรัน |
| **Tailwind CSS 3** | จัดหน้าตา สี ระยะห่าง และ responsive ด้วย class เช่น `bg-navy`, `text-white`, `lg:grid-cols-3` |
| **lucide-react** | ไอคอนเส้น (line icons) ทั้งเว็บ |
| **Lenis** | เลื่อนหน้าแบบนุ่มนวล (smooth scroll) |
| **Fontsource** (Inter + Noto Sans Thai) | ฟอนต์อังกฤษ/ไทย แบบเก็บไว้ในเว็บเอง โหลดเร็ว ไม่ต้องพึ่ง Google Fonts |
| **Nodemailer** | ส่งอีเมลจากฟอร์มติดต่อผ่าน Gmail (SMTP) |
| **next/image** | ย่อ/บีบอัดรูปอัตโนมัติ (AVIF/WebP) ให้เว็บโหลดเร็ว |

ต้องติดตั้ง **Node.js เวอร์ชัน 18.18 ขึ้นไป** (แนะนำ 20 หรือ 22) ก่อน — ดาวน์โหลดได้ที่ https://nodejs.org

---

## 2. วิธีรันบนเครื่อง

เปิด Terminal / Command Prompt ในโฟลเดอร์นี้ แล้วพิมพ์

```bash
npm install          # ติดตั้งครั้งแรกครั้งเดียว
copy .env.example .env.local    # (Windows)  หรือ  cp .env.example .env.local  (Mac/Linux)
npm run dev          # เปิดโหมดพัฒนา → เข้า http://localhost:3000
```

คำสั่งอื่น

```bash
npm run build        # สร้างเว็บเวอร์ชันจริง (เช็กว่าไม่มี error)
npm start            # รันเวอร์ชันจริงหลัง build
```

---

## 3. โครงสร้างโฟลเดอร์ — ตรงไหนคืออะไร

```
MAG/
├─ public/images/logo.webp        ← โลโก้บริษัท
├─ public/images/projects/        ← รูปผลงาน (mag-ratchawong.webp, mag-oblique.webp, ...)
├─ src/
│  ├─ app/
│  │  ├─ [locale]/layout.tsx      ← โครงหลักของทุกหน้า: SEO, ฟอนต์, ข้อมูล Google (JSON-LD), สคริปต์โหมดมืด
│  │  ├─ [locale]/page.tsx        ← หน้าแรก: เรียงลำดับ section ทั้งหมดที่นี่
│  │  ├─ api/contact/route.ts     ← ระบบรับฟอร์มและส่งอีเมล
│  │  ├─ globals.css              ← CSS กลาง (ฟอนต์ไทย, animation, ลาย blueprint)
│  │  ├─ sitemap.ts / robots.ts   ← SEO ให้ Google
│  │  └─ apple-icon.png           ← ไอคอนเวลาบันทึกเว็บลงหน้าจอมือถือ
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.tsx            ← เมนูด้านบน (sticky) + เมนูแฮมเบอร์เกอร์บนมือถือ
│  │  │  ├─ LanguageSwitcher.tsx  ← ปุ่ม TH / EN
│  │  │  ├─ ThemeToggle.tsx       ← ปุ่มโหมดมืด/สว่าง
│  │  │  └─ Footer.tsx            ← ส่วนท้ายเว็บ
│  │  ├─ sections/                ← แต่ละส่วนของหน้าแรก (1 ไฟล์ = 1 section)
│  │  │  ├─ Hero.tsx              ← (2) ภาพใหญ่ด้านบน + หัวข้อหลัก + ปุ่ม
│  │  │  ├─ About.tsx             ← (3) เกี่ยวกับ MAG CONSULTANT
│  │  │  ├─ Stats.tsx             ← (4) ตัวเลขสถิติ 20+ / 100+ / 3 / ประเทศไทย
│  │  │  ├─ Services.tsx          ← (5) บริการ 3 ด้าน
│  │  │  ├─ Projects.tsx          ← (6) ผลงาน + ตัวกรองประเภท + ปุ่ม "ดูผลงานทั้งหมด"
│  │  │  ├─ WhyUs.tsx             ← (7) ทำไมต้องเลือกเรา 6 ข้อ
│  │  │  ├─ QualityPolicy.tsx     ← (8) นโยบายคุณภาพ
│  │  │  ├─ CtaBanner.tsx         ← (9) แถบ "มีโครงการในใจหรือไม่?"
│  │  │  ├─ Contact.tsx           ← (10) ข้อมูลติดต่อ + แผนที่
│  │  │  └─ ContactForm.tsx       ← ฟอร์มติดต่อ
│  │  └─ ui/                      ← ชิ้นส่วนใช้ซ้ำ: ปุ่ม, หัวข้อ section, โลโก้, ไอคอน Facebook, animation
│  ├─ data/
│  │  ├─ site.ts                  ← ★ ข้อมูลบริษัท: เบอร์โทร, อีเมล, Facebook, ลิงก์/แผนที่ Google Maps
│  │  ├─ images.ts                ← ★ รูปภาพทั้งเว็บ (เปลี่ยนเป็นรูปจริงที่นี่)
│  │  └─ projects.ts              ← ★ รายการผลงาน
│  ├─ i18n/
│  │  ├─ th.ts                    ← ★ ข้อความภาษาไทยทั้งหมด
│  │  ├─ en.ts                    ← ★ ข้อความภาษาอังกฤษทั้งหมด
│  │  └─ config.ts                ← รายการภาษา / ภาษาเริ่มต้น (th)
│  └─ middleware.ts               ← พาผู้เข้าชมจาก "/" ไป /th หรือ /en อัตโนมัติ
├─ tailwind.config.ts             ← ★ สีแบรนด์และฟอนต์
├─ next.config.ts                 ← ตั้งค่า Next.js (อนุญาตรูปจาก Unsplash)
├─ .env.example                   ← ตัวอย่างค่าตั้งค่าอีเมล (คัดลอกเป็น .env.local)
└─ package.json                   ← รายการแพ็กเกจและคำสั่ง npm
```

ไฟล์ที่มี ★ คือไฟล์ที่จะแก้บ่อยที่สุด ส่วนใหญ่ **ไม่ต้องแตะโค้ดใน components เลย**

---

## 4. อยากแก้ ... ต้องไปแก้ตรงไหน

| อยากแก้ | ไฟล์ | หมายเหตุ |
|---|---|---|
| ข้อความใดๆ บนเว็บ (หัวข้อ, คำอธิบาย, ปุ่ม, เมนู) | `src/i18n/th.ts` และ `src/i18n/en.ts` | แก้ทั้งสองไฟล์ให้ตรงกัน key ต้องเหมือนกัน |
| ที่อยู่บริษัท | `src/i18n/th.ts` / `en.ts` → `company.address` | และใน `src/app/[locale]/layout.tsx` (ส่วน `address` ของ JSON-LD สำหรับ Google) |
| เบอร์โทร, อีเมลที่แสดงบนเว็บ, Facebook | `src/data/site.ts` | `phone` = ตัวที่แสดง, `phoneHref` = ตัวที่ใช้กดโทร |
| แผนที่ Google Maps | `src/data/site.ts` → `mapLink`, `mapEmbed` | `mapEmbed` คือค่า `src="..."` จากโค้ด iframe ของ Google Maps |
| เวลาทำการ | `src/i18n/*.ts` → `contact.hours` | |
| โลโก้ | `public/images/logo.webp` | วางไฟล์ใหม่ทับชื่อเดิม (ถ้าสัดส่วนต่างจากเดิม แก้ `width/height` ใน `src/components/ui/Logo.tsx`) |
| รูป Hero, About, Quality Policy | `src/data/images.ts` | ดูหัวข้อ 5 |
| รูปผลงาน | `public/images/projects/` | วางไฟล์ใหม่ทับชื่อเดิม หรือแก้ชื่อไฟล์ใน `src/data/projects.ts` |
| ผลงาน (ชื่อ, สถานที่, รายละเอียด, บริการ, รูป) | `src/data/projects.ts` | เพิ่มได้ไม่จำกัด แค่ copy บล็อก `{ ... }` เพิ่ม — `location` / `detail` ไม่ใส่ก็ได้ |
| ประเภทผลงาน (ปุ่มตัวกรอง) | `src/i18n/*.ts` → `projects.categories` + `ProjectCategory` ใน `projects.ts` | ปุ่มจะแสดงเฉพาะประเภทที่มีผลงานอยู่จริง |
| จำนวนการ์ดผลงานที่โชว์ก่อนกด "ดูผลงานทั้งหมด" | `src/components/sections/Projects.tsx` → `INITIAL = 6` | |
| ไอคอนของบริการ / ข้อดี / สถิติ | ตัวแปร `icons` ในไฟล์ `Services.tsx`, `WhyUs.tsx`, `Stats.tsx` | เลือกไอคอนได้ที่ https://lucide.dev/icons |
| สีแบรนด์ | `tailwind.config.ts` → `colors` | `navy #0B1F3A`, `brand #124E78`, `accent #2E86AB`, `sky.soft #EAF3F8`, `ink #1F2933` |
| ฟอนต์ | `tailwind.config.ts` → `fontFamily` และ import ใน `src/app/[locale]/layout.tsx` | |
| ลำดับ / ซ่อน section | `src/app/[locale]/page.tsx` | ย้ายหรือลบบรรทัด `<Hero ... />`, `<About ... />` ฯลฯ |
| เมนูด้านบน | `src/components/layout/Header.tsx` → ตัวแปร `links` | |
| Title / Description สำหรับ Google | `src/i18n/*.ts` → `meta` | |
| อีเมลผู้รับข้อความจากฟอร์ม | `.env.local` → `CONTACT_TO_EMAIL` | ดูหัวข้อ 6 |
| ปิด animation ตอนเลื่อน | ลบ `<Reveal />` ใน `page.tsx` | |
| ปรับ motion (ความเร็ว, ระยะ, ปิดบางอย่าง) | `src/app/globals.css` ส่วน `Motion` | ดูหัวข้อ 8 |

---

## 5. การเปลี่ยนรูปภาพเป็นรูปจริงของบริษัท

ตอนนี้รูปทั้งหมดเป็น **รูปตัวอย่างจาก Unsplash** (ใช้ฟรี) เพื่อให้เห็นหน้าตาเว็บ

1. วางไฟล์รูปไว้ใน `public/images/` เช่น `public/images/hero.jpg`, `public/images/projects/hotel-01.jpg`
2. เปิด `src/data/images.ts` แล้วเปลี่ยนค่า เช่น
   ```ts
   hero: "/images/hero.jpg",
   ```
3. ขนาดแนะนำ: Hero กว้าง 2000px, About 1200px, ผลงาน 1200×900px (สัดส่วน 4:3) — เว็บจะย่อ/บีบอัดให้อัตโนมัติ
4. ถ้าเลิกใช้ Unsplash ทั้งหมดแล้ว ลบ `remotePatterns` ใน `next.config.ts` ได้

> **ผลงานอ้างอิง** (`src/data/projects.ts`) ใช้ข้อมูลจริงจากโพสต์ในเพจ Facebook ของบริษัท (15 โครงการ) และรูปจากโพสต์เดียวกัน
> รูปจาก Facebook มีความละเอียดประมาณ 600px จึงอาจไม่คมบนจอความละเอียดสูง — ถ้ามีไฟล์รูปต้นฉบับ แนะนำให้วางทับไฟล์ใน `public/images/projects/` โดยใช้ชื่อเดิม
> ถ้าไฟล์รูปไหนยังไม่มี การ์ดจะแสดงพื้นสีน้ำเงินพร้อมไอคอนอาคารแทน (เว็บไม่พัง)

---

## 6. ตั้งค่าฟอร์มติดต่อให้ส่งเข้าอีเมล oummo100o00@gmail.com

ฟอร์มจะส่งข้อมูลไปที่ `/api/contact` (ไฟล์ `src/app/api/contact/route.ts`) แล้วส่งอีเมลผ่าน Gmail
อีเมลที่ได้จะมีหัวเรื่อง `[MAG Website] ชื่อลูกค้า (บริษัท)` และ **กด Reply ได้เลย จะตอบกลับไปหาลูกค้าทันที**

**ขั้นตอน (ทำครั้งเดียว):**

1. ล็อกอิน Gmail `oummo100o00@gmail.com`
2. เปิด **การยืนยันตัวตน 2 ขั้นตอน (2-Step Verification)** ที่ https://myaccount.google.com/security
3. ไปที่ https://myaccount.google.com/apppasswords → ตั้งชื่อ เช่น `MAG Website` → กดสร้าง
   จะได้รหัส 16 ตัวอักษร (App Password)
4. เปิดไฟล์ `.env.local` แล้วใส่

   ```env
   CONTACT_TO_EMAIL=oummo100o00@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=oummo100o00@gmail.com
   SMTP_PASS=รหัส16ตัวที่ได้ (ไม่มีเว้นวรรค)
   ```

5. รีสตาร์ท `npm run dev` แล้วลองส่งฟอร์ม

**เมื่อขึ้นโฮสต์จริง** (เช่น Vercel) ต้องใส่ค่าทั้ง 5 ตัวนี้ในหน้า *Environment Variables* ของโฮสต์ด้วย (ไฟล์ `.env.local` จะไม่ถูกอัปโหลด เพื่อความปลอดภัย)

ระบบกันสแปมที่มีอยู่แล้ว: ช่องซ่อน (honeypot) สำหรับดักบอท และจำกัดไม่เกิน 5 ข้อความ / 10 นาที / IP

---

## 7. การนำเว็บขึ้นออนไลน์ (Deploy) ที่ magconsultant.co.th

เว็บนี้มีส่วน API (ส่งอีเมล) และ middleware (เลือกภาษา) จึงต้องใช้โฮสต์ที่รัน Next.js ได้ — แนะนำ **Vercel** (มีแพ็กเกจฟรี)

1. อัปโหลดโฟลเดอร์นี้ขึ้น GitHub (ไม่ต้องอัปโหลด `node_modules`, `.next`, `.env.local`)
2. ที่ https://vercel.com → *Add New Project* → เลือก repo นี้ → Deploy
3. *Settings → Environment Variables* → ใส่ค่าจากหัวข้อ 6
4. *Settings → Domains* → เพิ่ม `magconsultant.co.th` และ `www.magconsultant.co.th`
   แล้วไปตั้งค่า DNS ที่ผู้ให้บริการโดเมน ตามที่ Vercel แสดง

ทางเลือกอื่น: เซิร์ฟเวอร์/VPS ที่มี Node.js → `npm install && npm run build && npm start` (ใช้ PM2 ช่วยให้รันตลอด)

---

## 8. ฟีเจอร์ที่มีในเว็บ

- **2 ภาษา**: `/th` และ `/en` — เข้า `magconsultant.co.th` จะเลือกภาษาให้อัตโนมัติจากเบราว์เซอร์ และจำภาษาที่ผู้ใช้เลือกล่าสุด
- **โหมดมืด**: ปุ่มพระจันทร์/พระอาทิตย์ — ครั้งแรกจะตามการตั้งค่าของเครื่อง และจำค่าที่เลือก
- **Responsive**: Desktop / Tablet / Mobile, header แบบ sticky, เมนูแฮมเบอร์เกอร์บนมือถือ
- **SEO**: title/description แยกภาษา, hreflang, Open Graph, `sitemap.xml`, `robots.txt`, ข้อมูลธุรกิจแบบ JSON-LD (ที่อยู่, โทร, เวลาทำการ, พิกัด) ให้ Google
- **Accessibility**: HTML แบบ semantic, รองรับคีย์บอร์ด, ตัวอักษรคอนทราสต์สูง, ปิด animation อัตโนมัติถ้าผู้ใช้ตั้งค่าลดการเคลื่อนไหว
- **Motion (การเคลื่อนไหว)** — เบาๆ ดูเป็นมืออาชีพ:
  - Hero: รูปซูมช้าๆ (`.ken-burns`), ข้อความขึ้นทีละบรรทัด (`.hero-in`), ลูกศรชวนเลื่อนลง (`.scroll-cue`)
  - เลื่อนถึงแล้วค่อยปรากฏ: `.reveal` (ขึ้นจากล่าง), `.reveal-left`, `.reveal-right`, `.reveal-zoom` — การ์ดปรากฏไล่ทีละใบด้วย `style={{ "--d": "120ms" }}`
  - ตัวเลขสถิตินับขึ้น 0 → 20+, 100+ (`src/components/ui/CountUp.tsx`)
  - การ์ดผลงานเล่น animation ใหม่เมื่อเปลี่ยนตัวกรอง (`.card-in`), การ์ดลอยขึ้นเมื่อชี้เมาส์
  - แถบความคืบหน้าการเลื่อนหน้าใต้ header, ป้าย "Manage to Achieve Goal" ลอยเบาๆ (`.float`), แสงเรืองในแถบ CTA (`.glow`), ลาย blueprint เลื่อนช้าๆ (`.grid-drift`)
- **ลูกเล่นสมัยใหม่** (โค้ดอยู่ใน `src/components/motion/` และท้ายไฟล์ `globals.css`):
  - Header โปร่งใสลอยทับ Hero แล้วเปลี่ยนเป็นกระจกเบลอเมื่อเลื่อน + ไฮไลต์เมนูตาม section ที่ดูอยู่
  - Hero: หัวข้อขึ้นทีละคำ, ตัวอักษรไล่สี, รูปและการ์ดกระจกขยับตามเมาส์ (`HeroPointer.tsx`), แสงเรือง aurora
  - เลื่อนหน้าแบบนุ่มนวลด้วย Lenis (`SmoothScroll.tsx`)
  - แถบชื่อโครงการเลื่อนวน (`sections/ProjectMarquee.tsx`) — ชื่อดึงจาก `projects.ts` อัตโนมัติ
  - การ์ดบริการมีแสงตามเมาส์และเอียง 3D (`SpotlightCard.tsx`), ปุ่มแม่เหล็ก (`Magnetic.tsx`), รูปเลื่อนแบบ parallax (`Parallax.tsx`)
  - กดการ์ดผลงานเพื่อเปิดดูแบบเต็มจอ (lightbox) เลื่อนด้วยลูกศร ← → ปิดด้วย Esc
  - ปุ่มลอยมุมขวาล่าง: กลับขึ้นบนพร้อมวงแหวนความคืบหน้า + ปุ่มโทร (มือถือ) (`FloatingActions.tsx`)
  - ไม่ชอบอันไหน: ลบคอมโพเนนต์นั้นออกจาก `page.tsx` หรือไฟล์ section ที่ใช้
  - ทั้งหมดปิดอัตโนมัติถ้าผู้ใช้ตั้งค่า "ลดการเคลื่อนไหว" ในเครื่อง — ถ้าไม่ชอบอันไหน ลบ class นั้นออกจากคอมโพเนนต์ได้เลย
- **ปุ่ม "ติดต่อเรา"** อยู่ที่ header ตลอด, ใน Hero, CTA และท้ายการ์ดบริการ

---

## 9. ข้อมูลที่ใช้ในเว็บ (มาจากเว็บเดิม magconsultant.co.th)

- ที่อยู่: เลขที่ 55 ซ.จรัญสนิทวงศ์ 89/2 ถ.จรัญสนิทวงศ์ แขวงบางอ้อ เขตบางพลัด กรุงเทพฯ 10700
- โทร: +66 65 528 7891 · อีเมล: pmagconsultant@gmail.com
- Facebook: https://www.facebook.com/magconsultant/
- เวลาทำการ: 09.00 – 17.30 น. (ในเว็บใส่ว่า จันทร์–ศุกร์ — ถ้าไม่ถูกต้องแก้ที่ `contact.hours` และ `openingHoursSpecification` ใน `layout.tsx`)
- ที่อยู่ภาษาอังกฤษเป็นการถอดความจากที่อยู่ภาษาไทย กรุณาตรวจสอบตัวสะกดอีกครั้ง
