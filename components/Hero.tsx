import Image from "next/image";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNavMenu } from "@/components/MobileNavMenu";
import { aloeveraSans } from "@/lib/fonts";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import brandWordmark from "@/public/images/fondo_beige.webp";

const navigation = [
  { key: "about", href: "#about" },
  { key: "practiceAreas", href: "#areas" },
  { key: "method", href: "#method" },
  { key: "lawyer", href: "#lawyer" },
  { key: "conferences", href: "#conferences" },
] as const;

type HeroProps = {
  content: Dictionary["hero"];
  locale: Locale;
};

export function Hero({ content, locale }: HeroProps) {
  const isEnglish = locale === "en";
  const navigationItems = navigation.flatMap((item) => {
    const label = (content.navigation as Record<string, string | undefined>)[item.key];

    if (!label) {
      return [];
    }

    return [{ ...item, label }];
  });
  const serviceTitleSizeClass = isEnglish
    ? "text-[clamp(2.9rem,7.5vw,5.8rem)]"
    : "text-[clamp(3.2rem,8vw,6.2rem)]";
  const serviceTitleWidthClass = isEnglish
    ? "max-w-[760px]"
    : "max-w-[860px]";
  const serviceTitleParts =
    isEnglish && content.title.includes(" and ")
      ? (() => {
          const [firstPart, ...rest] = content.title.split(" and ");
          return [`${firstPart} and`, rest.join(" and ")];
        })()
      : locale === "es" && content.title.includes(" y ")
        ? (() => {
            const [firstPart, secondPart] = content.title.split(" y ");
            const spanishParts = firstPart.split(" ");

            if (spanishParts.length === 2) {
              return [spanishParts[0], `${spanishParts[1]} y`, secondPart];
            }

            return [firstPart, `y ${secondPart}`];
          })()
        : [content.title];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-primary text-white xl:min-h-[100svh]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,200,163,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(250,200,163,0.08),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 sm:px-8 lg:px-12 xl:min-h-[100svh]">
        <header className="relative grid grid-cols-[auto_1fr_auto] items-center gap-3 py-6 md:flex md:flex-wrap md:items-center md:justify-between md:gap-6">
          <a
            href="#top"
            className="shrink-0"
          >
            <Image
              src={brandWordmark}
              alt={content.brand}
              priority
              className="h-auto w-[42px] sm:w-[64px]"
            />
          </a>

          <div className="justify-self-center md:hidden">
            <LanguageSwitcher locale={locale} />
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/65 md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-secondary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden min-w-0 items-center justify-end gap-2 md:ml-auto md:flex md:gap-3">
            <LanguageSwitcher locale={locale} />
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center rounded-full border border-white/15 px-3 py-2 text-[13px] font-semibold text-white hover:border-secondary hover:bg-white/6 hover:text-secondary sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {content.headerCta}
            </a>
          </div>

          <div className="flex items-center justify-end md:hidden">
            <MobileNavMenu items={navigationItems} />
          </div>
        </header>

        <div className="grid flex-1 gap-14 pb-16 pt-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-start lg:gap-12 lg:pb-24">
          <div className="animate-hero max-w-[46rem] lg:-mt-4">
            <p className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary/90">
              {content.badge}
            </p>
            <h1
              className={`${aloeveraSans.className} ${serviceTitleSizeClass} ${serviceTitleWidthClass} mt-8 text-balance leading-[0.88] tracking-[-0.03em] text-white`}
            >
              {serviceTitleParts.map((part) => (
                <span
                  key={part}
                  className={locale === "es" ? "block whitespace-nowrap" : "block"}
                >
                  {part}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-2xl text-2xl font-medium leading-tight text-white/92 sm:text-3xl">
              {content.subtitle}
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-4 text-base font-semibold text-primary shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-[#ffd8bc]"
              >
                {content.primaryCta}
              </a>
              <a
                href="#areas"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-base font-semibold text-white hover:border-secondary hover:text-secondary"
              >
                {content.secondaryCta}
              </a>
            </div>
          </div>

          <div
            className="animate-hero flex flex-col gap-8 lg:max-w-[32rem] lg:self-start lg:pt-16"
            style={{ animationDelay: "180ms" }}
          >
            <div className="rounded-[2rem] border border-white/12 bg-white/6 p-8 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-secondary/80">
                {content.focus.title}
              </p>
              <div className="mt-8 space-y-6">
                {content.focus.items.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex gap-4 border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-secondary" />
                    <p className="text-lg leading-8 text-white/78">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-md pl-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                {content.advisoryLabel}
              </p>
              <p className="text-lg leading-8 text-white/90 sm:text-xl">
                {content.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
