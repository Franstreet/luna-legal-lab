"use client";

import { startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  localeLabels,
  localeNames,
  locales,
  type Locale,
} from "@/lib/i18n-config";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLanguageChange(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    const nextPathname = pathname.replace(
      /^\/(es|en|de|it)(?=\/|$)/,
      `/${nextLocale}`,
    );
    const target = `${nextPathname || `/${nextLocale}`}${window.location.hash}`;

    startTransition(() => {
      router.push(target);
    });
  }

  return (
    <div className="inline-flex items-center rounded-full border border-white/15 bg-white/6 p-1 backdrop-blur-sm">
      {locales.map((item) => {
        const isActive = item === locale;

        return (
          <button
            key={item}
            type="button"
            aria-pressed={isActive}
            aria-label={localeNames[item]}
            onClick={() => handleLanguageChange(item)}
            className={[
              "rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
              isActive
                ? "bg-secondary text-primary shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
                : "text-white/72 hover:text-secondary",
            ].join(" ")}
          >
            {localeLabels[item]}
          </button>
        );
      })}
    </div>
  );
}
