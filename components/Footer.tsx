import type { Dictionary } from "@/lib/i18n";

type FooterProps = {
  content: Dictionary["footer"];
};

export function Footer({ content }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = content.copyright.replace("{year}", String(year));
  const phoneHref = `tel:${content.phone.replace(/\s+/g, "")}`;

  return (
    <footer className="bg-[#2f0f16] text-white/72">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div>
          <a
            href="#top"
            className="font-display text-4xl leading-none text-white sm:text-5xl"
          >
            {content.brand}
          </a>
          <p className="mt-4 max-w-md text-base leading-7 text-white/58">
            {content.description}
          </p>
        </div>

        <div className="grid gap-4 text-sm sm:grid-cols-3 sm:gap-8">
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-secondary/72">
              {content.cityLabel}
            </p>
            <p className="mt-2 text-white/70">{content.city}</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-secondary/72">
              {content.emailLabel}
            </p>
            <a
              href={`mailto:${content.email}`}
              className="mt-2 block text-white/70 hover:text-secondary"
            >
              {content.email}
            </a>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-secondary/72">
              {content.phoneLabel}
            </p>
            <a
              href={phoneHref}
              className="mt-2 block text-white/70 hover:text-secondary"
            >
              {content.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-5 text-sm text-white/45 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p>{copyright}</p>
          <p>{content.note}</p>
        </div>
      </div>
    </footer>
  );
}
