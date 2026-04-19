import { notFound } from "next/navigation";

import { About } from "@/components/About";
import { AboutLawyer } from "@/components/AboutLawyer";
import { Conferences } from "@/components/Conferences";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Method } from "@/components/Method";
import { PracticeAreas } from "@/components/PracticeAreas";
import fallbackMessages from "@/messages/es.json";
import { getDictionary, hasLocale } from "@/lib/i18n";

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
      <main className="overflow-x-hidden">
        <Hero content={dictionary.hero} locale={lang} />
        <About content={dictionary.about} />
        <PracticeAreas content={dictionary.practiceAreas} />
        <Method content={dictionary.method} />
        <AboutLawyer content={dictionary.aboutLawyer} locale={lang} />
        <Conferences content={conferencesContent} />
        <Contact content={dictionary.contact} />
      </main>
      <Footer content={dictionary.footer} />
    </>
  );
}
