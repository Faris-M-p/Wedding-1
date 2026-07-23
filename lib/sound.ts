/**
 * Lightweight, dependency-free sound helpers built on the Web Audio API.
 * No audio assets required — the church-bell chime is synthesised, so the
 * bundle stays tiny and there is nothing extra to lazy-load.
 *
 * All calls are guarded so they no-op during SSR or when the browser
 * blocks audio until a user gesture.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** A soft, decaying bell strike at a given frequency. */
function strike(freq: number, at: number, gain = 0.14, dur = 3) {
  const audio = getCtx();
  if (!audio) return;

  const osc = audio.createOscillator();
  const partial = audio.createOscillator();
  const g = audio.createGain();

  osc.type = "sine";
  partial.type = "sine";
  osc.frequency.value = freq;
  partial.frequency.value = freq * 2.76; // inharmonic partial → bell timbre

  g.gain.setValueAtTime(0.0001, audio.currentTime + at);
  g.gain.exponentialRampToValueAtTime(gain, audio.currentTime + at + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + at + dur);

  osc.connect(g);
  partial.connect(g);
  g.connect(audio.destination);

  osc.start(audio.currentTime + at);
  partial.start(audio.currentTime + at);
  osc.stop(audio.currentTime + at + dur);
  partial.stop(audio.currentTime + at + dur);
}

/** Two gentle church-bell tolls. */
export function playBells() {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  strike(523.25, 0, 0.12); // C5
  strike(392.0, 0.55, 0.1); // G4
}

/* ------------------------------------------------------------------ */
/*  Ambient hymn — a slow, peaceful chord progression                  */
/*  synthesised on the fly (no audio asset to download).               */
/* ------------------------------------------------------------------ */

// I – V – vi – IV in the key of C, one bar each (frequencies in Hz).
const PROGRESSION: number[][] = [
  [261.63, 329.63, 392.0], // C  major
  [246.94, 311.13, 392.0], // G/B
  [220.0, 261.63, 329.63], // A  minor
  [174.61, 261.63, 349.23], // F  major
];

export class AmbientHymn {
  private audio: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private bar = 0;
  playing = false;

  start() {
    const audio = getCtx();
    if (!audio) return;
    this.audio = audio;
    if (!this.master) {
      this.master = audio.createGain();
      this.master.gain.value = 0.0001;
      this.master.connect(audio.destination);
    }
    // gentle fade-in
    this.master.gain.cancelScheduledValues(audio.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, audio.currentTime);
    this.master.gain.linearRampToValueAtTime(0.18, audio.currentTime + 2);

    this.playing = true;
    this.playBar();
    this.timer = window.setInterval(() => this.playBar(), 4000);
  }

  private playBar() {
    if (!this.audio || !this.master) return;
    const chord = PROGRESSION[this.bar % PROGRESSION.length];
    this.bar += 1;
    const now = this.audio.currentTime;

    chord.forEach((freq, i) => {
      const osc = this.audio!.createOscillator();
      const g = this.audio!.createGain();
      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.value = freq;

      const start = now + i * 0.06;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.12, start + 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 3.8);

      osc.connect(g);
      g.connect(this.master!);
      osc.start(start);
      osc.stop(start + 3.9);
    });
  }

  stop() {
    this.playing = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.audio && this.master) {
      const now = this.audio.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0.0001, now + 1.2);
    }
  }
}
