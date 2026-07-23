import { Cross } from "lucide-react";

type GoldDividerProps = {
  /** Blend from the deep-green section above into the cream section below. */
  from?: "primary" | "background";
  to?: "primary" | "background";
};

const toneVar = {
  primary: "var(--color-primary)",
  background: "var(--color-background)",
} as const;

/**
 * A thin gold divider with a central cross ornament, set over a vertical
 * gradient so it polishes the transition between two adjacent sections.
 */
export function GoldDivider({
  from = "primary",
  to = "background",
}: GoldDividerProps) {
  return (
    <div
      aria-hidden
      className="relative"
      style={{
        background: `linear-gradient(to bottom, ${toneVar[from]} 0%, ${toneVar[to]} 100%)`,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-5 px-6 py-14 sm:py-20">
        <span className="h-px w-24 max-w-[24vw] bg-gradient-to-r from-transparent to-gold/70" />
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-white/80 text-gold shadow-soft backdrop-blur-sm">
          <Cross className="h-4 w-4" strokeWidth={1.4} />
        </span>
        <span className="h-px w-24 max-w-[24vw] bg-gradient-to-l from-transparent to-gold/70" />
      </div>
    </div>
  );
}
