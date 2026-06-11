import { getTranslations } from "next-intl/server";
import { Mark } from "@/components/brand/Mark";

export async function AboutNanai() {
  const t = await getTranslations("About");


  return (
    <section id="about" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-nanai-blush via-white to-nanai-sage/30 p-1 shadow-nanai-soft ring-1 ring-nanai-rose/40 sm:h-64 sm:w-64">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white/90 text-center">
              <Mark className="h-28 w-auto sm:h-32" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
          <p className="text-base leading-relaxed text-nanai-ink-soft">{t("meaning")}</p>
          <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("vision")}</p>
          <a
            href="https://www.nanaicare.com"
            className="inline-block text-sm font-semibold text-nanai-ink underline-offset-4 hover:underline"
          >
            www.nanaicare.com
          </a>

        </div>
      </div>
    </section>
  );
}
