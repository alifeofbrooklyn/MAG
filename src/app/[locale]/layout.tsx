import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght-italic.css";
import "@fontsource-variable/noto-sans-thai";
import "../globals.css";
import { getDictionary, isLocale, locales } from "@/i18n";
import { site } from "@/data/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { th: "/th", en: "/en", "x-default": "/th" },
    },
    openGraph: {
      type: "website",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
    icons: { icon: "/images/logo.webp" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#071528" },
  ],
};

/** สคริปต์เล็กๆ ที่รันก่อนแสดงผล เพื่อใส่ class "dark" ทันที (ไม่ให้จอกระพริบ) */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}document.documentElement.classList.remove('no-js');try{if(/^\\/(th|en)\\/?$/.test(location.pathname)&&!sessionStorage.getItem('mag-intro'))document.documentElement.classList.add('intro');}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  // ข้อมูลโครงสร้างสำหรับ Google (SEO) — ProfessionalService
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.logo}`,
    description: t.meta.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "55 Soi Charansanitwong 89/2, Charansanitwong Road, Bang O",
      addressLocality: "Bang Phlat, Bangkok",
      postalCode: "10700",
      addressCountry: "TH",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
    sameAs: [site.facebook],
    areaServed: "TH",
  };

  return (
    <html lang={locale} className="no-js" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
