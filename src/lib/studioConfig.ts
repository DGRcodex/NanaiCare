// Studio availability configuration.
// Adjust these values when the studio schedule changes.
// All times are in Europe/Amsterdam timezone.

export const STUDIO_CONFIG = {
  timezone: "Europe/Amsterdam",
  // 1=Mon, 2=Tue … 6=Sat, 0=Sun
  // Footer already reads "mar–sáb" (Tue–Sat) — confirmed with NanaiCare
  openDays: [2, 3, 4, 5, 6] as number[], // Tue–Sat
  // Standard Amsterdam beauty studio hours
  openHour: 10,
  closeHour: 19,
  // Buffer after each appointment (minutes) for clean-up / transition
  bufferMin: 15,
} as const;

/**
 * Returns an array of time slot strings ("HH:mm") for a given day and treatment
 * duration. Does NOT check against existing bookings — that happens server-side.
 */
export function generateRawSlots(durationMin: number): string[] {
  const slots: string[] = [];
  const { openHour, closeHour, bufferMin } = STUDIO_CONFIG;
  const stepMin = durationMin + bufferMin;

  let cursor = openHour * 60; // minutes from midnight
  const lastStart = closeHour * 60 - durationMin;

  while (cursor <= lastStart) {
    const h = Math.floor(cursor / 60).toString().padStart(2, "0");
    const m = (cursor % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
    cursor += stepMin;
  }

  return slots;
}

/** Returns true if a given JS Date falls on a studio open day (Amsterdam TZ). */
export function isOpenDay(date: Date): boolean {
  // getDay() uses local TZ of the machine — for display purposes this is fine.
  return STUDIO_CONFIG.openDays.includes(date.getDay());
}
