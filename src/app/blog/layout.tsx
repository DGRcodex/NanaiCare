import Link from "next/link";
import Image from "next/image";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-nanai-canvas flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-nanai-canvas/80 backdrop-blur-md border-b border-nanai-blush/30">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image 
            src="/nanai-logo-h-amsterdam.png" 
            alt="NanaiCare Amsterdam" 
            width={180} 
            height={60} 
            className="h-8 w-auto object-contain"
          />
        </Link>
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-nanai-sage hover:text-nanai-ink transition-colors">
          ← Back to Site
        </Link>
      </header>
      
      <main className="flex-1 w-full relative">
        {children}
      </main>
    </div>
  );
}
