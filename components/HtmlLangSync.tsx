"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n-config";

type HtmlLangSyncProps = {
  lang: Locale;
};

export function HtmlLangSync({ lang }: HtmlLangSyncProps) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
