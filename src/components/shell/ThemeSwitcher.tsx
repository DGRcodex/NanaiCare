"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  COLOR_ROLE_KEYS,
  DEFAULT_THEME_ID,
  getThemeById,
  NANAI_THEMES,
  THEME_STORAGE_KEY,
  type NanaiThemeId,
  type ThemeColors,
} from "@/lib/themes";
import { setTheme } from "@/components/shell/ThemeProvider";

const INTENSITY_KEY = "nanaicare-intensity";
const CONTRAST_KEY = "nanaicare-contrast";
const ORDER_KEY = "nanaicare-color-order";
const HEADING_FONT_KEY = "nanaicare-heading-font";
const BODY_FONT_KEY = "nanaicare-body-font";

type Role = keyof ThemeColors;
const DEFAULT_ORDER: Role[] = [...COLOR_ROLE_KEYS];

type FontOption = { var: string; label: string; sample: string };
const FONT_OPTIONS: FontOption[] = [
  { var: "--font-oswald", label: "Oswald", sample: "sans condensed" },
  { var: "--font-quicksand", label: "Quicksand", sample: "sans rounded" },
  { var: "--font-cormorant", label: "Cormorant", sample: "serif clásico" },
  { var: "--font-josefin", label: "Josefin Sans", sample: "sans geométrico" },
  { var: "--font-nunito", label: "Nunito", sample: "sans suave" },
  { var: "--font-playfair", label: "Playfair", sample: "serif editorial" },
  { var: "--font-lora", label: "Lora", sample: "serif legible" },
  { var: "--font-dm-sans", label: "DM Sans", sample: "sans neutro" },
  { var: "--font-instrument", label: "Instrument Serif", sample: "serif italic" },
];

export function ThemeSwitcher() {
  const t = useTranslations("Themes");
  const [active, setActive] = useState<NanaiThemeId>(DEFAULT_THEME_ID);
  const [open, setOpen] = useState(false);
  const [intensity, setIntensity] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [colorOrder, setColorOrder] = useState<Role[]>(DEFAULT_ORDER);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [headingFont, setHeadingFont] = useState<string | null>(null);
  const [bodyFont, setBodyFont] = useState<string | null>(null);
  const touchRef = useRef<{ index: number } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as NanaiThemeId | null;
    if (stored && NANAI_THEMES.some((th) => th.id === stored)) {
      setActive(stored);
    }

    const storedIntensity = localStorage.getItem(INTENSITY_KEY);
    if (storedIntensity) setIntensity(parseInt(storedIntensity, 10));

    const storedContrast = localStorage.getItem(CONTRAST_KEY);
    if (storedContrast) setContrast(parseInt(storedContrast, 10));

    const storedOrder = localStorage.getItem(ORDER_KEY);
    if (storedOrder) {
      try {
        const parsed = JSON.parse(storedOrder) as Role[];
        if (Array.isArray(parsed) && parsed.length === DEFAULT_ORDER.length) {
          setColorOrder(parsed);
        }
      } catch {
        // ignore
      }
    }

    const storedHeadingFont = localStorage.getItem(HEADING_FONT_KEY);
    if (storedHeadingFont) setHeadingFont(storedHeadingFont);
    const storedBodyFont = localStorage.getItem(BODY_FONT_KEY);
    if (storedBodyFont) setBodyFont(storedBodyFont);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<NanaiThemeId>).detail;
      if (detail) setActive(detail);
    };
    window.addEventListener("nanaicare-theme-change", onChange);
    return () => window.removeEventListener("nanaicare-theme-change", onChange);
  }, []);

  // Apply intensity + contrast filter directly to documentElement so it actually affects the page.
  useEffect(() => {
    document.documentElement.style.filter = `saturate(${intensity}%) contrast(${contrast}%)`;
  }, [intensity, contrast]);

  // Apply reordered colors to CSS variables whenever theme or order changes.
  useEffect(() => {
    const theme = getThemeById(active);
    const root = document.documentElement;
    COLOR_ROLE_KEYS.forEach((slot, i) => {
      const sourceRole = colorOrder[i];
      root.style.setProperty(`--nanai-${slot}`, theme.colors[sourceRole]);
    });
  }, [active, colorOrder]);

  // Apply font overrides (or theme defaults) on theme/font change.
  useEffect(() => {
    const theme = getThemeById(active);
    const root = document.documentElement;
    const headVar = headingFont ?? theme.fonts.headingVar;
    const bodyVarValue = bodyFont ?? theme.fonts.bodyVar;
    root.style.setProperty("--font-theme-heading", `var(${headVar}), system-ui, sans-serif`);
    root.style.setProperty("--font-theme-body", `var(${bodyVarValue}), system-ui, sans-serif`);
  }, [active, headingFont, bodyFont]);

  const handleHeadingFont = (v: string) => {
    if (v === "") {
      setHeadingFont(null);
      localStorage.removeItem(HEADING_FONT_KEY);
    } else {
      setHeadingFont(v);
      localStorage.setItem(HEADING_FONT_KEY, v);
    }
  };

  const handleBodyFont = (v: string) => {
    if (v === "") {
      setBodyFont(null);
      localStorage.removeItem(BODY_FONT_KEY);
    } else {
      setBodyFont(v);
      localStorage.setItem(BODY_FONT_KEY, v);
    }
  };

  const handleIntensity = (v: number) => {
    setIntensity(v);
    localStorage.setItem(INTENSITY_KEY, String(v));
  };

  const handleContrast = (v: number) => {
    setContrast(v);
    localStorage.setItem(CONTRAST_KEY, String(v));
  };

  const persistOrder = (next: Role[]) => {
    setColorOrder(next);
    localStorage.setItem(ORDER_KEY, JSON.stringify(next));
  };

  const swapAt = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return;
    const next = [...colorOrder];
    [next[from], next[to]] = [next[to], next[from]];
    persistOrder(next);
  };

  const resetOrder = () => persistOrder([...DEFAULT_ORDER]);

  const handleDownload = () => {
    const theme = getThemeById(active);
    const themeName = t(theme.labelKey);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const lines: string[] = [];
    lines.push("NanaiCare — Configuracion guardada");
    lines.push(`Fecha: ${date}`);
    lines.push("");
    lines.push(`Tema: ${themeName} (${theme.id})`);
    lines.push(`Intensidad (saturate): ${intensity}%`);
    lines.push(`Contraste (contrast): ${contrast}%`);
    const headVar = headingFont ?? theme.fonts.headingVar;
    const bodyVarValue = bodyFont ?? theme.fonts.bodyVar;
    const headLabel = FONT_OPTIONS.find((f) => f.var === headVar)?.label ?? headVar;
    const bodyLabel = FONT_OPTIONS.find((f) => f.var === bodyVarValue)?.label ?? bodyVarValue;
    lines.push(`Tipografía títulos: ${headLabel} (${headVar})${headingFont ? " [override]" : ""}`);
    lines.push(`Tipografía cuerpo: ${bodyLabel} (${bodyVarValue})${bodyFont ? " [override]" : ""}`);
    lines.push("");
    lines.push("Orden de colores (slot CSS = color asignado):");
    COLOR_ROLE_KEYS.forEach((slot, i) => {
      const sourceRole = colorOrder[i];
      const hex = theme.colors[sourceRole];
      lines.push(`  --nanai-${slot}: ${hex}  (origen: ${sourceRole})`);
    });
    lines.push("");
    lines.push("Paleta original del tema:");
    COLOR_ROLE_KEYS.forEach((role) => {
      lines.push(`  ${role}: ${theme.colors[role]}`);
    });
    lines.push("");
    lines.push("Filtro CSS aplicado al <html>:");
    lines.push(`  filter: saturate(${intensity}%) contrast(${contrast}%);`);
    lines.push("");
    lines.push("JSON:");
    lines.push(
      JSON.stringify(
        {
          theme: theme.id,
          intensity,
          contrast,
          colorOrder,
          appliedColors: Object.fromEntries(
            COLOR_ROLE_KEYS.map((slot, i) => [slot, theme.colors[colorOrder[i]]])
          ),
          fonts: {
            heading: headVar,
            body: bodyVarValue,
            headingOverride: headingFont !== null,
            bodyOverride: bodyFont !== null,
          },
        },
        null,
        2
      )
    );

    const content = lines.join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nanaicare-config-${theme.id}-${date.replace(/[: ]/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Unified Pointer Events handlers (mouse + touch + pen)
  const findIndexAtPoint = (x: number, y: number): number | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const idxAttr = el?.closest<HTMLElement>("[data-swatch-index]")?.dataset.swatchIndex;
    return idxAttr !== undefined ? parseInt(idxAttr, 10) : null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, i: number) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    touchRef.current = { index: i };
    setDraggedIndex(i);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (touchRef.current === null) return;
    e.preventDefault();
    // Hide dragged element from elementFromPoint hit-testing.
    const target = e.target as HTMLElement;
    const prevPE = target.style.pointerEvents;
    target.style.pointerEvents = "none";
    const idx = findIndexAtPoint(e.clientX, e.clientY);
    target.style.pointerEvents = prevPE;
    if (idx !== null) setOverIndex(idx);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (touchRef.current === null) return;
    const target = e.target as HTMLElement;
    const prevPE = target.style.pointerEvents;
    target.style.pointerEvents = "none";
    const idx = findIndexAtPoint(e.clientX, e.clientY);
    target.style.pointerEvents = prevPE;
    if (idx !== null) swapAt(touchRef.current.index, idx);
    touchRef.current = null;
    setDraggedIndex(null);
    setOverIndex(null);
  };
  const onPointerCancel = () => {
    touchRef.current = null;
    setDraggedIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-lg sm:left-auto sm:right-5 sm:mx-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-nanai-rose/40 bg-white/95 px-4 py-3 text-left shadow-nanai-soft backdrop-blur-md sm:w-auto sm:min-w-[17rem]"
        aria-expanded={open}
        aria-controls="theme-panel"
      >
        <span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-nanai-sage">
            {t("toggleLabel")}
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-nanai-ink">
            {t(getThemeById(active).labelKey)}
          </span>
        </span>
        <span className="flex gap-0.5" aria-hidden>
          {colorOrder.map((role, i) => (
            <span
              key={i}
              className="h-5 w-5 rounded-full ring-1 ring-black/10 first:rounded-l-lg last:rounded-r-lg sm:h-6 sm:w-6"
              style={{
                backgroundColor: getThemeById(active).colors[role],
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

          <div className="mb-3 space-y-3 rounded-xl border border-nanai-rose/25 bg-nanai-blush/25 p-3">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nanai-ink">{t("intensityLabel")}</span>
                <span className="text-[10px] text-nanai-ink-soft">{intensity}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={200}
                value={intensity}
                onChange={(e) => handleIntensity(parseInt(e.target.value, 10))}
                className="w-full accent-nanai-sage"
                aria-label={t("intensityLabel")}
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nanai-ink">{t("contrastLabel")}</span>
                <span className="text-[10px] text-nanai-ink-soft">{contrast}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={200}
                value={contrast}
                onChange={(e) => handleContrast(parseInt(e.target.value, 10))}
                className="w-full accent-nanai-sage"
                aria-label={t("contrastLabel")}
              />
            </div>
          </div>

          <div className="mb-3 rounded-xl border border-nanai-rose/25 bg-nanai-blush/25 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nanai-ink">
                {t("orderLabel")}
              </span>
              <button
                type="button"
                onClick={resetOrder}
                className="text-[10px] font-medium text-nanai-ink-soft underline hover:text-nanai-ink"
              >
                {t("orderReset")}
              </button>
            </div>
            <div className="relative">
              {(() => {
                const focus = overIndex ?? hoveredIndex;
                if (focus === null) return null;
                const role = colorOrder[focus];
                return (
                  <div
                    className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-md bg-nanai-ink px-2 py-1 text-center shadow-md"
                    role="tooltip"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      {t(`roles.${role}`)}
                    </div>
                    <div className="text-[10px] text-white/80">{t(`roleHints.${role}`)}</div>
                  </div>
                );
              })()}
              <div className="flex gap-1.5 touch-none select-none">
                {colorOrder.map((role, i) => (
                  <div
                    key={i}
                    data-swatch-index={i}
                    onPointerDown={(e) => onPointerDown(e, i)}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerCancel}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={[
                      "h-8 flex-1 rounded-md ring-1 ring-black/10 cursor-grab active:cursor-grabbing transition-transform touch-none select-none",
                      draggedIndex === i ? "opacity-40 scale-95" : "",
                      overIndex === i && draggedIndex !== i ? "ring-2 ring-nanai-sage scale-110" : "",
                      hoveredIndex === i && draggedIndex === null ? "ring-2 ring-nanai-ink/40" : "",
                    ].join(" ")}
                    style={{ backgroundColor: getThemeById(active).colors[role] }}
                    aria-label={`${t(`roles.${role}`)}: ${t(`roleHints.${role}`)}`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-1.5 text-[10px] leading-snug text-nanai-ink-soft">{t("orderHint")}</p>
          </div>

          <div className="mb-3 space-y-3 rounded-xl border border-nanai-rose/25 bg-nanai-blush/25 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-nanai-ink">
                {t("typographyLabel")}
              </span>
              <button
                type="button"
                onClick={() => {
                  handleHeadingFont("");
                  handleBodyFont("");
                }}
                className="text-[10px] font-medium text-nanai-ink-soft underline hover:text-nanai-ink"
              >
                {t("orderReset")}
              </button>
            </div>
            <label className="block">
              <span className="mb-1 block text-[10px] font-medium text-nanai-ink-soft">
                {t("headingFontLabel")}
              </span>
              <select
                value={headingFont ?? ""}
                onChange={(e) => handleHeadingFont(e.target.value)}
                className="w-full rounded-md border border-nanai-rose/30 bg-white px-2 py-1.5 text-xs text-nanai-ink focus:outline-none focus:ring-2 focus:ring-nanai-sage/50"
                style={{ fontFamily: headingFont ? `var(${headingFont})` : undefined }}
              >
                <option value="">{t("fontDefault")}</option>
                {FONT_OPTIONS.map((f) => (
                  <option key={f.var} value={f.var} style={{ fontFamily: `var(${f.var})` }}>
                    {f.label} — {f.sample}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-medium text-nanai-ink-soft">
                {t("bodyFontLabel")}
              </span>
              <select
                value={bodyFont ?? ""}
                onChange={(e) => handleBodyFont(e.target.value)}
                className="w-full rounded-md border border-nanai-rose/30 bg-white px-2 py-1.5 text-xs text-nanai-ink focus:outline-none focus:ring-2 focus:ring-nanai-sage/50"
                style={{ fontFamily: bodyFont ? `var(${bodyFont})` : undefined }}
              >
                <option value="">{t("fontDefault")}</option>
                {FONT_OPTIONS.map((f) => (
                  <option key={f.var} value={f.var} style={{ fontFamily: `var(${f.var})` }}>
                    {f.label} — {f.sample}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-nanai-sage/40 bg-nanai-sage/10 px-3 py-2 text-xs font-semibold text-nanai-ink transition hover:bg-nanai-sage/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
              <path d="M10 3a.75.75 0 0 1 .75.75v7.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V3.75A.75.75 0 0 1 10 3Z" />
              <path d="M3.75 14a.75.75 0 0 1 .75.75V16a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1.25a.75.75 0 0 1 1.5 0V16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.25A.75.75 0 0 1 3.75 14Z" />
            </svg>
            {t("saveLabel")}
          </button>

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
  );
}
