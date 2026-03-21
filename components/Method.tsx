import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

type MethodProps = {
  content: Dictionary["method"];
};

export function Method({ content }: MethodProps) {
  return (
    <section
      id="method"
      className="relative isolate overflow-hidden bg-primary py-24 text-white sm:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,200,163,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(250,200,163,0.07),transparent_24%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
            inverse
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {content.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 120}>
              <article className="h-full rounded-[2rem] border border-white/10 bg-white/6 p-8 backdrop-blur-sm sm:p-10">
                <p className="font-display text-6xl leading-none text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 font-display text-4xl leading-none text-white">
                  {step.title}
                </h3>
                <p className="mt-5 text-lg leading-8 text-white/74">
                  {step.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
