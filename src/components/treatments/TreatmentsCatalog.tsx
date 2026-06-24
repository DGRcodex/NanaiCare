import { getTranslations } from "next-intl/server";
import { treatmentCatalog } from "@/content/treatments";
import Image from "next/image";

export async function TreatmentsCatalog() {
  const t = await getTranslations("Treatments");

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
              <li
                key={item.name}
                className="group relative flex items-start justify-between gap-4 rounded-3xl border border-white/40 bg-white/60 px-6 py-5 shadow-sm ring-1 ring-nanai-rose/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-md hover:ring-nanai-rose/30"
              >
                <div className="flex flex-col gap-1 pr-4">
                  <span className="font-heading text-lg font-medium text-nanai-ink transition-colors group-hover:text-nanai-accent">{item.name}</span>
                  {/* Future-proofing for descriptions */}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  {item.price ? (
                    <span className="text-base font-bold text-nanai-ink">
                      €{item.price}
                    </span>
                  ) : null}
                  {item.duration ? (
                    <span className="rounded-full bg-nanai-blush/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-nanai-sage">
                      {item.duration}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
