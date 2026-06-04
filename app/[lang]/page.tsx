import { notFound } from "next/navigation";

import { About } from "@/components/About";
import { AboutLawyer } from "@/components/AboutLawyer";
import { Conferences } from "@/components/Conferences";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Method } from "@/components/Method";
import { PracticeAreas } from "@/components/PracticeAreas";
import { SectionFade } from "@/components/SectionFade";
import fallbackMessages from "@/messages/es.json";
import { getDictionary, hasLocale } from "@/lib/i18n";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Luna Legal Lab",
  description:
    "Despacho especializado en derecho penal, ciberdelitos, derecho corporativo e inteligencia artificial.",
  url: "https://lunalegallab.com",
  logo: "https://lunalegallab.com/images/isotipo_burdeo.png",
  image: "https://lunalegallab.com/images/fondo_burdeo.webp",
  telephone: "+34659805906",
  email: "eduardo@lunalegallab.com",
  founder: {
    "@type": "Person",
    name: "Eduardo R. Luna Álvarez",
    jobTitle: "Abogado",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Reina Esclaramunda nº1, 2º 1ª",
    addressLocality: "Palma",
    addressRegion: "Islas Baleares",
    postalCode: "07003",
    addressCountry: "ES",
  },
  areaServed: ["ES", "IT", "DE", "International"],
  knowsAbout: [
    "Derecho Penal",
    "Ciberdelitos",
    "Derecho Corporativo",
    "Compliance",
    "Inteligencia Artificial",
    "Derecho Tecnológico",
  ],
  sameAs: ["https://lunalegallab.com"],
};

type LangPageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: LangPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const conferencesContent =
    (dictionary as { conferences?: typeof fallbackMessages.conferences }).conferences ??
    fallbackMessages.conferences;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-x-hidden">
        <Hero content={dictionary.hero} locale={lang} />
        <SectionFade from="dark" />
        <About content={dictionary.about} />
        <PracticeAreas content={dictionary.practiceAreas} />
        <Method content={dictionary.method} />
        <SectionFade from="dark" />
        <AboutLawyer content={dictionary.aboutLawyer} locale={lang} />
        <Conferences content={conferencesContent} />
        <Contact content={dictionary.contact} />
      </main>
      <Footer content={dictionary.footer} />
    </>
  );
}
