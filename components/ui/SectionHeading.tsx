import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col ${alignment} gap-4`}>
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <h2 className="text-3xl leading-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {align === "center" ? (
        <span className="mt-1 flex items-center gap-3" aria-hidden>
          <span className="h-px w-8 bg-gold/60" />
          <span className="gold-dot" />
          <span className="h-px w-8 bg-gold/60" />
        </span>
      ) : null}
      {subtitle ? (
        <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
