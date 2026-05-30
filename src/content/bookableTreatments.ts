// Bookable treatments derived from the official NanaiCare catalog.
// Only treatments with a defined duration (in minutes) can be booked online.
// Subscriptions and memberships are handled separately.

import type { BookableTreatment } from "@/types/booking";

export const BOOKABLE_TREATMENTS: BookableTreatment[] = [
  // ─── Body ───────────────────────────────────────────────────────────────
  { name: "Release Ritual", category: "body", durationMin: 60, durationLabel: "60 min" },
  { name: "Release Ritual (Extended)", category: "body", durationMin: 90, durationLabel: "90 min" },
  { name: "Deep Tissue Release", category: "body", durationMin: 60, durationLabel: "60 min" },
  { name: "Deep Tissue Release (Extended)", category: "body", durationMin: 90, durationLabel: "90 min" },
  { name: "Volcanic Hot Stone Massage", category: "body", durationMin: 60, durationLabel: "60 min" },
  { name: "Nanai Indian Head Massage", category: "body", durationMin: 50, durationLabel: "50 min" },
  { name: "Pure Nanai Mother To Be", category: "body", durationMin: 60, durationLabel: "60 min" },
  { name: "Lymphatic Sculpt & Detox", category: "body", durationMin: 60, durationLabel: "60 min" },
  { name: "Energizing Legs & Feet Ritual", category: "body", durationMin: 45, durationLabel: "45 min" },

  // ─── Facial ─────────────────────────────────────────────────────────────
  { name: "Deep Cleansing Care", category: "facial", durationMin: 120, durationLabel: "120 min" },
  { name: "Sensitive Nanai Care", category: "facial", durationMin: 60, durationLabel: "60 min" },
  { name: "Sculp & Glow Limphatic Drainage", category: "facial", durationMin: 50, durationLabel: "50 min" },
  { name: "Post Acné Treatment", category: "facial", durationMin: 90, durationLabel: "90 min" },

  // ─── Packages ────────────────────────────────────────────────────────────
  { name: "The Sole & Soul Serenity Ritual", category: "packages", durationMin: 60, durationLabel: "60 min" },
  { name: "Head to Toe Refreshing Glow Ritual", category: "packages", durationMin: 60, durationLabel: "60 min" },
  { name: "Back Side Beauty & Relax Ritual", category: "packages", durationMin: 50, durationLabel: "50 min" },
];

export const TREATMENT_CATEGORIES = {
  body: "body",
  facial: "facial",
  packages: "packages",
} as const;
