import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

type PracticeAreasProps = {
  content: Dictionary["practiceAreas"];
};

export function PracticeAreas({ content }: PracticeAreasProps) {
  return (
    <section id="areas" className="bg-sand/65 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {content.items.map((area, index) => (
            <Reveal key={area.title} delay={index * 120}>
              <article className="group h-full rounded-[2rem] border border-primary/10 bg-white p-8 shadow-[0_24px_60px_rgba(63,23,31,0.05)] hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_28px_80px_rgba(63,23,31,0.08)] sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/40">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 font-display text-4xl leading-none text-primary sm:text-[2.6rem]">
                  {area.title}
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/70">
                  {area.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
