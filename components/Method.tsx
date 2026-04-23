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

        {/* Connector track — desktop only */}
        <Reveal delay={80} className="mt-16 hidden lg:block" aria-hidden="true">
          <div className="relative flex items-center justify-around">
            {/* Background line spanning node-to-node */}
            <div className="absolute inset-y-1/2 left-[16.5%] right-[16.5%] h-px -translate-y-1/2 bg-linear-to-r from-secondary/20 via-secondary/50 to-secondary/20" />
            {content.steps.map((step, index) => (
              <div key={step.title} className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-secondary/40 bg-primary shadow-[0_0_16px_rgba(250,200,163,0.18)]">
                  <span className="font-display text-sm leading-none text-secondary/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-4 grid gap-6 pl-10 lg:mt-6 lg:grid-cols-3 lg:pl-0">
          {/* Mobile vertical timeline line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-secondary/40 to-transparent lg:hidden"
            aria-hidden="true"
          />

          {content.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 200}>
              <article className="group relative h-full rounded-4xl border border-white/10 bg-white/6 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-secondary/20 hover:bg-white/9 sm:p-10">
                {/* Mobile timeline node */}
                <div
                  className="absolute -left-5 top-8 h-3 w-3 rounded-full border-2 border-secondary bg-primary lg:hidden"
                  aria-hidden="true"
                />
                {/* Number only shown on mobile (desktop shows the connector track above) */}
                <p className="font-display text-6xl leading-none text-secondary lg:hidden">
                  {String(index + 1).padStart(2, "0")}
                </p>
                {/* Accent line */}
                <div className="mt-8 h-px w-8 bg-secondary/40 transition-all duration-500 group-hover:w-14 group-hover:bg-secondary/70 lg:mt-0" />
                <h3 className="mt-6 font-display text-4xl leading-none text-white">
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
