export type TreatmentItem = {
  name: string;
  duration?: string;
  price?: number;
};

export type TreatmentCategory = {
  id: "body" | "facial" | "packages" | "subscriptions";
  items: TreatmentItem[];
};

export const treatmentCatalog: TreatmentCategory[] = [
  {
    id: "body",
    items: [
      { name: "RELEASE RITUAL", duration: "60 or 90 min", price: 85 },
      { name: "DEEP TISSUE RELEASE", duration: "60 or 90 min", price: 95 },
      { name: "VOLCANIC HOT STONE MASSAGE", duration: "60 min", price: 90 },
      { name: "NANAI INDIAN HEAD MASSAGE", duration: "50 min", price: 75 },
      { name: "PURE NANAI MOTHER TO BE", duration: "60 min", price: 85 },
      { name: "LYMPHATIC SCULPT & DETOX", duration: "60 min", price: 85 },
      { name: "ENERGIZING LEGS & FEET RITUAL", duration: "45 min", price: 65 },
    ],
  },
  {
    id: "facial",
    items: [
      { name: "DEEP CLEANSING CARE", duration: "120 min", price: 150 },
      { name: "SENSITIVE NANAI CARE", duration: "60 min", price: 85 },
      { name: "SCULP & GLOW LIMPHATIC DRAINAGE", duration: "50 min", price: 75 },
      { name: "POST ACNÉ TREATMENT", duration: "90 min", price: 120 },
      { name: "MICRONEEDLING WITH PEPTIDES", duration: "60 min", price: 110 },
      { name: "CLEAR SKIN", duration: "60 min", price: 95 },
      { name: "SUMMER GLOW AND CRYO HYDRATION FACIAL", duration: "75 min", price: 105 },
      { name: "NANAI SIGNATURE CARE", duration: "90 min", price: 135 },
    ],
  },
  {
    id: "packages",
    items: [
      { name: "THE SOLE & SOUL SERENTY RITUAL", duration: "60 min", price: 100 },
      { name: "HEAD TO TOE REFRESHING GLOW RITUAL", duration: "60 min", price: 110 },
      { name: "BACK SIDE BEAUTY & RELAX RITUAL", duration: "50 min", price: 85 },
    ],
  },
  {
    id: "subscriptions",
    items: [
      { name: "1-month membership", price: 120 },
      { name: "6-month membership", price: 650 },
    ],
  },
];
