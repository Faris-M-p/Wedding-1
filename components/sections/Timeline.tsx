"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Gem, Church, Wine, MapPin, Clock, CalendarDays } from "lucide-react";
import { wedding, type TimelineEvent } from "@/lib/config";

const iconMap = {
  ring: Gem,
  church: Church,
  reception: Wine,
} as const;

export function Timeline() {
  return (
    <Section id="timeline" tone="base" size="lg">
      <SectionHeading
        kicker="The Order of the Day"
        title="A Sacred Timeline"
        subtitle="Three moments that mark the making of a covenant."
      />

      <div className="relative mx-auto mt-16 max-w-3xl">
        {/* central spine */}
        <span
          aria-hidden
          className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        <ul className="flex flex-col gap-12">
          {wedding.timeline.map((event, i) => (
            <TimelineNode key={event.key} event={event} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function TimelineNode({ event, index }: { event: TimelineEvent; index: number }) {
  const Icon = iconMap[event.icon];
  const isRight = index % 2 === 1;

  return (
    <Reveal
      as="li"
      delay={index * 0.05}
      className={`relative flex flex-col gap-4 pl-16 sm:w-1/2 sm:pl-0 ${
        isRight
          ? "sm:ml-auto sm:pl-12 sm:text-left"
          : "sm:mr-auto sm:pr-12 sm:text-right"
      }`}
    >
      {/* node marker */}
      <span
        className={`absolute left-6 top-1 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-gold/50 bg-background text-primary shadow-soft sm:left-auto sm:top-0 ${
          isRight ? "sm:-left-[1.375rem]" : "sm:-right-[1.375rem] sm:translate-x-1/2"
        }`}
      >
        <Icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
      </span>

      <article
        className={`group rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${
          isRight ? "sm:text-left" : "sm:text-left"
        }`}
      >
        <h3 className="font-heading text-2xl text-primary">{event.title}</h3>
        <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {event.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {event.location}
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {event.description}
        </p>
        <span className="mt-4 block h-px w-0 bg-gold/70 transition-all duration-500 group-hover:w-full" />
      </article>
    </Reveal>
  );
}
