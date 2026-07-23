"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { isSongPlaying, subscribeSong, toggleSong } from "@/lib/music";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPlaying(isSongPlaying());
    return subscribeSong(setPlaying);
  }, []);

  const toggle = () => toggleSong();

  if (!mounted) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      aria-label={playing ? "Pause music" : "Play wedding music"}
      aria-pressed={playing}
      className="group fixed bottom-5 right-5 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-primary/80 text-gold-soft backdrop-blur-sm transition-colors hover:bg-primary"
      style={{ boxShadow: "0 6px 20px -8px rgba(20,35,26,0.5)" }}
    >
      {/* subtle hover label */}
      <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-full bg-primary/85 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        {playing ? "Pause" : "Music"}
      </span>

      {/* soft rotating ring while playing */}
      {playing && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-gold/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ borderStyle: "dashed" }}
        />
      )}
      <AnimatePresence mode="wait" initial={false}>
        {playing ? (
          <motion.span
            key="pause"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Pause className="h-4 w-4" strokeWidth={1.75} />
          </motion.span>
        ) : (
          <motion.span
            key="play"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="ml-0.5"
          >
            <Play className="h-4 w-4" strokeWidth={1.75} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
