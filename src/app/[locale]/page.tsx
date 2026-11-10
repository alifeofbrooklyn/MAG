import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import WhyUs from "@/components/sections/WhyUs";
import QualityPolicy from "@/components/sections/QualityPolicy";
import CtaBanner from "@/components/sections/CtaBanner";
import Contact from "@/components/sections/Contact";
import Reveal from "@/components/ui/Reveal";

/**
 * หน้าแรก — เรียงลำดับ section ได้ที่นี่ (ย้ายบรรทัด / ลบบรรทัด = ย้าย / ซ่อน section)
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <Header t={t} locale={locale} />
      <main id="main">
        <Hero t={t} />
        <About t={t} />
        <Stats t={t} />
        <Services t={t} />
        <Projects t={t} locale={locale} />
        <WhyUs t={t} />
        <QualityPolicy t={t} />
        <CtaBanner t={t} />
        <Contact t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
      <Reveal />
    </>
  );
}
