import Image from "next/image";

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
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:px-12 lg:items-start">
        <div className="flex flex-col gap-8 lg:gap-10">
          <Reveal>
            <div className="aspect-[4/5] rounded-[2rem] border border-primary/12 bg-[linear-gradient(145deg,rgba(63,23,31,0.06),rgba(250,200,163,0.18))] p-6 shadow-[0_24px_70px_rgba(63,23,31,0.06)]">
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white/30">
                <Image
                  src={lawyerPortrait}
                  alt={content.imagePlaceholder.title}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 30rem, 34rem"
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,245,0.03),rgba(63,23,31,0.06))]" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-6">
              <div className={pillarsGridClass}>
                {content.pillars.map((pillar, index) => (
                  <div
                    key={pillar}
                    className="rounded-[1.5rem] border border-primary/10 bg-white/80 p-6 shadow-[0_18px_48px_rgba(63,23,31,0.04)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/40">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={pillarTextClass}>
                      {pillar}
                    </p>
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

        <Reveal delay={120}>
          <div id="lawyer-profile">
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />

            <div className="mt-8 space-y-5">
              {content.paragraphs.map((paragraph, index) => (
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
