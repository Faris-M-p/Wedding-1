"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cross } from "lucide-react";
import { wedding } from "@/lib/config";
import { ScrollIndicator } from "./ScrollIndicator";

export function Hero() {
  const reduce = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP: slow cinematic zoom + scroll parallax (transform only → GPU).
  useEffect(() => {
    if (reduce) return;
    let ctx: gsap.Context | undefined;
    let killed = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // very slow, endless breathing zoom
        gsap.fromTo(
          bgRef.current,
          { scale: 1.06 },
          {
            scale: 1.16,
            duration: 24,
            ease: "none",
            repeat: -1,
            yoyo: true,
          }
        );

        // parallax drift as the visitor scrolls past the hero
        gsap.to(bgRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, sectionRef);
    })();

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-primary grain"
      aria-label="Wedding hero"
    >
      {/* Church image — the visual identity of the site */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={wedding.site.ogImage}
          alt={`${wedding.church.name} at golden hour`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Subtle editorial overlay for legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(29,45,34,0.30) 0%, rgba(29,45,34,0.22) 24%, rgba(29,45,34,0.40) 50%, rgba(29,45,34,0.30) 78%, rgba(29,45,34,0.48) 100%)",
        }}
      />
      {/* Soft central scrim so the names read over the bright facade */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 58% at 50% 48%, rgba(20,35,26,0.52) 0%, transparent 62%)",
        }}
      />

      {/* Light rays behind the cross */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[12%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,230,184,0.22)_0%,transparent_62%)] blur-2xl" />
      </div>

      <Clouds reduce={!!reduce} />
      <Particles reduce={!!reduce} />
      <Birds reduce={!!reduce} />

      {/* Center content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-black/15 backdrop-blur-[2px]"
          style={{ boxShadow: "0 4px 24px rgba(20,35,26,0.35)" }}
        >
          <Cross
            className="h-8 w-8 text-white"
            strokeWidth={1.4}
            style={{ filter: "drop-shadow(0 1px 6px rgba(20,35,26,0.5))" }}
          />
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-xs font-medium uppercase tracking-[0.5em] text-white"
          style={{ textShadow: "0 2px 14px rgba(20,35,26,0.55)" }}
        >
          Together Before God
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="script mt-4 text-white"
          style={{
            fontSize: "clamp(3.4rem, 12vw, 8rem)",
            textShadow:
              "0 2px 24px rgba(20,35,26,0.45), 0 1px 4px rgba(20,35,26,0.4)",
          }}
        >
          {wedding.couple.together}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 flex flex-col items-center gap-4"
        >
          <span
            className="flex items-center gap-4 text-base uppercase tracking-[0.36em] text-white sm:text-lg"
            style={{ textShadow: "0 2px 14px rgba(20,35,26,0.5)" }}
          >
            <span className="h-px w-8 bg-gold/80" />
            {wedding.date.short}
            <span className="h-px w-8 bg-gold/80" />
          </span>
          <span
            className="font-heading text-xl italic text-white sm:text-2xl"
            style={{ textShadow: "0 2px 14px rgba(20,35,26,0.5)" }}
          >
            {wedding.church.name}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#invitation"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm uppercase tracking-[0.22em] text-primary shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
          >
            View Invitation
          </a>
          <a
            href="#rsvp"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/80 bg-white/5 px-8 text-sm uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-soft"
          >
            RSVP
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

/* ---------------------------- ambient layers --------------------------- */

function Clouds({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { top: "14%", size: 340, dur: 90, delay: 0, o: 0.12 },
        { top: "30%", size: 260, dur: 120, delay: -30, o: 0.09 },
        { top: "8%", size: 200, dur: 150, delay: -70, o: 0.08 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white blur-3xl"
          style={{
            top: c.top,
            width: c.size,
            height: c.size * 0.45,
            opacity: c.o,
            willChange: "transform",
          }}
          initial={{ x: "-30vw" }}
          animate={{ x: "130vw" }}
          transition={{
            duration: c.dur,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function Particles({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  const seeds = Array.from({ length: 18 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((_, i) => {
        const left = (i * 53) % 100;
        const dur = 9 + (i % 6);
        const delay = (i % 9) * -1.3;
        const size = 2 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold-soft"
            style={{
              left: `${left}%`,
              bottom: -10,
              width: size,
              height: size,
              opacity: 0.5,
              willChange: "transform, opacity",
            }}
            animate={{ y: ["0vh", "-105vh"], opacity: [0, 0.7, 0] }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

function Birds({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { top: "22%", dur: 34, delay: 4, scale: 1 },
        { top: "26%", dur: 34, delay: 4.5, scale: 0.8 },
        { top: "19%", dur: 42, delay: 18, scale: 0.7 },
      ].map((b, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 8"
          className="absolute text-white/70"
          style={{ top: b.top, width: 24 * b.scale, willChange: "transform" }}
          initial={{ x: "-10vw" }}
          animate={{ x: "115vw", y: [0, -8, 0] }}
          transition={{
            x: { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <path
            d="M1 6 Q6 1 11 5 Q16 1 23 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}
