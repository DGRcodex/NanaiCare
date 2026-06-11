export function Mark({ className, src = "/logolanding.jpeg" }: { className?: string; src?: string }) {
  return (
    <img 
      src={src} 
      alt="NanaiCare" 
      className={className} 
    />
  );
}
