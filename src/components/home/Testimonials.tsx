import { getTranslations } from "next-intl/server";
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
  const localItems = t.raw("items") as Quote[];
  
  let sanityItems: Quote[] = [];
  try {
    sanityItems = await client.fetch(getTestimonialsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Failed to fetch testimonials from Sanity:", error);
  }

  // Combine Sanity items (newest first) with the local translated ones.
  const items = [...sanityItems, ...localItems];

  return (
    <section id="stories" className="scroll-mt-28 border-y border-nanai-rose/25 bg-white/55 py-20 backdrop-blur-md sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <figure
              key={index}
              className="group relative flex h-full flex-col justify-between rounded-[1.65rem] bg-gradient-to-b from-white/95 to-nanai-frost/90 p-7 shadow-nanai-soft ring-1 ring-nanai-rose/25 transition hover:-translate-y-1 hover:ring-nanai-sage/35"
            >
              <div className="text-4xl font-heading leading-none text-nanai-blush transition group-hover:text-nanai-rose" aria-hidden>
                “
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-nanai-ink sm:text-[15px]">{item.quote}</blockquote>
              <figcaption className="mt-6 border-t border-nanai-rose/25 pt-5 text-xs">
                <p className="font-semibold text-nanai-ink">{item.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-nanai-ink-soft">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        
        <ReviewForm label={t("leaveReview")} />
      </div>
    </section>
  );
}
