// Bookable treatments derived from the official NanaiCare catalog.
// Only treatments with a defined duration (in minutes) can be booked online.
// Subscriptions and memberships are handled separately.

import type { BookableTreatment } from "@/types/booking";

export const BOOKABLE_TREATMENTS: BookableTreatment[] = [
  // ─── Body ───────────────────────────────────────────────────────────────
  { name: "Release Ritual", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/release-ritual" },
  { name: "Release Ritual (Extended)", category: "body", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/release-ritual-90" },
  { name: "Deep Tissue Release", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/deep-tissue-release" },
  { name: "Deep Tissue Release (Extended)", category: "body", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/deep-tissue-90" },
  { name: "Volcanic Hot Stone Massage", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/volcanic" },
  { name: "Volcanic Hot Stone Massage (Extended)", category: "body", durationMin: 75, durationLabel: "75 min", calLink: "nanai-care-tuxi4k/volcanic-75" },
  { name: "Nanai Indian Head Massage", category: "body", durationMin: 45, durationLabel: "45 min", calLink: "nanai-care-tuxi4k/nanai-indian-head-massage" },
  { name: "Pure Nanai Mother To Be", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/purenanaimother" },
  { name: "Lymphatic for Pregnancy", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/lymphatic-pregnancy" },
  { name: "Lymphatic Sculpt & Detox", category: "body", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/lymphatic-sculpt-detox" },
  { name: "Lymphatic Sculpt & Detox (Extended)", category: "body", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/lymphatic-sculpt-detox-90" },
  { name: "Energizing Legs & Feet Ritual", category: "body", durationMin: 45, durationLabel: "45 min", calLink: "nanai-care-tuxi4k/energizing-legs-feet-ritual" },

  // ─── Facial ─────────────────────────────────────────────────────────────
  { name: "Deep Cleansing Care", category: "facial", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/deep-cleansing-care" },
  { name: "Sensitive Nanai Care", category: "facial", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/sensitive-nanai-care" },
  { name: "Sculp & Glow Lymphatic Drainage", category: "facial", durationMin: 50, durationLabel: "50 min", calLink: "nanai-care-tuxi4k/sculp-glow-lymphatic-drainage" },
  { name: "Post Acné Treatment", category: "facial", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/post-acne-treatment" },
  { name: "Nanai Signature Care", category: "facial", durationMin: 120, durationLabel: "120 min", calLink: "nanai-care-tuxi4k/nanai-signature-care" },
  { name: "Clear Skin", category: "facial", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/clear-skin" },
  { name: "Summer Glow & Cryo Hydration Facial", category: "facial", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/summer-glow-and-cryo-hydration-facial" },
  { name: "Microneedling with Peptides (Face)", category: "facial", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/microneedling-face" },
  { name: "Microneedling with Peptides (Face, Neck & Décolletage)", category: "facial", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/microneedling-full" },
  { name: "Microneedling with Peptides (Face, Neck & Décolletage - Extended)", category: "facial", durationMin: 90, durationLabel: "90 min", calLink: "nanai-care-tuxi4k/microneedling-full-90" },

  // ─── Packages ────────────────────────────────────────────────────────────
  { name: "The Sole & Soul Serenity Ritual", category: "packages", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/the-sole-soul-serenty-ritual" },
  { name: "Head to Toe Refreshing Glow Ritual", category: "packages", durationMin: 60, durationLabel: "60 min", calLink: "nanai-care-tuxi4k/head-to-toe-refreshing-glow-ritual" },
  { name: "Back Side Beauty & Relax Ritual", category: "packages", durationMin: 50, durationLabel: "50 min", calLink: "nanai-care-tuxi4k/back-side-beauty-relax-ritual" },
];

export const TREATMENT_CATEGORIES = {
  body: "body",
  facial: "facial",
  packages: "packages",
} as const;
