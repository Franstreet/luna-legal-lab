import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { HtmlLangSync } from "@/components/HtmlLangSync";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { locales } from "@/lib/i18n-config";

const BASE_URL = "https://lunalegallab.com";

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
  const { title, description } = dictionary.seo;
  const url = `${BASE_URL}/${lang}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Luna Legal Lab",
      images: [
        {
          url: "/images/fondo_burdeo.webp",
          width: 1200,
          height: 630,
          alt: "Luna Legal Lab",
        },
      ],
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/fondo_burdeo.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
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
      {children}
    </>
  );
}
