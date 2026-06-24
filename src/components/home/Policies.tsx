import { getTranslations } from "next-intl/server";
const CreditCard = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);

const CalendarClock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/></svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16.5 12"/></svg>
);

const HeartHandshake = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>
);

export async function Policies() {
  const t = await getTranslations("Policies");
  const items = t.raw("items") as { title: string; body: string }[];
  
  // Map icons based on index since the array order is consistent
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <CreditCard className="mb-4 h-6 w-6 text-nanai-sage" />;
      case 1: return <CalendarClock className="mb-4 h-6 w-6 text-nanai-sage" />;
      case 2: return <Clock className="mb-4 h-6 w-6 text-nanai-sage" />;
      case 3: return <HeartHandshake className="mb-4 h-6 w-6 text-nanai-sage" />;
      default: return null;
    }
  };

  return (
    <section id="policies" className="scroll-mt-28 border-y border-nanai-rose/25 bg-white/55 px-4 py-20 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-nanai-sage">{t("label")}</p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nanai-ink sm:text-4xl">{t("title")}</h2>
          <p className="text-sm leading-relaxed text-nanai-ink-soft">{t("subtitle")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-nanai-rose/30 bg-white/85 p-6 shadow-sm backdrop-blur"
            >
              {getIcon(index)}
              <h3 className="font-heading text-lg text-nanai-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-nanai-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
