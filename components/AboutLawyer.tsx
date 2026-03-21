import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";
import lawyerPortrait from "@/public/images/eduardo.webp";

type AboutLawyerProps = {
  content: Dictionary["aboutLawyer"];
};

export function AboutLawyer({ content }: AboutLawyerProps) {
  return (
    <section id="lawyer" className="py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)] lg:px-12 lg:items-center">
        <Reveal>
          <div className="aspect-[4/5] rounded-[2rem] border border-primary/12 bg-[linear-gradient(145deg,rgba(63,23,31,0.06),rgba(250,200,163,0.18))] p-6 shadow-[0_24px_70px_rgba(63,23,31,0.06)]">
            <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white/30">
              <Image
                src={lawyerPortrait}
                alt={content.imagePlaceholder.title}
                fill
                sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 28rem, 32rem"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,245,0.03),rgba(63,23,31,0.06))]" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />

            <div className="mt-8 space-y-6 text-lg leading-8 text-foreground/72">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {content.pillars.map((pillar, index) => (
                <div
                  key={pillar}
                  className="rounded-[1.5rem] border border-primary/10 bg-white/80 p-6 shadow-[0_18px_48px_rgba(63,23,31,0.04)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/40">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-base leading-7 text-foreground/70">
                    {pillar}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
