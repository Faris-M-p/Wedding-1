"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { wedding } from "@/lib/config";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

const target = new Date(wedding.date.iso).getTime();

function getRemaining(): Remaining {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

export function Countdown() {
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    setTime(getRemaining());
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = useMemo(
    () => [
      { label: "Days", value: time?.days ?? 0, max: 365 },
      { label: "Hours", value: time?.hours ?? 0, max: 24 },
      { label: "Minutes", value: time?.minutes ?? 0, max: 60 },
      { label: "Seconds", value: time?.seconds ?? 0, max: 60 },
    ],
    [time]
  );

  return (
    <section id="countdown" className="relative overflow-hidden bg-background">
      {/* Floating countdown */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center sm:pt-32">
        <Reveal className="flex flex-col items-center">
          <span className="kicker">Counting the Days</span>
          <h2 className="mt-4 text-3xl text-primary sm:text-4xl md:text-5xl">
            Until We Say &ldquo;I Do&rdquo;
          </h2>
          <span className="mt-6 flex items-center gap-3" aria-hidden>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
            <span className="text-lg leading-none text-gold">&#10022;</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
          </span>
        </Reveal>

        {time?.done ? (
          <p className="mt-16 font-heading text-2xl italic text-gold">
            Today we celebrate before God.
          </p>
        ) : (
          <Reveal className="mt-16 flex flex-wrap items-start justify-center gap-x-10 gap-y-12 sm:gap-x-16 lg:gap-x-20">
            {units.map((u) => (
              <Ring key={u.label} {...u} ready={!!time} />
            ))}
          </Reveal>
        )}
      </div>

      {/* Large, soft church watercolor the countdown floats above.
          Masked top & bottom so it melts into the page — no visible frame. */}
      <div
        aria-hidden
        className="pointer-events-none relative z-0 -mt-10 sm:-mt-16"
      >
        <Image
          src="/images/church-illustration.png"
          alt=""
          width={1400}
          height={787}
          sizes="100vw"
          className="mx-auto h-auto w-full max-w-6xl select-none opacity-[0.16]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 24%, #000 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 24%, #000 86%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}

function Ring({
  label,
  value,
  max,
  ready,
}: {
  label: string;
  value: number;
  max: number;
  ready: boolean;
}) {
  const size = 138;
  const stroke = 2.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = c * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          style={{ filter: "drop-shadow(0 10px 24px rgba(46,77,58,0.10))" }}
        >
          {/* soft white disc so numbers stay legible over the artwork */}
          <circle cx={size / 2} cy={size / 2} r={r} fill="rgba(255,255,255,0.72)" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(201,162,39,0.18)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={ready ? offset : c}
            style={{ transition: "stroke-dashoffset 0.9s var(--ease-elegant)" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-4xl tabular-nums text-primary sm:text-5xl">
            {ready ? String(value).padStart(2, "0") : "--"}
          </span>
        </div>
      </div>
      <span className="text-xs uppercase tracking-[0.3em] text-gold">{label}</span>
    </div>
  );
}
