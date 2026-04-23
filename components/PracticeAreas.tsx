import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

type PracticeAreasProps = {
  content: Dictionary["practiceAreas"];
};

const areaIcons = [
  // Ciberdelitos — shield with lock
  <svg key="cyber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
    <rect x="9" y="11" width="6" height="5" rx="1" />
    <path d="M12 11V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
  </svg>,
  // Derecho Penal — scales
  <svg key="penal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M12 3v18M3 12h18M6 18H3l3-6 3 6H6zM18 18h-3l3-6 3 6h-3z" />
  </svg>,
  // Compliance — building
  <svg key="corp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="3" y="9" width="18" height="12" rx="1" />
    <path d="M8 9V7a4 4 0 0 1 8 0v2M12 13v4M8 13v1M16 13v1" />
  </svg>,
  // IA — chip
  <svg key="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3" />
  </svg>,
];

export function PracticeAreas({ content }: PracticeAreasProps) {
  const featured = content.items[0];
  const rest = content.items.slice(1);

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

        <div className="mt-16 grid gap-6">
          {/* ── Featured card — Ciberdelitos (col-span full) ── */}
          <Reveal delay={0}>
            <article className="group relative min-h-55 overflow-hidden rounded-4xl border border-primary/10 bg-linear-to-br from-white to-sand/60 p-8 shadow-[0_24px_60px_rgba(63,23,31,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_28px_80px_rgba(63,23,31,0.10)] sm:p-10">
              {/* Large decorative "01" */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-0 select-none font-display text-[12rem] leading-none text-primary/4 transition-all duration-500 group-hover:text-primary/[0.07]"
              >
                01
              </span>

              {/* Left accent line */}
              <div className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 rounded-full bg-linear-to-t from-secondary via-secondary/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100" />

              {/* Icon + number */}
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/10 bg-sand/60 text-primary/60 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-sand group-hover:text-primary">
                  {areaIcons[0]}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/30">
                  01
                </p>
              </div>

              {/* Title */}
              <h3 className="mt-7 font-display text-4xl leading-none text-primary transition-colors duration-300 sm:text-[2.6rem]">
                {featured.title}
              </h3>

              {/* Divider */}
              <div className="mt-5 h-px overflow-hidden bg-primary/8">
                <div className="h-px w-0 bg-secondary/60 transition-all duration-500 ease-out group-hover:w-full" />
              </div>

              {/* Text */}
              <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/70">
                {featured.text}
              </p>

              {/* Inline CTA */}
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary/60 transition-colors duration-200 hover:text-primary"
              >
                {content.cta}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          </Reveal>

          {/* ── Remaining 3 cards — md:grid-cols-3 ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {rest.map((area, i) => {
              const index = i + 1;
              return (
                <Reveal key={area.title} delay={index * 120}>
                  <article className="group relative min-h-50 overflow-hidden rounded-4xl border border-primary/10 bg-white p-8 shadow-[0_24px_60px_rgba(63,23,31,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_28px_80px_rgba(63,23,31,0.10)] sm:p-10">
                    {/* Left accent line */}
                    <div className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 rounded-full bg-linear-to-t from-secondary via-secondary/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100" />

                    {/* Icon + number */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/10 bg-sand/60 text-primary/60 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-sand group-hover:text-primary">
                        {areaIcons[index]}
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/30">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>

                    {/* Title */}
                    <h3 className="mt-7 font-display text-4xl leading-none text-primary transition-colors duration-300 sm:text-[2.6rem]">
                      {area.title}
                    </h3>

                    {/* Divider */}
                    <div className="mt-5 h-px overflow-hidden bg-primary/8">
                      <div className="h-px w-0 bg-secondary/60 transition-all duration-500 ease-out group-hover:w-full" />
                    </div>

                    {/* Text */}
                    <p className="mt-5 text-lg leading-8 text-foreground/70">
                      {area.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
