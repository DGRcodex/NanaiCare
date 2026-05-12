import { getTranslations } from "next-intl/server";

type Product = {
  name: string;
  note: string;
};

export async function ShopTeaser() {
  const t = await getTranslations("Shop");
  const products = t.raw("products") as Product[];

  return (
    <section id="shop" className="scroll-mt-28 px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-nanai-ink text-white shadow-nanai-soft ring-1 ring-white/10">
        <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:p-12">
          <div className="space-y-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55">{t("label")}</p>
            <h2 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">{t("title")}</h2>
            <p className="text-sm leading-relaxed text-white/75 sm:text-base">{t("subtitle")}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <span className="inline-flex w-fit rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 ring-1 ring-white/15">
                {t("coming")}
              </span>
              <button
                type="button"
                className="inline-flex w-fit items-center justify-center rounded-full bg-nanai-blush px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-nanai-ink shadow-sm transition hover:bg-white"
              >
                {t("cta")}
              </button>
            </div>
          </div>

          <ul className="space-y-3">
            {products.map((product) => (
              <li
                key={product.name}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
              >
                <div>
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">{product.note}</p>
                </div>
                <span className="h-2 w-2 shrink-0 rounded-full bg-nanai-sage" aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
