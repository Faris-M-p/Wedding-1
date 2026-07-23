import { Reveal } from "@/components/ui/Reveal";
import { Cross } from "lucide-react";
import { wedding } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary py-20 text-center text-white grain">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6">
        <Reveal className="flex flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40">
            <Cross className="h-6 w-6 text-gold" strokeWidth={1.25} />
          </span>
          <p className="script mt-8 text-6xl text-white sm:text-7xl">
            {wedding.couple.together}
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.4em] text-gold-soft">
            Thank You
          </p>
          <p className="mt-4 font-heading text-2xl italic text-white/90">
            May God Bless You
          </p>
          <span className="mt-8 h-px w-16 bg-gold/50" />
          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-white/50">
            {wedding.date.display} · {wedding.church.name}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
