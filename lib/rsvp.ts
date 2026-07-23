import { wedding } from "@/lib/config";

export type Attendance = "accept" | "decline";

export type RsvpPayload = {
  name: string;
  phone: string;
  guestCount: number;
  attendance: Attendance;
};

export type RsvpErrors = Partial<Record<keyof RsvpPayload, string>>;

/** Count the digits in a phone string (ignoring +, spaces, dashes). */
function digitCount(phone: string): number {
  return (phone.match(/\d/g) ?? []).length;
}

/**
 * Client-side validation. Mirrors the checks performed by the
 * Apps Script so invalid data is never submitted.
 */
export function validateRsvp(input: {
  name: string;
  phone: string;
  guestCount: number;
  attendance: string;
}): RsvpErrors {
  const errors: RsvpErrors = {};

  if (!input.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const phone = input.phone.trim();
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (
    !/^[+\d][\d\s-]*$/.test(phone) ||
    digitCount(phone) < 7 ||
    digitCount(phone) > 15
  ) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!Number.isFinite(input.guestCount) || input.guestCount < 1) {
    errors.guestCount = "At least one guest is required.";
  }

  if (input.attendance !== "accept" && input.attendance !== "decline") {
    errors.attendance = "Please select your attendance.";
  }

  return errors;
}

function detectDevice(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof navigator === "undefined") return "Desktop";
  const ua = navigator.userAgent;
  if (/iPad|Tablet|(Android(?!.*Mobile))/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) return "Mobile";
  return "Desktop";
}

/**
 * Submits the RSVP to the Google Apps Script Web App.
 *
 * Uses a "text/plain" content-type so the browser issues a *simple*
 * request (no CORS pre-flight, which Apps Script cannot answer).
 * The Apps Script reads the raw body via `e.postData.contents`.
 *
 * Falls back to localStorage when no endpoint is configured.
 */
export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  const body = {
    type: "rsvp" as const,
    ...payload,
    device: detectDevice(),
    submittedAt: new Date().toISOString(),
  };

  const endpoint = wedding.rsvp.endpoint;

  if (!endpoint) {
    // Graceful offline fallback — keep a local copy.
    try {
      const prev = JSON.parse(localStorage.getItem("rsvps") ?? "[]");
      localStorage.setItem("rsvps", JSON.stringify([...prev, body]));
    } catch {
      /* ignore storage failures */
    }
    await new Promise((r) => setTimeout(r, 600));
    return;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    // text/plain avoids the CORS pre-flight Apps Script can't handle
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = (await res.json().catch(() => null)) as
    | { success?: boolean; error?: string }
    | null;

  if (!data?.success) {
    throw new Error(data?.error ?? "Submission was not accepted.");
  }
}
