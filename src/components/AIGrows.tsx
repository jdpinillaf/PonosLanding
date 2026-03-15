'use client';

import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

const OPACITY_STEPS = ['bg-amber/20', 'bg-amber/40', 'bg-amber/70', 'bg-amber'];
const TEXT_STEPS = ['text-amber/60', 'text-amber/70', 'text-amber/85', 'text-amber'];

export default function AIGrows() {
  const { t, tArray } = useTranslation();
  const items = tArray<{ time: string; title: string; description: string }>('aiGrows.items');

  return (
    <section className="bg-sand/50 px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-amber">
            {t('aiGrows.sectionLabel')}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            {t('aiGrows.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-warm-gray">
            {t('aiGrows.subtitle')}
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-amber/10 via-amber/40 to-amber sm:left-8" />

          <div className="space-y-10">
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="relative flex gap-5 sm:gap-7">
                  {/* Timeline dot — grows in opacity */}
                  <div className="relative z-10 flex shrink-0 items-start pt-1">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full sm:h-16 sm:w-16 ${OPACITY_STEPS[i]}`}>
                      <span className={`font-lora text-xs font-bold sm:text-sm ${i === 3 ? 'text-white' : TEXT_STEPS[i]}`}>
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 rounded-2xl border border-sand bg-white/50 p-5 hover:border-amber/20 hover:shadow-lg hover:shadow-amber/5 sm:p-6" style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                    <h3 className="font-lora text-lg font-bold text-carbon">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
