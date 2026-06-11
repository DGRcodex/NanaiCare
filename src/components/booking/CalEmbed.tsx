"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalEmbedProps {
  calLink?: string; // Example: "nanai-care-tuxi4k/60min"
  theme?: "light" | "dark" | "auto";
  config?: Record<string, any>;
}

export function CalEmbed({ calLink = "nanaicare", theme = "light", config = {} }: CalEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#E8D5C8" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-nanai-soft bg-nanai-canvas relative z-10 p-2 border border-nanai-blush">
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme, ...config }}
      />
    </div>
  );
}
