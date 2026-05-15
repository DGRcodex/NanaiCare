export type NanaiThemeId =
  | "sacred-sound"
  | "sunset"
  | "twilight"
  | "amma"
  | "nanai-ritual"
  | "canal-calm";

/** Six roles: canvas, blush, rose, sage, ink, accent */
export type ThemeColors = {
  canvas: string;
  blush: string;
  rose: string;
  sage: string;
  ink: string;
  accent: string;
};

export type NanaiTheme = {
  id: NanaiThemeId;
  labelKey: string;
  hintKey: string;
  colors: ThemeColors;
  fonts: {
    headingVar: string;
    bodyVar: string;
  };
};

export const NANAI_THEMES: NanaiTheme[] = [
  {
    id: "sacred-sound",
    labelKey: "sacredSound",
    hintKey: "sacredSoundHint",
    colors: {
      canvas: "#FFFFFF",
      blush: "#F1D8D8",
      rose: "#CBAEAE",
      sage: "#B4AA86",
      ink: "#464C50",
      accent: "#8F8468",
    },
    fonts: { headingVar: "--font-oswald", bodyVar: "--font-quicksand" },
  },
  {
    id: "sunset",
    labelKey: "sunset",
    hintKey: "sunsetHint",
    colors: {
      canvas: "#FBF6F2",
      blush: "#F5E6DC",
      rose: "#F0C5B4",
      sage: "#7C566D",
      ink: "#2E425D",
      accent: "#C97B6E",
    },
    fonts: { headingVar: "--font-cormorant", bodyVar: "--font-josefin" },
  },
  {
    id: "twilight",
    labelKey: "twilight",
    hintKey: "twilightHint",
    colors: {
      canvas: "#F8F6F4",
      blush: "#EDE8E4",
      rose: "#F0C5B4",
      sage: "#92B7B7",
      ink: "#4A3D45",
      accent: "#F9A57F",
    },
    fonts: { headingVar: "--font-josefin", bodyVar: "--font-nunito" },
  },
  {
    id: "amma",
    labelKey: "amma",
    hintKey: "ammaHint",
    colors: {
      canvas: "#F5F0E8",
      blush: "#E8D5C8",
      rose: "#C9A99A",
      sage: "#9E6B5C",
      ink: "#3D2E32",
      accent: "#6B4A5A",
    },
    fonts: { headingVar: "--font-playfair", bodyVar: "--font-josefin" },
  },
  {
    id: "nanai-ritual",
    labelKey: "nanaiRitual",
    hintKey: "nanaiRitualHint",
    colors: {
      canvas: "#FFFBFA",
      blush: "#F4E4E4",
      rose: "#D4A5A5",
      sage: "#A8B89A",
      ink: "#3F4548",
      accent: "#C49A6C",
    },
    fonts: { headingVar: "--font-lora", bodyVar: "--font-quicksand" },
  },
  {
    id: "canal-calm",
    labelKey: "canalCalm",
    hintKey: "canalCalmHint",
    colors: {
      canvas: "#F7F8F7",
      blush: "#E8ECEA",
      rose: "#C5CCC4",
      sage: "#8B9A8E",
      ink: "#3A403D",
      accent: "#6B7F8A",
    },
    fonts: { headingVar: "--font-instrument", bodyVar: "--font-dm-sans" },
  },
];

export const DEFAULT_THEME_ID: NanaiThemeId = "sacred-sound";

export const THEME_STORAGE_KEY = "nanaicare-theme";

export function getThemeById(id: string): NanaiTheme {
  return NANAI_THEMES.find((t) => t.id === id) ?? NANAI_THEMES[0];
}

export const COLOR_ROLE_KEYS = ["canvas", "blush", "rose", "sage", "ink", "accent"] as const;
