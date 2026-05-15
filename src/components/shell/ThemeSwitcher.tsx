"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  COLOR_ROLE_KEYS,
  DEFAULT_THEME_ID,
  getThemeById,
  NANAI_THEMES,
  THEME_STORAGE_KEY,
  type NanaiThemeId,
} from "@/lib/themes";
import { setTheme } from "@/components/shell/ThemeProvider";

const INTENSITY_STORAGE_KEY = "nanaicare-intensity";

export function ThemeSwitcher() {
  const t = useTranslations("Themes");
  const [active, setActive] = useState<NanaiThemeId>(DEFAULT_THEME_ID);
  const [open, setOpen] = useState(true);
  const [intensity, setIntensity] = useState(100);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as NanaiThemeId | null;
    if (stored && NANAI_THEMES.some((th) => th.id === stored)) {
      setActive(stored);
    }

    const storedIntensity = localStorage.getItem(INTENSITY_STORAGE_KEY);
    if (storedIntensity) {
      setIntensity(parseInt(storedIntensity, 10));
    }

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<NanaiThemeId>).detail;
      if (detail) setActive(detail);
    };
    window.addEventListener("nanaicare-theme-change", onChange);
    return () => window.removeEventListener("nanaicare-theme-change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-intensity', `${intensity}%`);
  }, [intensity]);

  const handleIntensityChange = (value: number) => {
    setIntensity(value);
    localStorage.setItem(INTENSITY_STORAGE_KEY, value.toString());
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div className="flex flex-col gap-2">
        <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-nanai-rose/40 bg-white/95 px-4 py-3 text-left shadow-nanai-soft backdrop-blur-md sm:w-auto sm:min-w-[17rem]"
            aria-expanded={open}
            aria-controls="theme-panel"
          >
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-nanai-sage">
                {t("toggleLabel")}
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-nanai-ink">
                {t(getThemeById(active).labelKey)}
              </span>
            </span>
            <span className="flex gap-0.5" aria-hidden>
              {getThemeById(active).colors &&
                COLOR_ROLE_KEYS.map((role) => (
                  <span
                    key={role}
                    className="h-5 w-5 rounded-full ring-1 ring-black/10 first:rounded-l-lg last:rounded-r-lg sm:h-6 sm:w-6"
                    style={{
                      backgroundColor: NANAI_THEMES.find((th) => th.id === active)!.colors[role],
                    }}
                  />
                ))}
            </span>
          </button>

      {open ? (
        <div
          id="theme-panel"
          className="mt-2 max-h-[min(70vh,28rem)] overflow-y-auto rounded-2xl border border-nanai-rose/35 bg-white/97 p-3 shadow-nanai-soft backdrop-blur-xl"
          role="listbox"
          aria-label={t("panelLabel")}
        >
          <p className="px-2 pb-2 text-xs leading-relaxed text-nanai-ink-soft">{t("panelIntro")}</p>
          
          <div className="mb-4 rounded-xl border border-nanai-rose/25 bg-nanai-blush/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-nanai-ink">Intensidad de color</span>
              <span className="text-xs font-medium text-nanai-ink-soft">{intensity}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={intensity}
              onChange={(e) => handleIntensityChange(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-nanai-rose/30 accent-nanai-sage"
              aria-label="Ajustar intensidad de colores"
            />
            <div className="mt-2 flex justify-between text-[10px] text-nanai-ink-soft">
              <span>Suave</span>
              <span>Vibrante</span>
            </div>
          </div>
          
          <ul className="space-y-2">
            {NANAI_THEMES.map((theme) => {
              const isActive = theme.id === active;
              return (
                <li key={theme.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setTheme(theme.id);
                      setActive(theme.id);
                    }}
                    className={[
                      "w-full rounded-xl px-3 py-2.5 text-left transition",
                      isActive
                        ? "bg-nanai-ink text-white shadow-sm"
                        : "hover:bg-nanai-blush/70 text-nanai-ink",
                    ].join(" ")}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span>
                        <span className="block text-sm font-semibold">{t(theme.labelKey)}</span>
                        <span
                          className={[
                            "mt-0.5 block text-[11px] leading-snug",
                            isActive ? "text-white/75" : "text-nanai-ink-soft",
                          ].join(" ")}
                        >
                          {t(theme.hintKey)}
                        </span>
                      </span>
                    </span>
                    <span className="mt-2 flex gap-1" aria-hidden>
                      {COLOR_ROLE_KEYS.map((role) => (
                        <span
                          key={role}
                          className="h-4 flex-1 rounded-md ring-1 ring-black/10"
                          style={{ backgroundColor: theme.colors[role] }}
                          title={t(`roles.${role}`)}
                        />
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
        </div>
    </div>
  );
}
