import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

type ContactProps = {
  content: Dictionary["contact"];
};

export function Contact({ content }: ContactProps) {
  return (
    <section id="contact" className="bg-sand/55 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow={content.eyebrow}
                title={content.title}
                description={content.description}
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {content.details.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-[1.5rem] border border-primary/10 bg-white/80 p-6 shadow-[0_16px_50px_rgba(63,23,31,0.04)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/45">
                      {item.label}
                    </p>
                    <p className="mt-3 text-lg leading-7 text-foreground/74">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[2rem] bg-primary p-8 shadow-[0_32px_90px_rgba(63,23,31,0.14)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-secondary/80">
                {content.form.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl">
                {content.form.title}
              </h3>
              <p className="mt-4 max-w-xl text-lg leading-8 text-white/68">
                {content.form.description}
              </p>

              <div className="mt-8">
                <ContactForm content={content.form} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
