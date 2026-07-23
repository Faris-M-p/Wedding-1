"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { wedding } from "@/lib/config";

export function Gallery() {
  const reduce = useReducedMotion();
  return (
    <Section id="gallery" tone="base" size="lg">
      <SectionHeading
        kicker="Moments & Symbols"
        title="A Sacred Gallery"
        subtitle="Not portraits, but the quiet emblems of a covenant — light, faith and flowers."
      />

      <div className="mt-16 columns-2 gap-4 md:columns-3 md:gap-6 [&>*]:mb-4 md:[&>*]:mb-6">
        {wedding.gallery.map((item, i) => (
          <motion.figure
            key={item.src}
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: (i % 3) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative block break-inside-avoid overflow-hidden rounded-2xl shadow-soft"
          >
            <div
              className={`relative w-full ${
                item.span === "tall" ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10"
              />
            </div>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-primary/70 to-transparent p-4 text-xs uppercase tracking-[0.15em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {item.alt}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
