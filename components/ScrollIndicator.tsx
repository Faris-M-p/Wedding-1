"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ScrollIndicator() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-white/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
      aria-hidden
    >
      <span className="text-[0.65rem] uppercase tracking-[0.35em]">Scroll</span>
      <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-white/50">
        <motion.span
          className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-soft"
          animate={reduce ? {} : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.div>
  );
}
