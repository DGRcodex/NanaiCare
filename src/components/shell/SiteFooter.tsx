import { getTranslations } from "next-intl/server";
import { Mark } from "@/components/brand/Mark";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer id="book" className="border-t border-nanai-rose/30 bg-white/70 py-14 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-md space-y-4">
          <div className="flex items-center">
            <Mark src="/PNG%20Transparente/nanai-logo-v.png" className="h-16 w-auto" aria-hidden />
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
      <div className="mx-auto mt-10 max-w-6xl border-t border-nanai-rose/25 px-4 pt-6 pb-8 text-xs text-nanai-ink-soft sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:pb-6">
        <span>
          © {new Date().getFullYear()} NanaiCare. {t("rights")}
        </span>

        <div className="mt-6 flex flex-col gap-4 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
          {/* Sambalab */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-nanai-ink-soft">Creative Direction by Sambalab</span>
            <div className="flex items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
              <a href="https://sambalab.pro" target="_blank" rel="noopener noreferrer" className="hover:text-nanai-ink transition-colors" aria-label="Sambalab Website">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="https://linkedin.com/company/sambalab" target="_blank" rel="noopener noreferrer" className="hover:text-nanai-ink transition-colors" aria-label="Sambalab LinkedIn">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
          {/* DGRcodex */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-nanai-ink-soft">Engineered by DGRcodex</span>
            <div className="flex items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
              <a href="https://dgrcodex.me" target="_blank" rel="noopener noreferrer" className="hover:text-nanai-ink transition-colors" aria-label="DGRcodex Portfolio">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <a href="https://github.com/DGRcodex" target="_blank" rel="noopener noreferrer" className="hover:text-nanai-ink transition-colors" aria-label="DGRcodex GitHub">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://linkedin.com/in/dgrcodex" target="_blank" rel="noopener noreferrer" className="hover:text-nanai-ink transition-colors" aria-label="DGRcodex LinkedIn">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
