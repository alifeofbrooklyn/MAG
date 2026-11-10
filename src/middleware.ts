import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * ถ้าเข้าเว็บโดยไม่มีภาษาใน URL (เช่น "/") จะพาไป /th หรือ /en อัตโนมัติ
 * ลำดับการเลือก: ภาษาที่เคยเลือก (cookie) → ภาษาของเบราว์เซอร์ → ไทย
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  let locale = cookie && isLocale(cookie) ? cookie : undefined;
  if (!locale) {
    const accept = request.headers.get("accept-language") ?? "";
    locale = /^\s*th\b/i.test(accept) || /\bth\b/i.test(accept) ? "th" : accept ? "en" : defaultLocale;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // ไม่ redirect ไฟล์ระบบ, api, รูปภาพ และไฟล์ที่มีนามสกุล
  matcher: ["/((?!api|_next|images|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
