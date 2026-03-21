type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeadingProps) {
  const alignmentClass =
    align === "center" ? "items-center text-center" : "items-start text-left";

  const eyebrowClass = inverse ? "text-secondary/80" : "text-primary/65";
  const titleClass = inverse ? "text-white" : "text-primary";
  const descriptionClass = inverse ? "text-white/72" : "text-foreground/72";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignmentClass}`}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.32em] ${eyebrowClass}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-4xl leading-none sm:text-5xl lg:text-6xl ${titleClass}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-lg leading-8 ${descriptionClass}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
