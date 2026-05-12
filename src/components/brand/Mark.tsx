export function Mark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 28c6-14 22-18 28-10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 30c8-10 20-12 26-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path d="M22 18l6 8-6 3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M12 24h24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}
