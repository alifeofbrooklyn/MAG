"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import type { Dictionary, Locale } from "@/i18n";
import { buttonClass } from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

/**
 * ฟอร์มติดต่อ — ส่งข้อมูลไปที่ /api/contact (src/app/api/contact/route.ts)
 * ซึ่งจะส่งอีเมลเข้ากล่อง CONTACT_TO_EMAIL ที่ตั้งไว้ใน .env.local
 */
export default function ContactForm({ t, locale }: { t: Dictionary; locale: Locale }) {
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!data.name?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? "") || !data.message?.trim()) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const label = "mb-1.5 block text-sm font-medium text-navy dark:text-slate-200";
  const req = (
    <span className="text-accent" aria-hidden="true">
      {" "}
      *
    </span>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8 lg:p-10" aria-describedby="form-status">
      <h3 className="text-xl font-bold text-navy dark:text-white">{f.title}</h3>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            {f.name}
            {req}
          </label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required maxLength={120} className="field" />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            {f.email}
            {req}
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={160} className="field" />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>
            {f.phone}
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className="field" />
        </div>
        <div>
          <label htmlFor="cf-company" className={label}>
            {f.company}
          </label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" maxLength={160} className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={label}>
            {f.message}
            {req}
          </label>
          <textarea id="cf-message" name="message" rows={6} required maxLength={5000} className="field resize-y" />
        </div>
        {/* กันสแปม (honeypot) — คนจริงจะมองไม่เห็นช่องนี้ */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-website">Website</label>
          <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">{f.privacy}</p>
        <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "lg", "sm:min-w-44")}>
          {status === "sending" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              {f.sending}
            </>
          ) : (
            <>
              {f.submit}
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div id="form-status" role="status" aria-live="polite">
        {status === "success" && (
          <p className="mt-5 flex items-start gap-2 rounded-md bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {f.success}
          </p>
        )}
        {(status === "error" || status === "invalid") && (
          <p className="mt-5 flex items-start gap-2 rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-500/10 dark:text-red-300">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {status === "invalid" ? f.invalid : f.error}
          </p>
        )}
      </div>
    </form>
  );
}
