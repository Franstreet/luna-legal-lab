import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { aloeveraSans } from "@/lib/fonts";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

const navigation = [
  { key: "about", href: "#about" },
  { key: "practiceAreas", href: "#areas" },
  { key: "method", href: "#method" },
  { key: "lawyer", href: "#lawyer" },
] as const;

type HeroProps = {
  content: Dictionary["hero"];
  locale: Locale;
};

export function Hero({ content, locale }: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-primary text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,200,163,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(250,200,163,0.08),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-6 sm:px-8 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4 py-6 sm:gap-6">
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-[0.32em] text-white/80"
          >
            {content.brand}
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/65 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-secondary"
              >
                {content.navigation[item.key]}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:border-secondary hover:bg-white/6 hover:text-secondary"
            >
              {content.headerCta}
            </a>
          </div>
        </header>

        <div className="grid flex-1 gap-16 pb-16 pt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end lg:pb-24">
          <div className="animate-hero max-w-4xl">
            <p className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary/90">
              {content.badge}
            </p>
            <h1
              className={`${aloeveraSans.className} mt-8 text-[clamp(4rem,12vw,7.5rem)] leading-[0.9] tracking-[-0.03em] text-white`}
            >
              {content.title}
            </h1>
            <p className="mt-8 max-w-2xl text-2xl font-medium leading-tight text-white/92 sm:text-3xl">
              {content.subtitle}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70 sm:text-xl">
              {content.description}
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
            className="animate-hero rounded-[2rem] border border-white/12 bg-white/6 p-8 backdrop-blur-sm"
            style={{ animationDelay: "180ms" }}
          >
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
                  <p className="text-lg leading-8 text-white/78">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
