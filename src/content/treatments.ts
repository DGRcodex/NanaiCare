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
      { name: "RELEASE RITUAL", duration: "60 or 90 min" },
      { name: "DEEP TISSUE RELEASE", duration: "60 or 90 min" },
      { name: "VOLCANIC HOT STONE MASSAGE", duration: "60 min" },
      { name: "NANAI INDIAN HEAD MASSAGE", duration: "50 min" },
      { name: "PURE NANAI MOTHER TO BE", duration: "60 min" },
      { name: "LYMPHATIC SCULPT & DETOX", duration: "60 min" },
      { name: "ENERGIZING LEGS & FEET RITUAL", duration: "45 min" },
    ],
  },
  {
    id: "facial",
    items: [
      { name: "DEEP CLEANSING CARE", duration: "120 min" },
      { name: "SENSITIVE NANAI CARE", duration: "60 min" },
      { name: "SCULP & GLOW LIMPHATIC DRAINAGE", duration: "50 min" },
      { name: "POST ACNÉ TREATMENT", duration: "90 min" },
      { name: "MICRONEEDLING WITH PEPTIDES" },
      { name: "CLEAR SKIN" },
      { name: "SUMMER GLOW AND CRYO HYDRATION FACIAL" },
      { name: "NANAI SIGNATURE CARE" },
    ],
  },
  {
    id: "packages",
    items: [
      { name: "THE SOLE & SOUL SERENTY RITUAL", duration: "60 min" },
      { name: "HEAD TO TOE REFRESHING GLOW RITUAL", duration: "60 min" },
      { name: "BACK SIDE BEAUTY & RELAX RITUAL", duration: "50 min" },
    ],
  },
  {
    id: "subscriptions",
    items: [
      { name: "1-month membership" },
      { name: "6-month membership" },
    ],
  },
];
