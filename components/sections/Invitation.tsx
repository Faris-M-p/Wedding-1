import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Cross } from "lucide-react";
import { wedding } from "@/lib/config";

export function Invitation() {
  const { couple, invitation, parents, date, church } = wedding;
  return (
    <Section id="invitation" tone="white" size="lg">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <Cross className="h-6 w-6 text-gold" strokeWidth={1.25} />
          <span className="kicker mt-6">The Invitation</span>
          <p className="mt-6 font-heading text-2xl leading-relaxed text-primary sm:text-3xl">
            {invitation.lead}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {invitation.body}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 flex w-full flex-col items-center">
          <div className="grid w-full max-w-2xl grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
            <div className="text-center sm:text-right">
              <p className="script text-5xl text-primary sm:text-6xl">
                {couple.bride}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted">
                {parents.bride.names}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 px-2" aria-hidden>
              <span className="rule h-10" />
              <span className="font-heading text-xl italic text-gold">&amp;</span>
              <span className="rule h-10" />
            </div>

            <div className="text-center sm:text-left">
              <p className="script text-5xl text-primary sm:text-6xl">
                {couple.groom}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted">
                {parents.groom.names}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="flex flex-col items-center gap-2 text-primary">
            <span className="flex items-center gap-4 text-sm uppercase tracking-[0.3em]">
              <span className="h-px w-8 bg-gold/60" />
              {date.dayName}
              <span className="h-px w-8 bg-gold/60" />
            </span>
            <span className="font-heading text-3xl sm:text-4xl">
              {date.display}
            </span>
            <span className="mt-1 text-sm italic text-muted">
              at {church.name}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
