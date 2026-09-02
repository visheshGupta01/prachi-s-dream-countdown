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
  mainPhoto: "/photos/main.jpg",

  /** Floating photos + gallery photos */
  galleryPhotos: [
    "/photos/photo1.jpg",
    "/photos/photo2.jpg",
    "/photos/photo3.jpg",
    "/photos/photo4.jpg",
    "/photos/photo5.jpg",
    "/photos/photo6.jpg",
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
