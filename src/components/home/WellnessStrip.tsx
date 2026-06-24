import { getTranslations } from "next-intl/server";
import Image from "next/image";

type WellnessCard = {
  title: string;
  body: string;
};

const images = [
  "/images/treatments/spa_facial_category_1782263635367.png",
  "/images/treatments/spa_packages_category_1782263643859.png",
  "/images/treatments/spa_body_category_1782263626091.png"
];

export async function WellnessStrip() {
  const t = await getTranslations("Wellness");
  const cards = t.raw("cards") as WellnessCard[];

  return (
    <section id="wellness" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
            <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
            <p className="text-base leading-relaxed text-nanai-ink-soft">{t("subtitle")}</p>
          </div>
          <a
            href="#shop"
            className="inline-flex w-fit items-center justify-center rounded-full border border-nanai-rose/45 bg-white/80 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-nanai-ink/80 shadow-sm backdrop-blur transition hover:border-nanai-sage/55 hover:text-nanai-ink"
          >
            {t("cta")}
          </a>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="group flex flex-col overflow-hidden min-w-[min(100%,20rem)] snap-center rounded-[1.5rem] border border-nanai-rose/30 bg-white/75 shadow-sm backdrop-blur sm:min-w-0 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 w-full shrink-0 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-nanai-ink/10 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0" />
                <Image 
                  src={images[index % images.length]} 
                  alt={card.title}
                  fill 
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 p-6">
                <h3 className="font-heading text-lg font-medium text-nanai-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-nanai-ink-soft">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
