import "server-only";

import es from "@/messages/es.json";
import { locales, type Locale } from "@/lib/i18n-config";

export type Dictionary = typeof es;

type DeepPartial<T> =
  T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

type PartialDictionary = DeepPartial<Dictionary>;

function mergeDictionary<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined) {
    return base;
  }

  if (Array.isArray(base) || Array.isArray(override)) {
    return override as T;
  }

  if (
    base !== null &&
    override !== null &&
    typeof base === "object" &&
    typeof override === "object"
  ) {
    const baseObject = base as Record<string, unknown>;
    const overrideObject = override as Record<string, unknown>;
    const result: Record<string, unknown> = { ...baseObject, ...overrideObject };

    for (const key of Object.keys(baseObject)) {
      result[key] = mergeDictionary(
        baseObject[key],
        overrideObject[key] as DeepPartial<typeof baseObject[typeof key]> | undefined,
      );
    }

    return result as T;
  }

  return override as T;
}

const dictionaries: Record<Locale, () => Promise<PartialDictionary>> = {
  es: () => import("@/messages/es.json").then((module) => module.default),
  en: () => import("@/messages/en.json").then((module) => module.default),
  de: () => import("@/messages/de.json").then((module) => module.default),
  it: () => import("@/messages/it.json").then((module) => module.default),
};

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale) {
  const dictionary = await dictionaries[locale]();
  return mergeDictionary(es, dictionary);
}
