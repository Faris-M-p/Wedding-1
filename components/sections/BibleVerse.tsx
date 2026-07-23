import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { wedding } from "@/lib/config";

export function BibleVerse() {
  return (
    <Section tone="base" size="lg">
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span
          aria-hidden
          className="font-heading text-[7rem] leading-none text-gold/25 sm:text-[9rem]"
        >
          &ldquo;
        </span>
        <blockquote className="verse -mt-10 text-3xl leading-snug text-primary text-balance sm:text-4xl md:text-[2.75rem]">
          {wedding.verse.text}
        </blockquote>
        <cite className="mt-8 not-italic">
          <span className="block h-px w-16 bg-gold/60 mx-auto mb-4" />
          <span className="text-xs uppercase tracking-[0.4em] text-muted">
            {wedding.verse.ref}
          </span>
        </cite>
      </Reveal>
    </Section>
  );
}
