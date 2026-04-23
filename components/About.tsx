import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

type AboutProps = {
  content: Dictionary["about"];
};

const romanNumerals = ["I", "II", "III"] as const;

export function About({ content }: AboutProps) {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-16">
          {/* Left column — pull quote + second paragraph */}
          <Reveal>
            <div className="relative">
              {/* Decorative "01" */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-4 select-none font-display text-[10rem] leading-none text-primary/4"
              >
                01
              </span>

              {/* Pull quote */}
              <blockquote>
                <span
                  aria-hidden="true"
                  className="block font-display text-6xl leading-none text-secondary/50"
                >
                  «
                </span>
                <p className="mt-1 font-display text-3xl leading-snug text-foreground/85 sm:text-4xl">
                  {content.paragraphs[0]}
                </p>
              </blockquote>

              {/* Second paragraph */}
              <p className="mt-10 text-lg leading-8 text-foreground/68">
                {content.paragraphs[1]}
              </p>
            </div>
          </Reveal>

          {/* Right column — value cards */}
          <div className="grid gap-4">
            {content.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 120}>
                <article className="rounded-3xl border-l-4 border-secondary bg-white/90 p-7 shadow-[0_16px_50px_rgba(63,23,31,0.04)]">
                  <p className="font-display text-4xl leading-none text-secondary/60">
                    {romanNumerals[index]}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-none text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-foreground/70">
                    {value.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
