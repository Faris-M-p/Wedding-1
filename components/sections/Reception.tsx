import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Wine, MapPin, Clock, CalendarDays, ArrowUpRight } from "lucide-react";
import { wedding } from "@/lib/config";

export function Reception() {
  const { reception } = wedding;
  return (
    <Section id="reception" tone="base" size="lg">
      <Reveal className="mx-auto max-w-3xl">
        <article className="relative overflow-hidden rounded-3xl border border-line bg-white p-10 text-center shadow-soft sm:p-14">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
            <Wine className="h-6 w-6" strokeWidth={1.3} />
          </span>
          <span className="kicker mt-6 block">The Celebration</span>
          <h2 className="mt-3 text-3xl text-primary sm:text-4xl">
            {reception.name}
          </h2>
          <p className="mt-2 font-heading text-lg italic text-gold">
            {reception.tagline}
          </p>

          <div className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-4 text-sm text-muted sm:flex-row sm:justify-center sm:gap-8">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {reception.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {reception.time}
            </span>
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {reception.address}
          </p>

          <a
            href={reception.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            View Venue
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </article>
      </Reveal>
    </Section>
  );
}
