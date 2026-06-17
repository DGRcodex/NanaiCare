// Bookable treatments derived from the official NanaiCare catalog.
// Only treatments with a defined duration (in minutes) can be booked online.
// Subscriptions and memberships are handled separately.

import type { BookableTreatment } from "@/types/booking";

export const BOOKABLE_TREATMENTS: BookableTreatment[] = [
  // ─── Body ───────────────────────────────────────────────────────────────
  { name: "Release Ritual", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/release-ritual-60" },
  { name: "Release Ritual (Extended)", category: "body", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/release-ritual-90" },
  { name: "Deep Tissue Release", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/deep-tissue-60" },
  { name: "Deep Tissue Release (Extended)", category: "body", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/deep-tissue-90" },
  { name: "Volcanic Hot Stone Massage", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/hot-stone-60" },
  { name: "Nanai Indian Head Massage", category: "body", durationMin: 50, durationLabel: "50 min", calLink: "nanai-care-tuxi4k/indian-head-50" },
  { name: "Pure Nanai Mother To Be", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/mother-to-be-60" },
  { name: "Lymphatic Sculpt & Detox", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/lymphatic-60" },
  { name: "Energizing Legs & Feet Ritual", category: "body", durationMin: 45, durationLabel: "45 min", calLink: "nanai-care-tuxi4k/legs-feet-45" },

  // ─── Facial ─────────────────────────────────────────────────────────────
  { name: "Deep Cleansing Care", category: "facial", durationMin: 120, durationLabel: "120 min", calLink: "nanai-care-tuxi4k/deep-cleansing-120" },
  { name: "Sensitive Nanai Care", category: "facial", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/sensitive-60" },
  { name: "Sculp & Glow Limphatic Drainage", category: "facial", durationMin: 50, durationLabel: "50 min", calLink: "nanai-care-tuxi4k/sculp-glow-50" },
  { name: "Post Acné Treatment", category: "facial", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/post-acne-90" },

  // ─── Packages ────────────────────────────────────────────────────────────
  { name: "The Sole & Soul Serenity Ritual", category: "packages", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/sole-soul-60" },
  { name: "Head to Toe Refreshing Glow Ritual", category: "packages", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/head-toe-60" },
  { name: "Back Side Beauty & Relax Ritual", category: "packages", durationMin: 50, durationLabel: "50 min", calLink: "nanai-care-tuxi4k/back-side-50" },
];

export const TREATMENT_CATEGORIES = {
  body: "body",
  facial: "facial",
  packages: "packages",
} as const;
