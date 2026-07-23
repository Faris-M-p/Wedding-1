"use client";

import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
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
    <Section id="countdown" tone="primary" size="lg" className="grain">
      <div className="flex flex-col items-center text-center text-white">
        <span className="kicker text-gold-soft">Counting the days</span>
        <h2 className="mt-4 text-3xl text-white sm:text-4xl md:text-5xl">
          Until we say &ldquo;I do&rdquo;
        </h2>
        <span className="mt-4 flex items-center gap-3" aria-hidden>
          <span className="h-px w-8 bg-gold/60" />
          <span className="gold-dot" />
          <span className="h-px w-8 bg-gold/60" />
        </span>

        {time?.done ? (
          <p className="mt-14 font-heading text-2xl italic text-gold-soft">
            Today we celebrate before God.
          </p>
        ) : (
          <Reveal className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
            {units.map((u) => (
              <Ring key={u.label} {...u} ready={!!time} />
            ))}
          </Reveal>
        )}
      </div>
    </Section>
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
  const size = 132;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = c * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
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
          <span className="font-heading text-4xl tabular-nums text-white">
            {ready ? String(value).padStart(2, "0") : "--"}
          </span>
        </div>
      </div>
      <span className="text-xs uppercase tracking-[0.3em] text-gold-soft/90">
        {label}
      </span>
    </div>
  );
}
