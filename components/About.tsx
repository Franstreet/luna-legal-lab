import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

type AboutProps = {
  content: Dictionary["about"];
};

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

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <Reveal>
            <article className="rounded-[2rem] border border-primary/10 bg-white/75 p-8 shadow-[0_24px_80px_rgba(63,23,31,0.06)] sm:p-10">
              <p className="text-2xl leading-10 text-foreground/82">{content.paragraphs[0]}</p>
              <p className="mt-6 text-lg leading-8 text-foreground/68">{content.paragraphs[1]}</p>
            </article>
          </Reveal>

          <div className="grid gap-4">
            {content.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 120}>
                <article className="rounded-[1.5rem] border border-primary/10 bg-surface p-6 shadow-[0_16px_50px_rgba(63,23,31,0.04)]">
                  <h3 className="font-display text-3xl leading-none text-primary">
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
