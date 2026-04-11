import { notFound } from "next/navigation";

import { About } from "@/components/About";
import { AboutLawyer } from "@/components/AboutLawyer";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Method } from "@/components/Method";
import { PracticeAreas } from "@/components/PracticeAreas";
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

  return (
    <>
      <main className="overflow-x-hidden">
        <Hero content={dictionary.hero} locale={lang} />
        <About content={dictionary.about} />
        <PracticeAreas content={dictionary.practiceAreas} />
        <Method content={dictionary.method} />
        <AboutLawyer content={dictionary.aboutLawyer} locale={lang} />
        <Contact content={dictionary.contact} />
      </main>
      <Footer content={dictionary.footer} />
    </>
  );
}
