import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { wedding } from "@/lib/config";

export function Parents() {
  const { parents } = wedding;
  const columns = [parents.bride, parents.groom];

  return (
    <Section id="parents" tone="white" size="lg">
      <SectionHeading
        kicker="With the Blessing of"
        title="Our Beloved Families"
        subtitle="Two families, joined in gratitude and prayer."
      />

      <div className="mx-auto mt-16 grid max-w-4xl gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
        {columns.map((p, i) => (
          <Reveal
            key={p.side}
            delay={i * 0.1}
            className="flex flex-col items-center bg-white px-8 py-14 text-center"
          >
            <span className="kicker">{p.side}</span>
            <span className="mt-6 h-px w-10 bg-gold/60" />
            <p className="mt-6 font-heading text-2xl leading-relaxed text-primary sm:text-3xl">
              {p.names}
            </p>
            <p className="mt-4 max-w-xs text-sm italic leading-relaxed text-muted">
              {p.line}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
