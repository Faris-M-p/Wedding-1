"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { AmbientHymn } from "@/lib/sound";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hymnRef = useRef<AmbientHymn | null>(null);

  useEffect(() => {
    setMounted(true);
    hymnRef.current = new AmbientHymn();
    return () => hymnRef.current?.stop();
  }, []);

  const toggle = () => {
    const hymn = hymnRef.current;
    if (!hymn) return;
    if (playing) {
      hymn.stop();
      setPlaying(false);
    } else {
      hymn.start();
      setPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      whileTap={{ scale: 0.92 }}
      aria-label={playing ? "Pause music" : "Play church piano music"}
      aria-pressed={playing}
      className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-primary/90 text-gold-soft shadow-lift backdrop-blur-sm transition-colors hover:bg-primary"
    >
      {/* soft rotating ring while playing */}
      {playing && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-gold/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
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
            <Pause className="h-4 w-4" strokeWidth={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="play"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Music className="h-4 w-4" strokeWidth={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
