"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Heart, Check, AlertCircle, Mail } from "lucide-react";
import { wedding } from "@/lib/config";
import {
  submitBlessing,
  fetchApprovedBlessings,
  type GuestBlessing,
} from "@/lib/blessings";

type Status = "idle" | "submitting" | "success" | "error";

export function Blessings() {
  const [guests, setGuests] = useState<GuestBlessing[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [custom, setCustom] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; wish?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [approvedNow, setApprovedNow] = useState(true);

  const submitting = status === "submitting";

  useEffect(() => {
    let alive = true;
    fetchApprovedBlessings().then((list) => {
      if (alive) setGuests(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  const pickPredefined = (wish: string) => {
    setSelected(wish);
    setCustom("");
    setErrors((e) => ({ ...e, wish: undefined }));
  };

  const onCustomChange = (value: string) => {
    setCustom(value);
    if (value.trim()) setSelected(null);
    setErrors((e) => ({ ...e, wish: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const trimmedName = name.trim();
    const customWish = custom.trim();
    const wish = customWish !== "" ? customWish : selected;
    const isCustom = customWish !== "";

    const nextErrors: { name?: string; wish?: string } = {};
    if (!trimmedName) nextErrors.name = "Please enter your name.";
    if (!wish) nextErrors.wish = "Choose a blessing or write your own.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setFormError(null);

    try {
      const { approved } = await submitBlessing({
        name: trimmedName,
        phone,
        wish: wish as string,
        isCustom,
      });
      setApprovedNow(approved);
      if (approved) {
        setGuests((prev) => [{ name: trimmedName, wish: wish as string }, ...prev]);
      }
      setStatus("success");
      setSelected(null);
      setCustom("");
    } catch {
      setFormError("Unable to send your blessing. Please try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setName("");
    setPhone("");
    setSelected(null);
    setCustom("");
    setErrors({});
    setFormError(null);
  };

  return (
    <Section id="blessings" tone="base" size="lg">
      <SectionHeading
        kicker="A Book of Blessings"
        title="Leave Your Wishes"
        subtitle="Words of prayer and joy for the beginning of our covenant."
      />

      {/* -------------------- Leave a Blessing form -------------------- */}
      <div className="mx-auto mt-12 w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-9">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center py-8 text-center"
                role="status"
                aria-live="polite"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 14 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white"
                >
                  <Check className="h-7 w-7" strokeWidth={1.5} />
                </motion.span>
                <h3 className="mt-5 font-heading text-2xl text-primary">
                  Thank you for your blessing.
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  {approvedNow
                    ? "Your blessing has been shared with the couple."
                    : "Your blessing has been received and will appear once approved by the couple."}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 text-xs uppercase tracking-[0.25em] text-gold underline-offset-4 hover:underline"
                >
                  Leave another blessing
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
                noValidate
              >
                <h3 className="flex items-center gap-2 font-heading text-2xl text-primary">
                  <Mail className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  Leave a Blessing
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-muted">
                      Your Name
                    </span>
                    <input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((x) => ({ ...x, name: undefined }));
                      }}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      className="input"
                    />
                    {errors.name ? (
                      <span className="text-xs text-red-600">{errors.name}</span>
                    ) : null}
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-muted">
                      Phone <span className="normal-case">(optional)</span>
                    </span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone number"
                      className="input"
                    />
                  </label>
                </div>

                <fieldset className="flex flex-col gap-3">
                  <legend className="mb-1 text-xs uppercase tracking-[0.25em] text-muted">
                    Choose a blessing
                  </legend>
                  <div className="flex flex-col gap-2.5">
                    {wedding.blessings.predefined.map((wish) => {
                      const active = selected === wish;
                      return (
                        <label
                          key={wish}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                            active
                              ? "border-gold bg-gold/10 text-primary"
                              : "border-line text-ink hover:border-gold/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="blessing"
                            value={wish}
                            checked={active}
                            onChange={() => pickPredefined(wish)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                              active ? "border-gold bg-gold" : "border-muted/50"
                            }`}
                          >
                            {active ? (
                              <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                            ) : null}
                          </span>
                          <span className="leading-relaxed">{wish}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex items-center gap-4" aria-hidden>
                  <span className="h-px flex-1 bg-line" />
                  <span className="text-xs uppercase tracking-[0.25em] text-muted">
                    Or write your own
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>

                <label className="flex flex-col gap-2">
                  <textarea
                    value={custom}
                    onChange={(e) => onCustomChange(e.target.value)}
                    rows={3}
                    maxLength={300}
                    placeholder="Write your personal blessing…"
                    aria-invalid={!!errors.wish}
                    className="input resize-none"
                  />
                  {errors.wish ? (
                    <span className="text-xs text-red-600">{errors.wish}</span>
                  ) : (
                    <span className="text-right text-[0.7rem] text-muted/70">
                      {custom.length}/300
                    </span>
                  )}
                </label>

                {formError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    {formError}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-primary px-9 py-3.5 text-sm uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send Blessing"}
                  {!submitting && <Heart className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* -------------------- Blessings From Family -------------------- */}
      <div className="mt-20">
        <GroupLabel label="Blessings From Family" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wedding.blessings.family.map((b) => (
            <BlessingCard key={b.name} name={b.name} wish={b.message} />
          ))}
        </div>
      </div>

      {/* -------------------- Blessings From Guests -------------------- */}
      {guests.length > 0 && (
        <div className="mt-16">
          <GroupLabel label="Blessings From Guests" />
          <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            <AnimatePresence initial={false}>
              {guests.map((b, i) => (
                <motion.div
                  key={`${b.name}-${i}-${b.wish.slice(0, 12)}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="break-inside-avoid"
                >
                  <BlessingCard name={b.name} wish={b.wish} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Section>
  );
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="flex items-center gap-3" aria-hidden>
        <span className="h-px w-8 bg-gold/60" />
        <Heart className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span className="h-px w-8 bg-gold/60" />
      </span>
      <h3 className="font-heading text-2xl text-primary sm:text-3xl">{label}</h3>
    </div>
  );
}

function BlessingCard({ name, wish }: { name: string; wish: string }) {
  return (
    <blockquote className="h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <p className="text-sm leading-relaxed text-ink">{wish}</p>
      <footer className="mt-4 flex items-center gap-2 font-heading text-lg italic text-primary">
        <Heart className="h-4 w-4 text-gold" strokeWidth={1.5} />
        {name}
      </footer>
    </blockquote>
  );
}
