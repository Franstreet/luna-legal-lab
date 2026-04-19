import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

type ConferencesProps = {
  content: Dictionary["conferences"];
};

export function Conferences({ content }: ConferencesProps) {
  return (
    <section id="conferences" className="relative isolate overflow-hidden bg-sand/40 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(250,200,163,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(63,23,31,0.04),transparent_26%)]" />

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
          />
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-16 flex justify-center">
            <a
              href="https://www.youtube.com/@eduardolunaabogado/videos?app=desktop&view=0&sort=dd&shelf_id=1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center justify-center rounded-full border border-primary/14 bg-white/80 px-6 py-3 text-sm font-semibold text-primary shadow-[0_16px_40px_rgba(63,23,31,0.05)] hover:-translate-y-0.5 hover:border-primary/24 hover:bg-white"
            >
              {content.videoButton}
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.04fr)_minmax(300px,0.96fr)]">
          <Reveal>
            <article className="rounded-[2rem] border border-primary/10 bg-white/78 p-8 shadow-[0_24px_80px_rgba(63,23,31,0.06)] sm:p-10">
              <p className="text-2xl leading-10 text-foreground/82">
                {content.paragraphs[0]}
              </p>
              <p className="mt-6 text-lg leading-8 text-foreground/68">
                {content.paragraphs[1]}
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-primary/10 bg-sand/60 p-6 shadow-[0_16px_50px_rgba(63,23,31,0.04)]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/45">
                  {content.featured.eyebrow}
                </p>
                <p className="mt-4 text-xl leading-9 text-primary sm:text-2xl">
                  {content.featured.text}
                </p>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <Reveal delay={120}>
              <article className="rounded-[1.5rem] border border-primary/10 bg-white/80 p-6 shadow-[0_18px_48px_rgba(63,23,31,0.04)]">
                <h3 className="font-display text-[2.1rem] leading-none text-primary">
                  {content.highlights.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-foreground/68">
                  {content.highlights.description}
                </p>

                <div className="mt-6 space-y-4">
                  {content.highlights.items.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
                      <p className="text-base leading-7 text-foreground/74">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delay={240}>
              <article className="rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(145deg,rgba(255,250,245,0.94),rgba(250,200,163,0.22))] p-6 shadow-[0_18px_48px_rgba(63,23,31,0.04)]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/45">
                  {content.publicArchive.eyebrow}
                </p>
                <h3 className="mt-4 font-display text-[2rem] leading-none text-primary">
                  {content.publicArchive.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-foreground/68">
                  {content.publicArchive.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {content.publicArchive.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/12 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/55"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          </div>
        </div>

        <div className="mt-16">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/45">
                {content.topics.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-4xl leading-none text-primary sm:text-5xl">
                {content.topics.title}
              </h3>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.topics.items.map((item, index) => (
              <Reveal key={item} delay={index * 80}>
                <article className="h-full rounded-[1.5rem] border border-primary/10 bg-white/80 p-6 shadow-[0_18px_48px_rgba(63,23,31,0.04)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/40">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-5 font-display text-[2rem] leading-[1.02] text-primary">
                    {item}
                  </h4>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={160}>
          <div className="mt-16 rounded-[2rem] bg-primary p-8 shadow-[0_32px_90px_rgba(63,23,31,0.14)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h3 className="font-display text-4xl leading-none text-white sm:text-5xl">
                  {content.cta.title}
                </h3>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/68">
                  {content.cta.description}
                </p>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-4 text-base font-semibold text-primary shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-[#ffd8bc]"
              >
                {content.cta.button}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
