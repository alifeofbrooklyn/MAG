import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Intro from "@/components/sections/Intro";
import Mission from "@/components/sections/Mission";
import Process from "@/components/sections/Process";
import Products from "@/components/sections/Products";
import Sectors from "@/components/sections/Sectors";
import CompanyProfile from "@/components/sections/CompanyProfile";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import WhyUs from "@/components/sections/WhyUs";
import QualityPolicy from "@/components/sections/QualityPolicy";
import CtaBanner from "@/components/sections/CtaBanner";
import Contact from "@/components/sections/Contact";
import IntroLoader from "@/components/motion/IntroLoader";
import Reveal from "@/components/ui/Reveal";
import ProjectMarquee from "@/components/sections/ProjectMarquee";
import SmoothScroll from "@/components/motion/SmoothScroll";
import FloatingActions from "@/components/motion/FloatingActions";
import { site } from "@/data/site";

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
        <Intro t={t} />
        <About t={t} />
        <Mission t={t} />
        <Services t={t} />
        <Process t={t} />
        <Products t={t} locale={locale} />
        <ProjectMarquee t={t} locale={locale} />
        <Projects t={t} locale={locale} />
        <Sectors t={t} />
        <CompanyProfile t={t} />
        <WhyUs t={t} />
        <QualityPolicy t={t} />
        <CtaBanner t={t} />
        <Contact t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
      <IntroLoader skipLabel={t.nav.skipIntro} tagline={t.hero.tagline} />
      <Reveal />
      {/* ลูกเล่นเสริม — ลบบรรทัดไหนก็ได้ถ้าไม่ต้องการ */}
      <SmoothScroll />
      <FloatingActions phoneHref={site.phoneHref} phoneLabel={t.contact.phoneLabel} topLabel={t.footer.backToTop} />
    </>
  );
}
