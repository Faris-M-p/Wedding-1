import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** background tone */
  tone?: "base" | "white" | "primary";
  /** vertical padding scale */
  size?: "md" | "lg";
};

const toneMap = {
  base: "bg-background text-ink",
  white: "bg-white text-ink",
  primary: "bg-primary text-white",
} as const;

export function Section({
  id,
  children,
  className = "",
  tone = "base",
  size = "lg",
}: SectionProps) {
  const pad = size === "lg" ? "py-24 sm:py-32" : "py-16 sm:py-24";
  return (
    <section
      id={id}
      className={`relative w-full scroll-mt-24 ${toneMap[tone]} ${pad} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">{children}</div>
    </section>
  );
}
