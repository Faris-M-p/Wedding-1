import { wedding } from "@/lib/config";

export type GuestBlessing = { name: string; wish: string };

export type BlessingInput = {
  name: string;
  phone?: string;
  wish: string;
  isCustom: boolean;
};

// Wishes share the single deployment URL (routed by `type`).
const endpoint = wedding.wishes.endpoint;

/**
 * Submits a wish to the Apps Script Web App with `type: "wish"`.
 * Every wish is stored as Status = "Pending" and only appears on the
 * website once the couple sets it to "Approved" in the sheet.
 *
 * Returns `approved: false` so the UI shows a "pending review" message
 * (the server does not auto-approve).
 */
export async function submitBlessing(
  input: BlessingInput
): Promise<{ approved: boolean }> {
  const body = {
    type: "wish" as const,
    name: input.name.trim(),
    phone: (input.phone ?? "").trim(),
    wish: input.wish.trim(),
    isCustom: input.isCustom,
  };

  if (!endpoint) {
    // Offline fallback — keep a local copy.
    try {
      const prev = JSON.parse(localStorage.getItem("blessings-pending") ?? "[]");
      localStorage.setItem(
        "blessings-pending",
        JSON.stringify([...prev, body])
      );
    } catch {
      /* ignore */
    }
    await new Promise((r) => setTimeout(r, 500));
    return { approved: false };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
    redirect: "follow",
  });

  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

  const data = (await res.json().catch(() => null)) as
    | { success?: boolean; approved?: boolean; error?: string }
    | null;

  if (!data?.success) throw new Error(data?.error ?? "Submission failed.");
  return { approved: data.approved === true };
}

/**
 * Fetches the approved guest wishes for display via GET ?action=wishes.
 * The endpoint returns a plain array: [{ name, wish }, ...].
 * Returns an empty array on any failure so the UI degrades gracefully.
 */
export async function fetchApprovedBlessings(): Promise<GuestBlessing[]> {
  if (!endpoint) return [];
  try {
    const url = `${endpoint}?action=wishes`;
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    if (!res.ok) return [];
    const data = (await res.json().catch(() => null)) as unknown;

    // Preferred: a plain array of { name, wish }.
    if (Array.isArray(data)) {
      return data.filter(
        (d): d is GuestBlessing =>
          !!d && typeof d.name === "string" && typeof d.wish === "string"
      );
    }
    // Tolerated: { success, wishes: [...] } shape.
    if (
      data &&
      typeof data === "object" &&
      Array.isArray((data as { wishes?: unknown }).wishes)
    ) {
      return (data as { wishes: GuestBlessing[] }).wishes;
    }
    return [];
  } catch {
    return [];
  }
}
