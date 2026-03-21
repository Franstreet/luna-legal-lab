import "server-only";

import es from "@/messages/es.json";
import { locales, type Locale } from "@/lib/i18n-config";

export type Dictionary = typeof es;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("@/messages/es.json").then((module) => module.default),
  en: () => import("@/messages/en.json").then((module) => module.default),
  de: () => import("@/messages/de.json").then((module) => module.default),
  it: () => import("@/messages/it.json").then((module) => module.default),
};

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
