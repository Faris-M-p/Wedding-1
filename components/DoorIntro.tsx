"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cross } from "lucide-react";
import { wedding } from "@/lib/config";
import { playBells } from "@/lib/sound";

type Phase = "closed" | "opening";

export function DoorIntro() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  // Lock scroll while the doors are closed.
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const open = useCallback(() => {
    if (phase !== "closed") return;
    setPhase("opening");
    playBells();
  }, [phase]);

  // Allow Escape / Enter to open for keyboard users.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === "Escape") && phase === "closed") {
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, phase]);

  const doorTransition = {
    duration: reduce ? 0.4 : 1.7,
    ease: [0.76, 0, 0.24, 1] as const,
  };

  const doorCommon =
    "absolute top-0 h-full w-1/2 bg-primary text-gold-soft overflow-hidden";

  return (
    <AnimatePresence onExitComplete={() => setVisible(false)}>
      {visible ? (
        <motion.div
          key="door-intro"
          className="fixed inset-0 z-[80] grain"
          style={{ perspective: 1600 }}
          initial={{ opacity: 1 }}
          animate={phase === "opening" ? { opacity: 1 } : { opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          {/* Golden light revealed behind the doors */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, #f6e6b8 0%, #e2c979 22%, #c9a227 45%, #2e4d3a 100%)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              phase === "opening"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Left door */}
          <motion.div
            className={`${doorCommon} left-0 border-r border-gold/20`}
            style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: phase === "opening" ? -105 : 0 }}
            transition={doorTransition}
            onAnimationComplete={() => {
              if (phase === "opening") {
                // brief hold on the golden light, then fade the overlay away
                setTimeout(() => setVisible(false), reduce ? 100 : 450);
              }
            }}
          >
            <DoorFace side="left" />
          </motion.div>

          {/* Right door */}
          <motion.div
            className={`${doorCommon} right-0 border-l border-gold/20`}
            style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: phase === "opening" ? 105 : 0 }}
            transition={doorTransition}
          >
            <DoorFace side="right" />
          </motion.div>

          {/* Center content — fades as the doors part */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            animate={{
              opacity: phase === "opening" ? 0 : 1,
              scale: phase === "opening" ? 1.08 : 1,
            }}
            transition={{ duration: phase === "opening" ? 0.6 : 0.4, ease: "easeInOut" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40"
            >
              <Cross className="h-7 w-7 text-gold" strokeWidth={1.25} />
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 1 }}
              className="verse max-w-md text-2xl leading-snug text-[#f3ead2] sm:text-3xl"
            >
              &ldquo;{wedding.verse.text}&rdquo;
            </motion.p>

            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 1 }}
              className="mt-5 text-xs uppercase tracking-[0.4em] text-gold-soft/80"
            >
              {wedding.verse.ref}
            </motion.span>

            <motion.button
              type="button"
              onClick={open}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="pointer-events-auto mt-12 rounded-full border border-gold bg-gold/10 px-9 py-3.5 text-sm font-normal uppercase tracking-[0.28em] text-gold-soft backdrop-blur-sm transition-colors hover:bg-gold hover:text-primary"
            >
              Open Invitation
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Decorative carved-panel face for each door leaf. */
function DoorFace({ side }: { side: "left" | "right" }) {
  const align = side === "left" ? "items-end pr-6" : "items-start pl-6";
  return (
    <div className="relative h-full w-full">
      {/* wood-tone vertical shading */}
      <div
        className="absolute inset-0"
        style={{
          background:
            side === "left"
              ? "linear-gradient(90deg, #24402f 0%, #2e4d3a 70%, #38583f 100%)"
              : "linear-gradient(90deg, #38583f 0%, #2e4d3a 30%, #24402f 100%)",
        }}
      />
      {/* recessed gothic-arch panels */}
      <div className={`relative flex h-full w-full flex-col justify-center gap-6 ${align}`}>
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-[32%] w-[62%] rounded-t-[999px] border border-gold/15"
            style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.25)" }}
          />
        ))}
      </div>
      {/* central seam handle */}
      <div
        className={`absolute top-1/2 ${side === "left" ? "right-2" : "left-2"} h-24 w-[3px] -translate-y-1/2 rounded-full bg-gold/40`}
      />
    </div>
  );
}
