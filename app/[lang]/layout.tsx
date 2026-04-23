import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { CustomCursor } from "@/components/CustomCursor";
import { HtmlLangSync } from "@/components/HtmlLangSync";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { locales } from "@/lib/i18n-config";

type LangLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.seo.title,
    description: dictionary.seo.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <>
      <HtmlLangSync lang={lang} />
      <CustomCursor />
      {children}
    </>
  );
}
