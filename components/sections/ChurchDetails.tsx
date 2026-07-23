import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Navigation, Landmark } from "lucide-react";
import { wedding } from "@/lib/config";

export function ChurchDetails() {
  const { church } = wedding;
  return (
    <Section id="church" tone="white" size="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <span className="kicker">The House of God</span>
          <h2 className="mt-4 text-3xl text-primary sm:text-4xl md:text-5xl">
            {church.name}
          </h2>
          <p className="mt-3 font-heading text-lg italic text-gold">
            {church.tagline}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {church.description}
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {church.architecture.map((item) => (
              <div key={item.label} className="bg-white p-5 text-center sm:text-left">
                <dt className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-gold sm:justify-start">
                  <Landmark className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {item.label}
                </dt>
                <dd className="mt-2 font-heading text-lg text-primary">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
            {church.address}
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <a
              href={church.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} />
              Google Maps
            </a>
            <a
              href={church.navigateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-7 py-3 text-sm uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <Navigation className="h-4 w-4" strokeWidth={1.5} />
              Navigate
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/gallery-church-arch.png"
              alt={`${church.name} architecture`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"
            />
            <figcaption className="absolute bottom-5 left-5 right-5 text-white">
              <span className="font-heading text-xl italic">{church.name}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
