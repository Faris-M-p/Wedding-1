"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Quote } from "lucide-react";

type Blessing = { name: string; message: string; at: number };

const seed: Blessing[] = [
  {
    name: "Fr. Sebastian",
    message:
      "May the Lord bless you and keep you; may His face shine upon your covenant all the days of your life.",
    at: 0,
  },
  {
    name: "Grandma Rose",
    message:
      "Two souls, one faith, one home. My heart overflows with joy for you both.",
    at: 1,
  },
  {
    name: "The Cherian Family",
    message:
      "Wishing you a marriage rooted in prayer and crowned with grace. Congratulations!",
    at: 2,
  },
];

export function Blessings() {
  const [items, setItems] = useState<Blessing[]>(seed);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("blessings") ?? "[]");
      if (Array.isArray(stored) && stored.length) {
        setItems([...seed, ...stored]);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !message) return;

    const entry: Blessing = { name, message, at: Date.now() };
    setItems((prev) => [...prev, entry]);
    try {
      const stored = JSON.parse(localStorage.getItem("blessings") ?? "[]");
      localStorage.setItem("blessings", JSON.stringify([...stored, entry]));
    } catch {
      /* ignore */
    }
    form.reset();
  };

  return (
    <Section id="blessings" tone="base" size="lg">
      <SectionHeading
        kicker="A Book of Blessings"
        title="Leave Your Wishes"
        subtitle="Words of prayer and joy for the beginning of our covenant."
      />

      <form
        onSubmit={onSubmit}
        className="mx-auto mt-12 flex w-full max-w-2xl flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
          <input name="name" required placeholder="Your name" className="input" />
          <input
            name="message"
            required
            placeholder="Write a blessing…"
            className="input"
          />
        </div>
        <button
          type="submit"
          className="self-center rounded-full bg-primary px-8 py-3 text-sm uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5 sm:self-end"
        >
          Add Blessing
        </button>
      </form>

      <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        <AnimatePresence initial={false}>
          {[...items].reverse().map((b) => (
            <motion.blockquote
              key={`${b.name}-${b.at}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid rounded-2xl border border-line bg-white p-6 shadow-soft"
            >
              <Quote className="h-5 w-5 text-gold/70" strokeWidth={1.5} />
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {b.message}
              </p>
              <footer className="mt-4 font-heading text-lg italic text-primary">
                — {b.name}
              </footer>
            </motion.blockquote>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}
