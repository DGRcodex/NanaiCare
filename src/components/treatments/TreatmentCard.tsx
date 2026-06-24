"use client";

import { useState } from "react";
import { TreatmentItem } from "@/content/treatments";
import { Link } from "@/i18n/navigation";

interface Props {
  item: TreatmentItem;
  locale: string;
  variant?: "catalog" | "preview";
}

export function TreatmentCard({ item, locale, variant = "catalog" }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const description = locale === "es" && item.descriptionEs ? item.descriptionEs : item.descriptionEn;

  // Different base styles depending on where it's rendered
  const baseClasses = variant === "catalog" 
    ? "group flex flex-col rounded-3xl border border-white/40 bg-white/60 px-6 py-5 shadow-sm ring-1 ring-nanai-rose/10 backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-md hover:ring-nanai-rose/30 cursor-pointer overflow-hidden"
    : "group flex flex-col border-b border-nanai-rose/15 py-3 last:border-0 last:pb-0 transition-all duration-300 cursor-pointer overflow-hidden";

  const headerLayout = variant === "catalog"
    ? "flex items-start justify-between gap-4"
    : "flex items-start justify-between gap-3";

  return (
    <li className={baseClasses} onClick={() => setIsOpen(!isOpen)}>
      <div className={headerLayout}>
        <div className="flex flex-col gap-1 pr-4">
          <div className="flex items-center gap-2">
            <span className={`font-heading font-medium text-nanai-ink transition-colors group-hover:text-nanai-accent ${variant === 'catalog' ? 'text-lg' : 'text-base'}`}>
              {item.name}
            </span>
            <svg 
              className={`h-4 w-4 text-nanai-rose/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {variant === "catalog" && (
            <span className="text-xs text-nanai-ink-soft opacity-0 transition-opacity group-hover:opacity-100 mt-1">
              {isOpen ? (locale === "es" ? "Cerrar" : "Close") : (locale === "es" ? "Leer más / Agendar" : "Read more / Book")}
            </span>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {item.price ? (
            <span className={`font-bold text-nanai-ink ${variant === 'catalog' ? 'text-base' : 'text-sm'}`}>
              €{item.price}
            </span>
          ) : null}
          {item.duration ? (
            <span className={`rounded-full font-bold uppercase text-nanai-sage ${variant === 'catalog' ? 'bg-nanai-blush/40 px-3 py-1 text-[10px] tracking-[0.15em]' : 'bg-nanai-sage/10 px-2 py-0.5 text-[9px] tracking-[0.12em]'}`}>
              {item.duration}
            </span>
          ) : null}
        </div>
      </div>

      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-2">
            <div className={`prose prose-sm max-w-none text-nanai-ink-soft leading-relaxed ${variant === 'preview' ? 'text-sm' : ''}`}>
              {description ? (
                <p>{description}</p>
              ) : (
                <p className="italic opacity-60">Description coming soon...</p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href="/book"
                onClick={(e) => e.stopPropagation()} // Prevent accordion toggle when clicking book
                className={`inline-flex items-center justify-center rounded-full bg-nanai-accent px-6 py-2.5 font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-nanai-ink hover:shadow-md ${variant === 'catalog' ? 'text-[10px]' : 'text-[9px]'}`}
              >
                {locale === "es" ? "Agendar Ahora" : "Book Now"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
