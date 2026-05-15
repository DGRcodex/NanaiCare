import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Policies } from "@/components/home/Policies";
import { RoadmapPhase2 } from "@/components/home/RoadmapPhase2";
import { TreatmentsPreview } from "@/components/home/TreatmentsPreview";
import { ShopTeaser } from "@/components/home/ShopTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { WellnessStrip } from "@/components/home/WellnessStrip";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TreatmentsPreview />
      <Policies />
      <Testimonials />
      <WellnessStrip />
      <ShopTeaser />
      <RoadmapPhase2 />
    </>
  );
}
