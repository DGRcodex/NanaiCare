import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/shell/LocaleSwitcher";


export async function SiteHeader({ locale }: { locale: string }) {
  const t = await getTranslations("Nav");
  const active = locale as AppLocale;

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-nanai-frost/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center rounded-full pr-3 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-nanai-sage"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logolanding.jpeg" 
            alt="NanaiCare Amsterdam" 
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
          />
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm font-semibold tracking-wide text-nanai-ink/75 lg:flex"
          aria-label="Primary"
        >
          <Link href="/treatments" className="transition hover:text-nanai-ink">
            {t("treatments")}
          </Link>
          <Link href="/#about" className="transition hover:text-nanai-ink">
            {t("about")}
          </Link>
          <Link href="/#policies" className="transition hover:text-nanai-ink">
            {t("policies")}
          </Link>
          <Link href="/blog" className="transition hover:text-nanai-ink">
            Nanai Rituals
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <LocaleSwitcher active={active} />
          <Link
            href="/book"
            className="hidden rounded-full bg-nanai-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-nanai-soft transition hover:bg-nanai-ink/90 sm:inline-flex"
          >
            {t("book")}
          </Link>

          <details className="relative lg:hidden">
            <summary className="list-none [&::-webkit-details-marker]:hidden">
              <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-nanai-rose/40 bg-white/90 text-nanai-ink shadow-sm">
                <span className="sr-only">Menu</span>
                <span aria-hidden className="flex flex-col gap-1">
                  <span className="h-0.5 w-4 rounded-full bg-nanai-ink" />
                  <span className="h-0.5 w-4 rounded-full bg-nanai-ink" />
                </span>
              </span>
            </summary>
            <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-nanai-rose/35 bg-white/95 p-2 text-sm font-semibold shadow-nanai-soft backdrop-blur-xl">
              <Link className="block rounded-xl px-3 py-2 hover:bg-nanai-blush/60" href="/treatments">
                {t("treatments")}
              </Link>
              <Link className="block rounded-xl px-3 py-2 hover:bg-nanai-blush/60" href="/#about">
                {t("about")}
              </Link>
              <Link className="block rounded-xl px-3 py-2 hover:bg-nanai-blush/60" href="/#policies">
                {t("policies")}
              </Link>
              <Link className="block rounded-xl px-3 py-2 hover:bg-nanai-blush/60" href="/#stories">
                {t("stories")}
              </Link>
              <Link className="block rounded-xl px-3 py-2 hover:bg-nanai-blush/60" href="/blog">
                Nanai Rituals
              </Link>
              <Link
                className="mt-1 block rounded-xl bg-nanai-ink px-3 py-2 text-center text-xs uppercase tracking-[0.16em] text-white"
                href="/book"
              >
                {t("book")}
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
