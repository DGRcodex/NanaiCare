export type TreatmentItem = {
  name: string;
  duration?: string;
};

export type TreatmentCategory = {
  id: "body" | "facial" | "packages" | "subscriptions";
  items: TreatmentItem[];
};

export const treatmentCatalog: TreatmentCategory[] = [
  {
    id: "body",
    items: [
      { name: "Stress Release", duration: "60 or 90 min" },
      { name: "Deep Tissue Massage", duration: "60 or 90 min" },
      { name: "Hot Stones Massage", duration: "60 min" },
      { name: "Indian Head Massage", duration: "50 min" },
      { name: "Pregnancy Massage", duration: "60 min" },
      { name: "Lymphatic Massage", duration: "60 min" },
      { name: "Energizing Leg Ritual", duration: "45 min" },
    ],
  },
  {
    id: "facial",
    items: [
      { name: "Deep Cleansing Care", duration: "120 min" },
      { name: "Sensitive Nanai Care", duration: "60 min" },
      { name: "Lymphatic Nanai Detox" },
      { name: "Post Acne Treatment", duration: "90 min" },
      { name: "Microneedling with Peptides" },
      { name: "Men's Facial" },
      { name: "Clear Skin" },
      { name: "Summer Glow" },
      { name: "Nanai Signature Care" },
      { name: "Energizing Facial" },
    ],
  },
  {
    id: "packages",
    items: [
      { name: "Spring / Summer package" },
      { name: "Autumn / Winter package" },
      { name: "Legs & Head" },
      { name: "Legs & Face" },
    ],
  },
  {
    id: "subscriptions",
    items: [
      { name: "1-month subscription" },
      { name: "6-month subscription" },
    ],
  },
];
