"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
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

// Background Types
export type SlotConfig = {
  image: string | null;
  name: string | null;
};

export type TargetConfig = {
  source: string; // "none" | "slot-1" | ... | "slot-10"
  opacity: number;
  overlay: number;
  blur: number;
  blend: string;
  attachment: string;
};

const DEFAULT_SLOTS: SlotConfig[] = Array.from({ length: 10 }, () => ({
  image: null,
  name: null,
}));

const DEFAULT_TARGETS: TargetConfig[] = Array.from({ length: 10 }, (_, idx) => ({
  source: idx < 3 ? `slot-${idx + 1}` : "none", // Hero, Catálogo, Políticas map to slots 1, 2, 3 by default
  opacity: 30,
  overlay: 60,
  blur: 0,
  blend: "normal",
  attachment: "fixed",
}));

// Local storage keys v2
const BG_SLOTS_STORAGE_KEY = "nanaicare-bg-slots-v2";
const BG_TARGETS_STORAGE_KEY = "nanaicare-bg-targets-v2";
const BG_ENABLED_STORAGE_KEY = "nanaicare-bg-enabled-v2";

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
  const pathname = usePathname();
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
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [bgSectionOpen, setBgSectionOpen] = useState(false);

  // Background states (v2: state array + settings per target layer)
  const [bgSlots, setBgSlots] = useState<SlotConfig[]>(DEFAULT_SLOTS);
  const [bgTargets, setBgTargets] = useState<TargetConfig[]>(DEFAULT_TARGETS);
  const [bgEnabled, setBgEnabled] = useState<boolean>(true);
  const [activeConfigTarget, setActiveConfigTarget] = useState<number>(0); // active target to configure (0-9)
  const [bgActiveTab, setBgActiveTab] = useState<"images" | "layers">("images");

  const touchRef = useRef<{ index: number } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as NanaiThemeId | null;
    if (stored && NANAI_THEMES.some((th) => th.id === stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

    // Background loaders v2
    const storedBgEnabled = localStorage.getItem(BG_ENABLED_STORAGE_KEY);
    if (storedBgEnabled !== null) {
      setBgEnabled(storedBgEnabled === "true");
    }

    const storedSlots = localStorage.getItem(BG_SLOTS_STORAGE_KEY);
    const storedTargets = localStorage.getItem(BG_TARGETS_STORAGE_KEY);

    if (storedSlots) {
      try {
        setBgSlots(JSON.parse(storedSlots));
      } catch {
        // ignore
      }
    }
    if (storedTargets) {
      try {
        setBgTargets(JSON.parse(storedTargets));
      } catch {
        // ignore
      }
    }

    // Migration from v1 if v2 data is missing
    if (!storedSlots && !storedTargets) {
      const v1Slots: SlotConfig[] = Array.from({ length: 10 }, () => ({ image: null, name: null }));
      const v1Targets: TargetConfig[] = Array.from({ length: 10 }, (_, idx) => ({
        source: idx < 3 ? `slot-${idx + 1}` : "none",
        opacity: 30,
        overlay: 60,
        blur: 0,
        blend: "normal",
        attachment: "fixed",
      }));

      // Load v1 slots
      for (let i = 1; i <= 10; i++) {
        const img = localStorage.getItem(`nanaicare-bg-slot-${i}`);
        const name = localStorage.getItem(`nanaicare-bg-slot-${i}-name`);
        if (img) v1Slots[i - 1] = { image: img, name: name || `Fondo ${i}` };
      }

      // Load v1 globals
      const v1Mode = localStorage.getItem("nanaicare-bg-mode") || "section";
      const v1Opacity = parseInt(localStorage.getItem("nanaicare-bg-opacity") || "30", 10);
      const v1Overlay = parseInt(localStorage.getItem("nanaicare-bg-overlay") || "60", 10);
      const v1Blur = parseInt(localStorage.getItem("nanaicare-bg-blur") || "0", 10);
      const v1Blend = localStorage.getItem("nanaicare-bg-blend") || "normal";
      const v1Attachment = localStorage.getItem("nanaicare-bg-attachment") || "fixed";

      if (v1Mode === "none") {
        setBgEnabled(false);
        localStorage.setItem(BG_ENABLED_STORAGE_KEY, "false");
      }

      // Apply v1 globals to targets
      v1Targets.forEach((tConfig, idx) => {
        tConfig.opacity = v1Opacity;
        tConfig.overlay = v1Overlay;
        tConfig.blur = v1Blur;
        tConfig.blend = v1Blend;
        tConfig.attachment = v1Attachment;

        // Map sources based on old modes
        if (v1Mode === "section") {
          if (idx === 0) tConfig.source = v1Slots[0].image ? "slot-1" : "none";
          else if (idx === 1) tConfig.source = v1Slots[1].image ? "slot-2" : "none";
          else if (idx === 2) tConfig.source = v1Slots[2].image ? "slot-3" : "none";
          else tConfig.source = "none";
        } else if (v1Mode === "dynamic") {
          if (idx === 7) tConfig.source = v1Slots[7].image ? "slot-8" : (v1Slots[1].image ? "slot-2" : "none");
          else if (idx === 8) tConfig.source = v1Slots[8].image ? "slot-9" : (v1Slots[2].image ? "slot-3" : "none");
          else if (idx === 9) tConfig.source = v1Slots[9].image ? "slot-10" : (v1Slots[0].image ? "slot-1" : "none");
          else tConfig.source = "none";
        } else if (v1Mode.startsWith("static-")) {
          const slotNum = parseInt(v1Mode.split("-")[1], 10);
          tConfig.source = `slot-${slotNum}`;
        }
      });

      setBgSlots(v1Slots);
      setBgTargets(v1Targets);
      localStorage.setItem(BG_SLOTS_STORAGE_KEY, JSON.stringify(v1Slots));
      localStorage.setItem(BG_TARGETS_STORAGE_KEY, JSON.stringify(v1Targets));
    }

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<NanaiThemeId>).detail;
      if (detail) setActive(detail);
    };
    window.addEventListener("nanaicare-theme-change", onChange);
    return () => window.removeEventListener("nanaicare-theme-change", onChange);
  }, []);

  // Apply intensity + contrast filter only to the landing content (not the panel itself).
  useEffect(() => {
    const target = document.getElementById("nanai-content");
    if (target) {
      target.style.filter = `saturate(${intensity}%) contrast(${contrast}%)`;
    }
    // Clear any stale filter on the documentElement from earlier builds.
    document.documentElement.style.filter = "";
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

  // Helper to get active pathname without locale
  const getCleanPath = () => {
    if (!pathname) return "/";
    return pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
  };

  const cleanPath = getCleanPath();

  // Apply background variables dynamically based on pathname and target-level configs
  useEffect(() => {
    const targetEl = document.getElementById("nanai-content");
    if (!targetEl) return;

    if (!bgEnabled) {
      // Backgrounds disabled globally - clear all properties
      targetEl.style.removeProperty("--nanai-bg-image");
      targetEl.style.removeProperty("--nanai-bg-opacity");
      targetEl.style.removeProperty("--nanai-bg-overlay-pct");
      targetEl.style.removeProperty("--nanai-bg-blur");
      targetEl.style.removeProperty("--nanai-bg-blend");
      targetEl.style.removeProperty("--nanai-bg-attachment");

      for (let i = 1; i <= 7; i++) {
        targetEl.style.removeProperty(`--nanai-bg-image-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-opacity-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-blur-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-overlay-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-blend-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-attachment-${i}`);
      }
      return;
    }

    // Resolve general/page background target
    let activePageTargetIdx = 9; // Default is Target 10 (Fondo General de Inicio, index 9)
    if (cleanPath === "/treatments") {
      activePageTargetIdx = 7; // Target 8 (index 7)
    } else if (cleanPath === "/charter") {
      activePageTargetIdx = 8; // Target 9 (index 8)
    }

    const pageTargetConfig = bgTargets[activePageTargetIdx];
    const pageSlotIdx = pageTargetConfig.source.startsWith("slot-")
      ? parseInt(pageTargetConfig.source.split("-")[1], 10) - 1
      : -1;
    const pageImage = pageSlotIdx >= 0 ? bgSlots[pageSlotIdx]?.image : null;

    if (pageImage) {
      targetEl.style.setProperty("--nanai-bg-image", `url(${pageImage})`);
      targetEl.style.setProperty("--nanai-bg-opacity", String(pageTargetConfig.opacity / 100));
      targetEl.style.setProperty("--nanai-bg-overlay-pct", `${pageTargetConfig.overlay}%`);
      targetEl.style.setProperty("--nanai-bg-blur", `${pageTargetConfig.blur}px`);
      targetEl.style.setProperty("--nanai-bg-blend", pageTargetConfig.blend);
      targetEl.style.setProperty("--nanai-bg-attachment", pageTargetConfig.attachment);
    } else {
      targetEl.style.removeProperty("--nanai-bg-image");
      targetEl.style.removeProperty("--nanai-bg-opacity");
      targetEl.style.removeProperty("--nanai-bg-overlay-pct");
      targetEl.style.removeProperty("--nanai-bg-blur");
      targetEl.style.removeProperty("--nanai-bg-blend");
      targetEl.style.removeProperty("--nanai-bg-attachment");
    }

    // Resolve and apply section backgrounds on Home page only
    const isHome = cleanPath === "/";
    for (let i = 1; i <= 7; i++) {
      const sectionTargetConfig = bgTargets[i - 1]; // Hero (0) to Roadmap (6)
      const secSlotIdx = sectionTargetConfig.source.startsWith("slot-")
        ? parseInt(sectionTargetConfig.source.split("-")[1], 10) - 1
        : -1;
      const sectionImage = secSlotIdx >= 0 ? bgSlots[secSlotIdx]?.image : null;

      if (isHome && sectionImage) {
        targetEl.style.setProperty(`--nanai-bg-image-${i}`, `url(${sectionImage})`);
        targetEl.style.setProperty(`--nanai-section-bg-opacity-${i}`, String(sectionTargetConfig.opacity / 100));
        targetEl.style.setProperty(`--nanai-section-bg-blur-${i}`, `${sectionTargetConfig.blur}px`);
        targetEl.style.setProperty(`--nanai-section-bg-overlay-${i}`, `${sectionTargetConfig.overlay}%`);
        targetEl.style.setProperty(`--nanai-section-bg-blend-${i}`, sectionTargetConfig.blend);
        targetEl.style.setProperty(`--nanai-section-bg-attachment-${i}`, sectionTargetConfig.attachment);
      } else {
        targetEl.style.removeProperty(`--nanai-bg-image-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-opacity-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-blur-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-overlay-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-blend-${i}`);
        targetEl.style.removeProperty(`--nanai-section-bg-attachment-${i}`);
      }
    }
  }, [bgEnabled, bgSlots, bgTargets, cleanPath]);

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

  // Background state persistence helpers
  const saveSlotsToStorage = (nextSlots: SlotConfig[]) => {
    setBgSlots(nextSlots);
    try {
      localStorage.setItem(BG_SLOTS_STORAGE_KEY, JSON.stringify(nextSlots));
    } catch (err) {
      console.log("Failed to save background slots to localStorage:", err);
    }
  };

  const saveTargetsToStorage = (nextTargets: TargetConfig[]) => {
    setBgTargets(nextTargets);
    try {
      localStorage.setItem(BG_TARGETS_STORAGE_KEY, JSON.stringify(nextTargets));
    } catch (err) {
      console.log("Failed to save background targets to localStorage:", err);
    }
  };

  const handleBgEnabledChange = (enabled: boolean) => {
    setBgEnabled(enabled);
    localStorage.setItem(BG_ENABLED_STORAGE_KEY, String(enabled));
  };

  // Background state handlers
  const handleBgSlotUpload = (slotIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Safe diagnostic log
    console.log(`[Upload] File details: Name=${file.name}, Type=${file.type || "unknown"}, Size=${(file.size / 1024 / 1024).toFixed(3)}MB`);

    if (file.size === 0) {
      alert(`El archivo "${file.name}" se cargó con 0 bytes. En macOS, esto suele ocurrir si el navegador no tiene permisos para leer la carpeta seleccionada (Escritorio, Documentos, iCloud). Mueve la imagen a la carpeta "Descargas" e inténtalo de nuevo.`);
      e.target.value = "";
      return;
    }

    const isHeic = 
      file.name.toLowerCase().endsWith(".heic") || 
      file.name.toLowerCase().endsWith(".heif") || 
      file.type === "image/heic" || 
      file.type === "image/heif";

    if (isHeic) {
      alert("Los navegadores web no soportan el formato de fotos de iPhone/Mac (HEIC/HEIF) de manera nativa. Por favor, convierte la imagen a JPG, PNG o WebP e intenta subirla de nuevo.");
      e.target.value = "";
      return;
    }

    const processCanvasAndSave = (imageSource: HTMLImageElement | ImageBitmap) => {
      const canvas = document.createElement("canvas");
      let width = imageSource instanceof ImageBitmap ? imageSource.width : imageSource.naturalWidth || imageSource.width;
      let height = imageSource instanceof ImageBitmap ? imageSource.height : imageSource.naturalHeight || imageSource.height;

      const MAX_WIDTH = 1400;
      const MAX_HEIGHT = 1400;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        } else {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(imageSource, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
        
        const nextSlots = [...bgSlots];
        nextSlots[slotIdx] = { image: compressedDataUrl, name: file.name };
        saveSlotsToStorage(nextSlots);
      }
    };

    if (typeof window !== "undefined" && typeof window.createImageBitmap === "function") {
      window.createImageBitmap(file)
        .then((bitmap) => {
          console.log(`[Upload] Method 1 (createImageBitmap) succeeded for "${file.name}"`);
          processCanvasAndSave(bitmap);
          bitmap.close();
        })
        .catch((err) => {
          console.log(`[Upload] Method 1 (createImageBitmap) failed for "${file.name}":`, err);
          fallbackUploadMethod(file, slotIdx, processCanvasAndSave);
        });
    } else {
      fallbackUploadMethod(file, slotIdx, processCanvasAndSave);
    }

    e.target.value = "";
  };

  const fallbackUploadMethod = (file: File, slotIdx: number, processCanvasAndSave: (img: HTMLImageElement) => void) => {
    const blobUrl = URL.createObjectURL(file);
    const img = document.createElement("img");

    img.onload = () => {
      console.log(`[Upload] Method 2 (Blob URL + DOM img) succeeded for "${file.name}"`);
      processCanvasAndSave(img);
      URL.revokeObjectURL(blobUrl);
    };
    img.onerror = (err) => {
      console.log(`[Upload] Method 2 (Blob URL + DOM img) failed for "${file.name}":`, err);
      URL.revokeObjectURL(blobUrl);

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const fallbackImg = document.createElement("img");
        fallbackImg.onload = () => {
          console.log(`[Upload] Method 3 (FileReader + Base64 img) succeeded for "${file.name}"`);
          processCanvasAndSave(fallbackImg);
        };
        fallbackImg.onerror = (failEvent) => {
          console.log(`[Upload] Method 3 (FileReader fallback) also failed for "${file.name}".`, failEvent);
          alert(`No se pudo decodificar la imagen "${file.name}". Por favor, asegúrate de que es un archivo de imagen válido e intenta con otro archivo.`);
        };
        fallbackImg.src = dataUrl;
      };
      reader.readAsDataURL(file);
    };

    img.src = blobUrl;
  };

  const handleBgSlotPreset = (slotIdx: number, presetUrl: string) => {
    let presetName = "Preset";
    if (presetUrl.includes("bg_preset_1")) presetName = "Organic Flow (P1)";
    else if (presetUrl.includes("bg_preset_2")) presetName = "Warm Terracotta (P2)";
    else if (presetUrl.includes("bg_preset_3")) presetName = "Botanical Whisper (P3)";

    const nextSlots = [...bgSlots];
    nextSlots[slotIdx] = { image: presetUrl, name: presetName };
    saveSlotsToStorage(nextSlots);
  };

  const handleBgSlotClear = (slotIdx: number) => {
    const nextSlots = [...bgSlots];
    nextSlots[slotIdx] = { image: null, name: null };
    saveSlotsToStorage(nextSlots);
  };

  const updateTargetConfig = (targetIdx: number, updates: Partial<TargetConfig>) => {
    const nextTargets = [...bgTargets];
    nextTargets[targetIdx] = { ...nextTargets[targetIdx], ...updates };
    saveTargetsToStorage(nextTargets);
  };

  const buildAppliedColors = () => {
    const theme = getThemeById(active);
    return Object.fromEntries(
      COLOR_ROLE_KEYS.map((slot, i) => [slot, theme.colors[colorOrder[i]]])
    ) as Record<(typeof COLOR_ROLE_KEYS)[number], string>;
  };

  const buildJSONConfig = () => {
    const theme = getThemeById(active);
    const headVar = headingFont ?? theme.fonts.headingVar;
    const bodyVarValue = bodyFont ?? theme.fonts.bodyVar;
    return {
      brand: "NanaiCare",
      version: 2,
      theme: theme.id,
      intensity,
      contrast,
      colorOrder,
      appliedColors: buildAppliedColors(),
      fonts: { heading: headVar, body: bodyVarValue },
      backgroundV2: {
        enabled: bgEnabled,
        slots: bgSlots,
        targets: bgTargets,
      },
    };
  };

  const buildCSSSnippet = () => {
    const applied = buildAppliedColors();
    const theme = getThemeById(active);
    const headVar = headingFont ?? theme.fonts.headingVar;
    const bodyVarValue = bodyFont ?? theme.fonts.bodyVar;
    const lines: string[] = [];
    lines.push("/* NanaiCare — exported design tokens */");
    lines.push(":root {");
    Object.entries(applied).forEach(([slot, hex]) => {
      lines.push(`  --nanai-${slot}: ${hex};`);
    });
    lines.push(`  --font-theme-heading: var(${headVar}), system-ui, sans-serif;`);
    lines.push(`  --font-theme-body: var(${bodyVarValue}), system-ui, sans-serif;`);
    
    if (bgEnabled) {
      // Export section-specific backgrounds
      for (let i = 1; i <= 7; i++) {
        const tc = bgTargets[i - 1];
        const sIdx = tc.source.startsWith("slot-") ? parseInt(tc.source.split("-")[1], 10) - 1 : -1;
        const slotVal = sIdx >= 0 ? bgSlots[sIdx]?.image : null;
        if (slotVal) {
          lines.push(`  /* Sección ${i}: ${t(`bgTargetNames.target-${i}`)} */`);
          lines.push(`  --nanai-bg-image-${i}: url(${slotVal.startsWith("data:") ? `/* Custom Image */` : `"${slotVal}"`});`);
          lines.push(`  --nanai-section-bg-opacity-${i}: ${tc.opacity / 100};`);
          lines.push(`  --nanai-section-bg-overlay-${i}: ${tc.overlay}%;`);
          lines.push(`  --nanai-section-bg-blur-${i}: ${tc.blur}px;`);
          lines.push(`  --nanai-section-bg-blend-${i}: ${tc.blend};`);
          lines.push(`  --nanai-section-bg-attachment-${i}: ${tc.attachment};`);
        }
      }
      
      // Export general page backgrounds (Target 10 is default general)
      const t10 = bgTargets[9];
      const t10SlotIdx = t10.source.startsWith("slot-") ? parseInt(t10.source.split("-")[1], 10) - 1 : -1;
      const t10Image = t10SlotIdx >= 0 ? bgSlots[t10SlotIdx]?.image : null;
      if (t10Image) {
        lines.push(`  /* Fondo General de Inicio */`);
        lines.push(`  --nanai-bg-image: url(${t10Image.startsWith("data:") ? "/* Custom Image */" : `"${t10Image}"`});`);
        lines.push(`  --nanai-bg-opacity: ${t10.opacity / 100};`);
        lines.push(`  --nanai-bg-overlay-pct: ${t10.overlay}%;`);
        lines.push(`  --nanai-bg-blur: ${t10.blur}px;`);
        lines.push(`  --nanai-bg-blend: ${t10.blend};`);
        lines.push(`  --nanai-bg-attachment: ${t10.attachment};`);
      }
    }
    
    lines.push("}");
    lines.push("");
    lines.push(`html { filter: saturate(${intensity}%) contrast(${contrast}%); }`);
    return lines.join("\n");
  };

  const flashCopy = (label: string) => {
    setCopyStatus(label);
    window.setTimeout(() => setCopyStatus(null), 1500);
  };

  const handleCopyCSS = async () => {
    try {
      await navigator.clipboard.writeText(buildCSSSnippet());
      flashCopy(t("copiedCSS"));
    } catch {
      flashCopy(t("copyFailed"));
    }
  };

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(buildJSONConfig(), null, 2));
      flashCopy(t("copiedJSON"));
    } catch {
      flashCopy(t("copyFailed"));
    }
  };

  const handleImport = () => {
    const raw = window.prompt(t("importPrompt"));
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.theme && NANAI_THEMES.some((th) => th.id === parsed.theme)) {
        setTheme(parsed.theme);
        setActive(parsed.theme);
      }
      if (typeof parsed.intensity === "number") handleIntensity(parsed.intensity);
      if (typeof parsed.contrast === "number") handleContrast(parsed.contrast);
      if (Array.isArray(parsed.colorOrder) && parsed.colorOrder.length === DEFAULT_ORDER.length) {
        persistOrder(parsed.colorOrder as Role[]);
      }
      if (parsed.fonts?.heading) handleHeadingFont(parsed.fonts.heading);
      if (parsed.fonts?.body) handleBodyFont(parsed.fonts.body);

      // Support V2 background configuration structure
      if (parsed.backgroundV2) {
        const bg = parsed.backgroundV2;
        if (typeof bg.enabled === "boolean") handleBgEnabledChange(bg.enabled);
        if (Array.isArray(bg.slots)) saveSlotsToStorage(bg.slots);
        if (Array.isArray(bg.targets)) saveTargetsToStorage(bg.targets);
      } 
      // Backward compatibility load V1 import format
      else if (parsed.background) {
        const bg = parsed.background;
        const slotsImported = Array.from({ length: 10 }, () => ({ image: null, name: null })) as SlotConfig[];
        const targetsImported = Array.from({ length: 10 }, (_, idx) => ({
          source: idx < 3 ? `slot-${idx + 1}` : "none",
          opacity: typeof bg.bgOpacity === "number" ? bg.bgOpacity : 30,
          overlay: typeof bg.bgOverlay === "number" ? bg.bgOverlay : 60,
          blur: typeof bg.bgBlur === "number" ? bg.bgBlur : 0,
          blend: typeof bg.bgBlend === "string" ? bg.bgBlend : "normal",
          attachment: typeof bg.bgAttachment === "string" ? bg.bgAttachment : "fixed",
        }));

        for (let i = 1; i <= 10; i++) {
          const val = bg[`bgSlot${i}`];
          const name = bg[`bgSlot${i}Name`];
          if (typeof val !== "undefined") slotsImported[i - 1].image = val;
          if (typeof name !== "undefined") slotsImported[i - 1].name = name;
        }

        const oldMode = bg.bgMode || "section";
        if (oldMode === "none") {
          handleBgEnabledChange(false);
        } else {
          handleBgEnabledChange(true);
        }

        targetsImported.forEach((targetConfig, idx) => {
          if (oldMode === "section") {
            if (idx === 0) targetConfig.source = slotsImported[0].image ? "slot-1" : "none";
            else if (idx === 1) targetConfig.source = slotsImported[1].image ? "slot-2" : "none";
            else if (idx === 2) targetConfig.source = slotsImported[2].image ? "slot-3" : "none";
            else targetConfig.source = "none";
          } else if (oldMode === "dynamic") {
            if (idx === 7) targetConfig.source = slotsImported[7].image ? "slot-8" : "none";
            else if (idx === 8) targetConfig.source = slotsImported[8].image ? "slot-9" : "none";
            else if (idx === 9) targetConfig.source = slotsImported[9].image ? "slot-10" : "none";
            else targetConfig.source = "none";
          } else if (oldMode.startsWith("static-")) {
            const num = parseInt(oldMode.split("-")[1], 10);
            targetConfig.source = `slot-${num}`;
          }
        });

        saveSlotsToStorage(slotsImported);
        saveTargetsToStorage(targetsImported);
      }
      flashCopy(t("imported"));
    } catch {
      flashCopy(t("importFailed"));
    }
  };

  const handleDownload = () => {
    const theme = getThemeById(active);
    const themeName = t(theme.labelKey);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const lines: string[] = [];
    lines.push("NanaiCare — Configuracion de Fondos V2");
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
    
    lines.push("Estado General de Fondos:");
    lines.push(`  Habilitado: ${bgEnabled ? "SÍ" : "NO"}`);
    lines.push("");
    
    lines.push("Slots de Imágenes cargadas:");
    bgSlots.forEach((slot, i) => {
      lines.push(`  Fondo ${i + 1}: ${slot.name || "Sin asignar"}`);
    });
    lines.push("");
    
    lines.push("Diseño de Capas / Configuración de Áreas:");
    bgTargets.forEach((tc, idx) => {
      const areaName = t(`bgTargetNames.target-${idx + 1}`);
      lines.push(`  Área: ${areaName}`);
      lines.push(`    Origen de imagen: ${tc.source}`);
      lines.push(`    Opacidad: ${tc.opacity}%`);
      lines.push(`    Opacidad de capa (overlay): ${tc.overlay}%`);
      lines.push(`    Desenfoque (blur): ${tc.blur}px`);
      lines.push(`    Fusión (blend): ${tc.blend}`);
      lines.push(`    Desplazamiento (attachment): ${tc.attachment}`);
    });
    lines.push("");

    lines.push("Orden de colores (slot CSS = color asignado):");
    COLOR_ROLE_KEYS.forEach((slot, i) => {
      const sourceRole = colorOrder[i];
      const hex = theme.colors[sourceRole];
      lines.push(`  --nanai-${slot}: ${hex}  (origen: ${sourceRole})`);
    });
    lines.push("");

    lines.push("JSON:");
    lines.push(
      JSON.stringify(
        buildJSONConfig(),
        null,
        2
      )
    );

    const content = lines.join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nanaicare-config-v2-${theme.id}-${date.replace(/[: ]/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Drag via document-level pointer listeners — robust for mouse, touch & pen.
  const findIndexAtPoint = (x: number, y: number): number | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const idxAttr = el?.closest<HTMLElement>("[data-swatch-index]")?.dataset.swatchIndex;
    return idxAttr !== undefined ? parseInt(idxAttr, 10) : null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, i: number) => {
    e.preventDefault();
    const startIndex = i;
    touchRef.current = { index: startIndex };
    setDraggedIndex(startIndex);

    const handleMove = (ev: PointerEvent) => {
      ev.preventDefault();
      const idx = findIndexAtPoint(ev.clientX, ev.clientY);
      setOverIndex(idx);
    };
    const cleanup = () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleCancel);
    };
    const handleUp = (ev: PointerEvent) => {
      cleanup();
      const idx = findIndexAtPoint(ev.clientX, ev.clientY);
      if (idx !== null) swapAt(startIndex, idx);
      touchRef.current = null;
      setDraggedIndex(null);
      setOverIndex(null);
    };
    const handleCancel = () => {
      cleanup();
      touchRef.current = null;
      setDraggedIndex(null);
      setOverIndex(null);
    };

    document.addEventListener("pointermove", handleMove, { passive: false });
    document.addEventListener("pointerup", handleUp);
    document.addEventListener("pointercancel", handleCancel);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-lg sm:left-auto sm:right-5 sm:mx-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left shadow-lg backdrop-blur-md sm:w-auto sm:min-w-[17rem]"
        aria-expanded={open}
        aria-controls="theme-panel"
      >
        <span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {t("toggleLabel")}
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-slate-900">
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
          className="mt-2 max-h-[min(70vh,28rem)] overflow-y-auto rounded-2xl border border-slate-300 bg-white p-3 shadow-lg backdrop-blur-xl"
          role="listbox"
          aria-label={t("panelLabel")}
        >
          <p className="px-2 pb-2 text-xs leading-relaxed text-slate-500">{t("panelIntro")}</p>

          <div className="mb-3 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900">{t("intensityLabel")}</span>
                <span className="text-[10px] text-slate-500">{intensity}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={200}
                value={intensity}
                onChange={(e) => handleIntensity(parseInt(e.target.value, 10))}
                className="w-full accent-slate-500 cursor-pointer"
                aria-label={t("intensityLabel")}
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900">{t("contrastLabel")}</span>
                <span className="text-[10px] text-slate-500">{contrast}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={200}
                value={contrast}
                onChange={(e) => handleContrast(parseInt(e.target.value, 10))}
                className="w-full accent-slate-500 cursor-pointer"
                aria-label={t("contrastLabel")}
              />
            </div>
          </div>

          {/* BACKGROUND AND LAYERS CONTROL */}
          <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <button
              type="button"
              onClick={() => setBgSectionOpen((v) => !v)}
              className="flex w-full cursor-pointer items-center justify-between outline-none"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900 select-none">
                {t("backgroundSectionTitle")}
              </span>
              <span className={`text-slate-500 transition-transform duration-200 ${bgSectionOpen ? "rotate-180" : ""}`}>
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {bgSectionOpen && (
              <div className="mt-3 space-y-4 border-t border-slate-200/60 pt-3">
                {/* Enable/Disable Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-705">
                    {t("bgEnabledLabel")}
                  </span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={bgEnabled}
                      onChange={(e) => handleBgEnabledChange(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-5 w-9 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-600 peer-focus:outline-none dark:border-gray-650 dark:bg-gray-700 peer-checked:after:translate-x-full" />
                  </label>
                </div>

                {bgEnabled && (
                  <>
                    {/* Tab Navigation */}
                    <div className="flex rounded-lg bg-slate-100 p-0.5">
                      <button
                        type="button"
                        onClick={() => setBgActiveTab("images")}
                        className={`flex-1 rounded-md py-1 text-center text-xs font-semibold transition cursor-pointer ${
                          bgActiveTab === "images"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {t("bgTabImages")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setBgActiveTab("layers")}
                        className={`flex-1 rounded-md py-1 text-center text-xs font-semibold transition cursor-pointer ${
                          bgActiveTab === "layers"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {t("bgTabLayers")}
                      </button>
                    </div>

                    {/* Tab 1: Images (10 slots) */}
                    {bgActiveTab === "images" && (
                      <div className="space-y-2.5 max-h-[16rem] overflow-y-auto pr-1">
                        {bgSlots.map((slot, idx) => {
                          const slotNum = idx + 1;
                          const slotLabel = t(`bgSlot${slotNum}Label`);
                          const fileInputId = `bg-upload-${slotNum}`;

                          return (
                            <div key={idx} className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                              <div className="mb-1.5 flex items-center justify-between">
                                <span className="text-[10px] font-semibold text-slate-755">
                                  {slotLabel}
                                </span>
                                {slot.image && (
                                  <button
                                    type="button"
                                    onClick={() => handleBgSlotClear(idx)}
                                    className="text-[9px] font-semibold text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                                  >
                                    {t("bgClearButton")}
                                  </button>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Thumbnail */}
                                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
                                  {slot.image ? (
                                    <img
                                      src={slot.image}
                                      alt={`Fondo ${slotNum}`}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wider">Vacío</span>
                                  )}
                                </div>

                                <div className="flex-1 space-y-1">
                                  {/* Upload Button */}
                                  <div className="flex items-center gap-1.5">
                                    <label
                                      htmlFor={fileInputId}
                                      className="cursor-pointer rounded border border-slate-300 bg-slate-50 px-1.5 py-0.5 text-[9px] font-bold text-slate-700 hover:bg-slate-105 transition shadow-sm"
                                    >
                                      {t("bgUploadButton")}
                                    </label>
                                    <input
                                      id={fileInputId}
                                      type="file"
                                      accept="image/*"
                                      className="sr-only"
                                      onChange={(e) => handleBgSlotUpload(idx, e)}
                                    />
                                    <span className="text-[9px] text-slate-500 truncate max-w-[140px]" title={slot.name || ""}>
                                      {slot.name || "No asignado"}
                                    </span>
                                  </div>

                                  {/* Presets */}
                                  <div className="flex items-center gap-1">
                                    <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wider">{t("bgPresetLabel")}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleBgSlotPreset(idx, "/images/bg_preset_1.png")}
                                      className="rounded bg-slate-55 hover:bg-slate-150 border border-slate-300/65 px-1 py-0.5 text-[8px] font-semibold text-slate-650 shadow-sm cursor-pointer"
                                    >
                                      P1
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleBgSlotPreset(idx, "/images/bg_preset_2.png")}
                                      className="rounded bg-slate-55 hover:bg-slate-150 border border-slate-300/65 px-1 py-0.5 text-[8px] font-semibold text-slate-650 shadow-sm cursor-pointer"
                                    >
                                      P2
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleBgSlotPreset(idx, "/images/bg_preset_3.png")}
                                      className="rounded bg-slate-55 hover:bg-slate-150 border border-slate-300/65 px-1 py-0.5 text-[8px] font-semibold text-slate-650 shadow-sm cursor-pointer"
                                    >
                                      P3
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Tab 2: Adjust Layers */}
                    {bgActiveTab === "layers" && (
                      <div className="space-y-3 max-h-[16rem] overflow-y-auto pr-1">
                        {/* Target dropdown */}
                        <div>
                          <label className="block">
                            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-500">
                              {t("bgTargetSelectLabel")}
                            </span>
                            <select
                              value={activeConfigTarget}
                              onChange={(e) => setActiveConfigTarget(parseInt(e.target.value, 10))}
                              className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-905 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer font-semibold"
                            >
                              {Array.from({ length: 10 }).map((_, idx) => (
                                <option key={idx} value={idx}>
                                  {t(`bgTargetNames.target-${idx + 1}`)}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        {/* Source slot selection */}
                        <div>
                          <label className="block">
                            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-500">
                              {t("bgSourceSelectLabel")}
                            </span>
                            <select
                              value={bgTargets[activeConfigTarget].source}
                              onChange={(e) => updateTargetConfig(activeConfigTarget, { source: e.target.value })}
                              className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-905 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
                            >
                              <option value="none">{t("bgSourceNone")}</option>
                              {Array.from({ length: 10 }).map((_, idx) => {
                                const slotNum = idx + 1;
                                const slotLabel = t(`bgSlot${slotNum}Label`);
                                const slotName = bgSlots[idx]?.name ? ` (${bgSlots[idx].name})` : "";
                                return (
                                  <option key={idx} value={`slot-${slotNum}`}>
                                    {slotLabel}{slotName}
                                  </option>
                                );
                              })}
                            </select>
                          </label>
                        </div>

                        {/* Layer effects */}
                        <div className={`space-y-3.5 pt-2 border-t border-slate-200/40 transition-opacity duration-200 ${
                          bgTargets[activeConfigTarget].source === "none" ? "opacity-40 pointer-events-none" : ""
                        }`}>
                          {/* Opacity */}
                          <div>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-[10px] font-semibold text-slate-700">{t("bgOpacityLabel")}</span>
                              <span className="text-[10px] font-semibold text-slate-500">{bgTargets[activeConfigTarget].opacity}%</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={bgTargets[activeConfigTarget].opacity}
                              onChange={(e) => updateTargetConfig(activeConfigTarget, { opacity: parseInt(e.target.value, 10) })}
                              className="w-full accent-slate-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                              disabled={bgTargets[activeConfigTarget].source === "none"}
                            />
                          </div>

                          {/* Overlay Opacity */}
                          <div>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-[10px] font-semibold text-slate-700">{t("bgOverlayLabel")}</span>
                              <span className="text-[10px] font-semibold text-slate-500">{bgTargets[activeConfigTarget].overlay}%</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={bgTargets[activeConfigTarget].overlay}
                              onChange={(e) => updateTargetConfig(activeConfigTarget, { overlay: parseInt(e.target.value, 10) })}
                              className="w-full accent-slate-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                              disabled={bgTargets[activeConfigTarget].source === "none"}
                            />
                          </div>

                          {/* Blur */}
                          <div>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-[10px] font-semibold text-slate-700">{t("bgBlurLabel")}</span>
                              <span className="text-[10px] font-semibold text-slate-500">{bgTargets[activeConfigTarget].blur}px</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={40}
                              value={bgTargets[activeConfigTarget].blur}
                              onChange={(e) => updateTargetConfig(activeConfigTarget, { blur: parseInt(e.target.value, 10) })}
                              className="w-full accent-slate-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                              disabled={bgTargets[activeConfigTarget].source === "none"}
                            />
                          </div>

                          {/* Blend Mode */}
                          <div>
                            <label className="block">
                              <span className="mb-1 block text-[10px] font-semibold text-slate-500 uppercase tracking-[0.05em]">
                                {t("bgBlendLabel")}
                              </span>
                              <select
                                value={bgTargets[activeConfigTarget].blend}
                                onChange={(e) => updateTargetConfig(activeConfigTarget, { blend: e.target.value })}
                                className="w-full rounded-md border border-slate-305 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
                                disabled={bgTargets[activeConfigTarget].source === "none"}
                              >
                                <option value="normal">{t("bgBlendNormal")}</option>
                                <option value="multiply">{t("bgBlendMultiply")}</option>
                                <option value="overlay">{t("bgBlendOverlay")}</option>
                                <option value="luminosity">{t("bgBlendLuminosity")}</option>
                                <option value="soft-light">{t("bgBlendSoftLight")}</option>
                              </select>
                            </label>
                          </div>

                          {/* Scroll Attachment */}
                          <div>
                            <label className="block">
                              <span className="mb-1 block text-[10px] font-semibold text-slate-500 uppercase tracking-[0.05em]">
                                {t("bgAttachmentLabel")}
                              </span>
                              <select
                                value={bgTargets[activeConfigTarget].attachment}
                                onChange={(e) => updateTargetConfig(activeConfigTarget, { attachment: e.target.value })}
                                className="w-full rounded-md border border-slate-305 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
                                disabled={bgTargets[activeConfigTarget].source === "none"}
                              >
                                <option value="fixed">{t("bgAttachmentFixed")}</option>
                                <option value="scroll">{t("bgAttachmentScroll")}</option>
                              </select>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900">
                {t("orderLabel")}
              </span>
              <button
                type="button"
                onClick={resetOrder}
                className="text-[10px] font-medium text-slate-500 underline hover:text-slate-900"
              >
                {t("orderReset")}
              </button>
            </div>
            <div className="relative">
              {(() => {
                const focus = overIndex ?? hoveredIndex ?? draggedIndex;
                if (focus === null) return null;
                const isDragging = draggedIndex !== null;
                const role = isDragging ? colorOrder[draggedIndex] : colorOrder[focus];
                const total = colorOrder.length;
                const leftPercent = ((focus + 0.5) / total) * 100;
                return (
                  <div
                    className="pointer-events-none absolute -top-1.5 z-10 flex -translate-x-1/2 -translate-y-full items-center gap-1.5 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 shadow-md transition-[left] duration-150"
                    style={{ left: `${leftPercent}%` }}
                    role="tooltip"
                  >
                    {isDragging ? (
                      <span
                        className="inline-block h-3 w-3 rounded-full ring-1 ring-white/30"
                        style={{ backgroundColor: getThemeById(active).colors[role] }}
                      />
                    ) : null}
                    <span className="text-[11px] font-medium text-white">
                      {t(`roleHints.${role}`)}
                    </span>
                  </div>
                );
              })()}
              <div className="flex gap-1.5 touch-none select-none">
                {colorOrder.map((role, i) => (
                  <div
                    key={i}
                    data-swatch-index={i}
                    onPointerDown={(e) => onPointerDown(e, i)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={[
                      "h-10 flex-1 rounded-md ring-1 ring-black/10 cursor-grab active:cursor-grabbing transition-all duration-150 touch-none select-none",
                      draggedIndex === i ? "opacity-30 scale-90 ring-2 ring-slate-900/30" : "",
                      overIndex === i && draggedIndex !== i ? "ring-2 ring-slate-900 scale-110 shadow-md" : "",
                      hoveredIndex === i && draggedIndex === null ? "ring-2 ring-slate-400" : "",
                    ].join(" ")}
                    style={{ backgroundColor: getThemeById(active).colors[role] }}
                    aria-label={`${t(`roles.${role}`)}: ${t(`roleHints.${role}`)}`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-1.5 text-[10px] leading-snug text-slate-500">{t("orderHint")}</p>
          </div>

          <div className="mb-3 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900">
                {t("typographyLabel")}
              </span>
              <button
                type="button"
                onClick={() => {
                  handleHeadingFont("");
                  handleBodyFont("");
                }}
                className="text-[10px] font-medium text-slate-500 underline hover:text-slate-900"
              >
                {t("orderReset")}
              </button>
            </div>
            <label className="block">
              <span className="mb-1 block text-[10px] font-medium text-slate-500">
                {t("headingFontLabel")}
              </span>
              <select
                value={headingFont ?? ""}
                onChange={(e) => handleHeadingFont(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
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
              <span className="mb-1 block text-[10px] font-medium text-slate-500">
                {t("bodyFontLabel")}
              </span>
              <select
                value={bodyFont ?? ""}
                onChange={(e) => handleBodyFont(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
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

          <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900">
                {t("exportLabel")}
              </span>
              {copyStatus ? (
                <span className="text-[10px] font-medium text-emerald-700">{copyStatus}</span>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyCSS}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-900 transition hover:bg-slate-100 shadow-sm cursor-pointer"
              >
                {t("copyCSS")}
              </button>
              <button
                type="button"
                onClick={handleCopyJSON}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-900 transition hover:bg-slate-100 shadow-sm cursor-pointer"
              >
                {t("copyJSON")}
              </button>
              <button
                type="button"
                onClick={handleImport}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-900 transition hover:bg-slate-100 shadow-sm cursor-pointer"
              >
                {t("importJSON")}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-900 transition hover:bg-slate-100 shadow-sm cursor-pointer"
              >
                {t("downloadTxt")}
              </button>
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
                      "w-full rounded-xl px-3 py-2.5 text-left transition cursor-pointer shadow-sm border border-slate-200/50",
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "hover:bg-slate-100 bg-white text-slate-900",
                    ].join(" ")}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span>
                        <span className="block text-sm font-semibold">{t(theme.labelKey)}</span>
                        <span
                          className={[
                            "mt-0.5 block text-[11px] leading-snug",
                            isActive ? "text-white/80" : "text-slate-500",
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
