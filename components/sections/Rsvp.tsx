"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, Heart } from "lucide-react";
import { wedding } from "@/lib/config";

type Attendance = "joyfully" | "regretfully";

export function Rsvp() {
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState<Attendance>("joyfully");
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    // No backend wired up — persist locally & confirm gracefully.
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const prev = JSON.parse(localStorage.getItem("rsvps") ?? "[]");
      localStorage.setItem(
        "rsvps",
        JSON.stringify([...prev, { ...data, at: Date.now() }])
      );
    } catch {
      /* ignore storage failures */
    }
    await new Promise((r) => setTimeout(r, 700));
    setPending(false);
    setSubmitted(true);
  };

  return (
    <Section id="rsvp" tone="primary" size="lg" className="grain">
      <div className="flex flex-col items-center text-center text-white">
        <span className="kicker text-gold-soft">Kindly Respond</span>
        <h2 className="mt-4 text-3xl text-white sm:text-4xl md:text-5xl">
          Will you join us?
        </h2>
        <p className="mt-4 max-w-md text-sm text-white/70">
          Your presence would be a blessing. Please respond by{" "}
          {wedding.contact.rsvpBy}.
        </p>
      </div>

      <div className="mx-auto mt-12 w-full max-w-xl">
        <div className="relative overflow-hidden rounded-3xl bg-background p-8 text-ink shadow-lift sm:p-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 14 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white"
                >
                  <Check className="h-8 w-8" strokeWidth={1.5} />
                </motion.span>
                <h3 className="mt-6 font-heading text-3xl text-primary">
                  Thank you
                </h3>
                <p className="mt-3 max-w-xs text-sm text-muted">
                  {attendance === "joyfully"
                    ? "We rejoice that you will celebrate this covenant with us."
                    : "You will be dearly missed — thank you for letting us know."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs uppercase tracking-[0.25em] text-gold underline-offset-4 hover:underline"
                >
                  Send another response
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5 text-left"
              >
                <Field label="Full Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="input"
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Number of Guests" htmlFor="guests">
                    <input
                      id="guests"
                      name="guests"
                      type="number"
                      min={1}
                      max={10}
                      defaultValue={1}
                      className="input"
                    />
                  </Field>
                  <Field label="Phone" htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={wedding.contact.rsvpPhone}
                      className="input"
                    />
                  </Field>
                </div>

                <fieldset className="flex flex-col gap-3">
                  <legend className="mb-1 text-xs uppercase tracking-[0.25em] text-muted">
                    Will you attend?
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        { id: "joyfully", label: "Joyfully accept" },
                        { id: "regretfully", label: "Regretfully decline" },
                      ] as { id: Attendance; label: string }[]
                    ).map((opt) => (
                      <label
                        key={opt.id}
                        className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm transition-colors ${
                          attendance === opt.id
                            ? "border-gold bg-gold/10 text-primary"
                            : "border-line text-muted hover:border-gold/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={opt.id}
                          checked={attendance === opt.id}
                          onChange={() => setAttendance(opt.id)}
                          className="sr-only"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={pending}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {pending ? "Sending…" : "Send RSVP"}
                  {!pending && <Heart className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.25em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
