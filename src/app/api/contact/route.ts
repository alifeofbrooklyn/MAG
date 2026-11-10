import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * API รับข้อมูลจากฟอร์มติดต่อ แล้วส่งอีเมลผ่าน SMTP (Gmail)
 * ตั้งค่าใน .env.local (ดูตัวอย่างใน .env.example):
 *   CONTACT_TO_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 */
export const runtime = "nodejs";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// จำกัดการส่งซ้ำแบบง่ายๆ (ต่อ IP, ต่อ instance ของเซิร์ฟเวอร์)
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5; // เกิน 5 ครั้ง / 10 นาที
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const get = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const name = get("name", 120);
  const email = get("email", 160);
  const phone = get("phone", 40);
  const company = get("company", 160);
  const message = get("message", 5000);
  const website = get("website", 200); // honeypot

  // บอทที่กรอกช่องซ่อน → ตอบว่าสำเร็จแต่ไม่ส่งจริง
  if (website) return NextResponse.json({ ok: true });

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP_USER / SMTP_PASS ยังไม่ได้ตั้งค่าใน .env.local");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["ชื่อ / Name", name],
    ["อีเมล / Email", email],
    ["โทร / Phone", phone || "-"],
    ["บริษัท / Company", company || "-"],
  ];

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:640px;color:#1F2933">
    <div style="background:#0B1F3A;color:#fff;padding:18px 24px;border-radius:6px 6px 0 0">
      <strong>MAG CONSULTANT</strong> — ข้อความใหม่จากเว็บไซต์ / New website enquiry
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 16px;background:#EAF3F8;width:170px;font-weight:bold;border-bottom:1px solid #e2e8f0">${k}</td><td style="padding:10px 16px;border-bottom:1px solid #e2e8f0">${esc(v)}</td></tr>`,
        )
        .join("")}
      <tr><td colspan="2" style="padding:16px;white-space:pre-wrap;line-height:1.6">${esc(message)}</td></tr>
    </table>
    <p style="font-size:12px;color:#64748b">ส่งจากฟอร์มติดต่อ magconsultant.co.th</p>
  </div>`;

  try {
    await transporter.sendMail({
      from: `"MAG CONSULTANT Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL || "oummo100o00@gmail.com",
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`, // กด Reply แล้วตอบกลับหาลูกค้าได้ทันที
      subject: `[MAG Website] ${name}${company ? ` (${company})` : ""}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
