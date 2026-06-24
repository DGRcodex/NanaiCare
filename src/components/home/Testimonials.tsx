import { getTranslations, getLocale } from "next-intl/server";
import { ReviewForm } from "./ReviewForm";
import { client } from "@/sanity/client";
import { getTestimonialsQuery } from "@/sanity/queries";

type Quote = {
  quote: string;
  name: string;
  role?: string;
  _id?: string;
};

export async function Testimonials() {
  const t = await getTranslations("Testimonials");
  const locale = await getLocale();
  
  let sanityItems: Quote[] = [];
  try {
    sanityItems = await client.fetch(getTestimonialsQuery, { language: locale }, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Failed to fetch testimonials from Sanity:", error);
  }

  // Use only Sanity items
  const items = sanityItems;

  return (
    <section id="stories" className="scroll-mt-28 border-y border-nanai-rose/25 bg-white/55 py-20 backdrop-blur-md sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
          }
          @media (max-width: 768px) {
            .animate-marquee {
              animation-duration: 25s;
            }
          }
        `}</style>

        <div className="mt-12 overflow-hidden relative w-full group py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* Fading edges for the marquee effect */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-8 bg-gradient-to-r from-white/55 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 bg-gradient-to-l from-white/55 to-transparent sm:w-20" />
          
          <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
            {[...items, ...items].map((item, index) => (
              <figure
                key={index}
                className="relative flex h-auto w-[300px] sm:w-[350px] shrink-0 flex-col justify-between rounded-[1.65rem] bg-gradient-to-b from-white/95 to-nanai-frost/90 p-7 shadow-nanai-soft ring-1 ring-nanai-rose/25 transition-all hover:-translate-y-1 hover:ring-nanai-sage/35 hover:shadow-md"
              >
                <div className="text-4xl font-heading leading-none text-nanai-blush transition group-hover:text-nanai-rose" aria-hidden>
                  “
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-nanai-ink sm:text-[15px]">{item.quote}</blockquote>
                
                <figcaption className="mt-6 flex items-center gap-4 border-t border-nanai-rose/25 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nanai-blush/40 text-sm font-heading font-bold text-nanai-ink">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-nanai-ink">{item.name}</p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-nanai-ink-soft">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <ReviewForm 
            label={t("leaveReview")} 
            namePlaceholder={t("namePlaceholder")}
            reviewPlaceholder={t("reviewPlaceholder")}
            successMessage={t("successMessage")}
            errorMissingKey={t("errorMissingKey")}
            errorNetwork={t("errorNetwork")}
          />
        </div>
      </div>
    </section>
  );
}
