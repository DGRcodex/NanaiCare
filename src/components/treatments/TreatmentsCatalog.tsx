import { getTranslations, getLocale } from "next-intl/server";
import { treatmentCatalog } from "@/content/treatments";
import Image from "next/image";
import { TreatmentCard } from "./TreatmentCard";

export async function TreatmentsCatalog() {
  const t = await getTranslations("Treatments");
  const locale = await getLocale();

  return (
    <div className="space-y-24">
      {treatmentCatalog
        .filter((category) => category.id !== "subscriptions")
        .map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-28">
          
          {/* Modern Category Header with Image */}
          <div className="relative mb-10 overflow-hidden rounded-[2rem] shadow-nanai-soft transition-transform duration-500 hover:-translate-y-1">
            {category.image && (
              <div className="aspect-[16/9] w-full sm:aspect-[3/1] relative">
                <Image 
                  src={category.image} 
                  alt={t(`categories.${category.id}`)} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Soft gradient overlay for text readability and joy */}
                <div className="absolute inset-0 bg-gradient-to-t from-nanai-ink/70 via-nanai-ink/20 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-nanai-sage/10 mix-blend-overlay" />
              </div>
            )}
            
            <div className={`absolute bottom-0 left-0 w-full p-8 sm:p-12 ${!category.image ? 'bg-nanai-blush/30' : ''}`}>
              <h2 className="font-heading text-4xl font-medium tracking-wide text-white drop-shadow-md sm:text-5xl">
                {t(`categories.${category.id}`)}
              </h2>
            </div>
          </div>

          {/* Treatment List */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:gap-6">
            {category.items.map((item) => (
              <TreatmentCard key={item.name} item={item} locale={locale} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
