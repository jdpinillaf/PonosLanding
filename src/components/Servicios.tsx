'use client';

import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

const icons = ['\u{1F916}', '\u{1F4B0}', '\u{1F9E0}', '\u{1F4C8}', '\u{1F4E3}'];
const soonIndexes = [3, 4];

export default function Servicios() {
  const { t, tArray } = useTranslation();
  const items = tArray<{ title: string; description: string }>('servicios.items');

  return (
    <section id="services" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            {t('servicios.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-warm-gray">
            {t('servicios.subtitle')}
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <ScrollReveal key={i} delay={i * 100} className="h-full">
              <div className="group relative h-full rounded-2xl border border-sand bg-white/50 p-7 hover:-translate-y-1 hover:scale-[1.02] hover:border-amber/30 hover:shadow-xl hover:shadow-amber/5" style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                {soonIndexes.includes(i) && (
                  <span className="absolute right-4 top-4 rounded-full bg-amber/10 px-3 py-1 text-xs font-medium text-amber">
                    {t('servicios.comingSoon')}
                  </span>
                )}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-2xl transition-transform duration-300 group-hover:scale-110">
                  {icons[i]}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-carbon">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-warm-gray">
                  {s.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
