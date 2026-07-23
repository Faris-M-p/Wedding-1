/**
 * Shared controller for the wedding song.
 *
 * A single <audio> element is created lazily and shared between the door
 * intro (which starts the song after the doors open) and the floating
 * music button (which pauses / resumes it). Playing state is broadcast to
 * any subscribed component so the button always reflects reality.
 */

const SRC = "/music/wedding-song.mp3";

let audio: HTMLAudioElement | null = null;
let playing = false;
const listeners = new Set<(playing: boolean) => void>();

function emit(next: boolean) {
  playing = next;
  listeners.forEach((fn) => fn(next));
}

function ensure(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.55;
    audio.addEventListener("play", () => emit(true));
    audio.addEventListener("pause", () => emit(false));
    audio.addEventListener("ended", () => emit(false));
  }
  return audio;
}

/** Start the song. Must be triggered by a user gesture (e.g. the "Open" button). */
export function playSong() {
  const a = ensure();
  if (!a) return;
  a.play().catch(() => {
    /* autoplay blocked — user can start it via the music button */
  });
}

export function pauseSong() {
  audio?.pause();
}

export function toggleSong() {
  if (playing) pauseSong();
  else playSong();
}

export function isSongPlaying() {
  return playing;
}

export function subscribeSong(fn: (playing: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
