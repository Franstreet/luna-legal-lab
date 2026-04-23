type SectionFadeProps = {
  /** Direction of the gradient fade */
  from: "dark" | "light";
};

/**
 * Smooth gradient bridge between a dark section (bg-primary) and a light one.
 * -mt-20 overlaps the preceding section's bottom padding so the cut is seamless.
 */
export function SectionFade({ from }: SectionFadeProps) {
  const gradient =
    from === "dark"
      ? "from-primary to-[#fbf6f0]"
      : "from-[#fbf6f0] to-primary";

  return (
    <div
      aria-hidden="true"
      className={`relative -mt-6 h-20 bg-linear-to-b ${gradient} pointer-events-none z-10`}
    />
  );
}
