"use client";

import { useState } from "react";

interface ReviewFormProps {
  label: string;
  namePlaceholder: string;
  reviewPlaceholder: string;
  successMessage: string;
  errorMissingKey: string;
  errorNetwork: string;
}

export function ReviewForm({ label, namePlaceholder, reviewPlaceholder, successMessage, errorMissingKey, errorNetwork }: ReviewFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim() || "Anónimo",
          quote: content.trim(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setContent("");
        setName("");
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        const data = await response.json().catch(() => null);
        console.error("Failed to submit review", data);
        setErrorMsg(errorMissingKey);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMsg(errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      {submitted ? (
        <div className="rounded-2xl border border-nanai-sage/30 bg-nanai-sage/10 p-4 text-center text-sm font-medium text-nanai-ink">
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMsg && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
              {errorMsg}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-1/3">
              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={namePlaceholder}
                className="block w-full rounded-[1rem] border-0 bg-white/70 py-3 pl-4 pr-4 text-sm text-nanai-ink shadow-sm ring-1 ring-inset ring-nanai-rose/30 backdrop-blur focus:ring-2 focus:ring-inset focus:ring-nanai-sage/50 sm:leading-6"
              />
            </div>
            <div className="flex-1 relative w-full">
              <label htmlFor="review" className="sr-only">
                {label}
              </label>
              <textarea
                id="review"
                rows={1}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={reviewPlaceholder}
                className="block w-full resize-none rounded-[1rem] border-0 bg-white/70 py-3 pl-4 pr-[110px] text-sm text-nanai-ink shadow-sm ring-1 ring-inset ring-nanai-rose/30 backdrop-blur focus:ring-2 focus:ring-inset focus:ring-nanai-sage/50 sm:leading-6"
              />
              <button
                type="submit"
                disabled={!content.trim() || isLoading}
                className="absolute right-2 top-2 bottom-2 inline-flex items-center justify-center rounded-[0.6rem] bg-nanai-ink px-3 sm:px-4 text-[10px] sm:text-xs font-semibold tracking-wide text-white transition hover:bg-nanai-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "..." : label}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
