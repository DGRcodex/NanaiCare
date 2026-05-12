import { getTranslations } from "next-intl/server";
import { Mark } from "@/components/brand/Mark";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer id="book" className="border-t border-nanai-rose/30 bg-white/70 py-14 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-nanai-blush/70 ring-1 ring-nanai-rose/35">
              <Mark className="h-6 w-6 text-nanai-ink" aria-hidden />
            </span>
            <p className="font-heading text-sm font-semibold tracking-[0.22em] text-nanai-ink">NANAI CARE</p>
          </div>
          <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("tagline")}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nanai-sage">{t("hours")}</p>
        </div>

        <div className="flex flex-col gap-6 text-sm text-nanai-ink/80 sm:flex-row sm:items-center sm:gap-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-nanai-ink-soft">Studio</p>
            <p className="mt-1 font-medium">{t("address")}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-nanai-ink-soft">Contact</p>
            <a className="mt-1 block font-medium underline-offset-4 hover:underline" href={`mailto:${t("contact")}`}>
              {t("contact")}
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-nanai-rose/25 px-4 pt-6 text-xs text-nanai-ink-soft sm:px-6 lg:px-8">
        © {new Date().getFullYear()} NanaiCare. {t("rights")}
      </div>
    </footer>
  );
}
