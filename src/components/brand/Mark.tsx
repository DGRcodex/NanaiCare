export function Mark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="64" height="64" rx="10" fill="#1B1714" />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond','Playfair Display','Bodoni 72',Didot,Georgia,'Times New Roman',serif"
        fontSize="42"
        fontWeight="500"
        fontStyle="italic"
        fill="#EDE4D3"
        letterSpacing="-0.01em"
      >
        N
      </text>
      <rect x="22" y="50" width="20" height="1.2" fill="#C9A96E" opacity="0.85" />
    </svg>
  );
}
