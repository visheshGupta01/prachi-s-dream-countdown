/**
 * ── EASY CUSTOMIZATION ──────────────────────────────────────────────
 * Everything personal lives in this file. Replace the photos inside
 * /public/photos/ with your own (keep the same file names) or edit the
 * paths below. No other file needs to change.
 */

export const config = {
  /** Her name (used only for the page title / meta, no on-screen messages yet) */
  name: "Prachi",

  /** Birthday target — reached at 00:00 in the timezone below */
  birthdayDate: "2026-09-13T00:00:00",
  /** IANA timezone. Offset is fixed for IST (+05:30). */
  timezone: "Asia/Kolkata",
  timezoneOffsetMinutes: 5 * 60 + 30,

  /** Large hero photo (replace with a photo of her) */
  mainPhoto: "/photos/main.jpeg",

  /** Floating photos + gallery photos */
  galleryPhotos: [
    "/photos/photo1.jpeg",
    "/photos/photo2.jpeg",
    "/photos/photo3.jpeg",
    "/photos/photo4.jpeg",
    "/photos/photo5.jpeg",
    "/photos/photo6.jpeg",
  ],

  /** Optional: drop a file in /public and set e.g. "/music/song.mp3" */
  backgroundMusic: null as string | null,

  /** Intro length in ms */
  introDurationMs: 2600,
} as const;

/** Absolute target timestamp (ms) — independent of the visitor's timezone. */
export const targetTimestamp = (() => {
  const [date, time] = config.birthdayDate.split("T");
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi, s] = time.split(":").map(Number);
  return Date.UTC(y, mo - 1, d, h, mi, s) - config.timezoneOffsetMinutes * 60_000;
})();
