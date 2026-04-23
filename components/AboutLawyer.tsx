import Image from "next/image";

import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import lawyerPortrait from "@/public/images/eduardo.webp";

type AboutLawyerProps = {
  content: Dictionary["aboutLawyer"];
  locale: Locale;
};

export function AboutLawyer({ content, locale }: AboutLawyerProps) {
  const pillarsGridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-1";
  const pillarTextClass =
    locale === "de"
      ? "mt-4 break-words hyphens-auto text-sm leading-6 text-foreground/70"
      : "mt-4 text-base leading-7 text-foreground/70";

  return (
    <section id="lawyer" className="py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:px-12">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-8 lg:gap-10">
          <Reveal>
            {/* Full-bleed photo — no padding, no border, no background */}
            <div className="relative aspect-4/5 overflow-hidden rounded-4xl transform-[translateZ(0)]">
              <Image
                src={lawyerPortrait}
                alt={content.imagePlaceholder.title}
                fill
                sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 30rem, 34rem"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
              {/* Subtle vignette overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,245,0.02),rgba(63,23,31,0.18))]" />

              {/* Award badge — overlay redesigned */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2.5 rounded-2xl bg-primary/85 px-4 py-3 backdrop-blur-sm">
                  <span className="text-secondary" aria-hidden="true">★</span>
                  <span className="text-sm text-white/90">{content.award}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-6">
              {/* Animated stats */}
              <div className="grid grid-cols-3 divide-x divide-primary/10 rounded-3xl border border-primary/10 bg-white/80 px-2 py-5 shadow-[0_18px_48px_rgba(63,23,31,0.04)]">
                {content.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1 px-3 text-center">
                    <p className="font-display text-3xl text-primary">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className={pillarsGridClass}>
                {content.pillars.map((pillar, index) => (
                  <div
                    key={pillar}
                    className="rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-[0_18px_48px_rgba(63,23,31,0.04)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/40">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={pillarTextClass}>{pillar}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://dialnet.unirioja.es/servlet/autor?codigo=5975292"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-full border border-primary/14 bg-white/80 px-6 py-3 text-sm font-semibold text-primary shadow-[0_16px_40px_rgba(63,23,31,0.05)] hover:-translate-y-0.5 hover:border-primary/24 hover:bg-white"
              >
                {content.fullProfileCta}
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Right column ── */}
        <Reveal delay={120}>
          <div id="lawyer-profile">
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />

            {/* Pull quote — paragraphs[0] */}
            <div className="mt-8">
              <span
                aria-hidden="true"
                className="block font-display text-7xl leading-none text-secondary/40"
              >
                &quot;
              </span>
              <p className="mt-1 font-display text-xl italic leading-relaxed text-foreground/80">
                {content.paragraphs[0]}
              </p>
              <div className="mt-6 h-px bg-primary/10" />
            </div>

            {/* Remaining paragraphs */}
            <div className="mt-6 space-y-5">
              {content.paragraphs.slice(1).map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-xl leading-9 text-foreground/84"
                      : "text-lg leading-8 text-foreground/72"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
