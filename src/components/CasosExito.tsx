'use client';

import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

export default function CasosExito() {
  const { t, tArray } = useTranslation();
  const casos = tArray<{ name: string; sector: string; quote: string }>('casos.items');

  return (
    <section id="success-stories" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            {t('casos.title')}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {casos.map((c, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className="group rounded-2xl border border-sand bg-white/50 p-8 hover:scale-[1.02] hover:border-amber/20 hover:shadow-lg hover:shadow-amber/5" style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <div className="mb-4 font-lora text-4xl leading-none text-amber/30">
                  &ldquo;
                </div>
                <p className="mb-8 text-base leading-relaxed text-carbon">
                  {c.quote}
                </p>
                <div className="flex items-center gap-3 border-t border-sand pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/10 font-lora text-sm font-bold text-amber">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-carbon">{c.name}</p>
                    <p className="text-xs text-warm-gray">{c.sector}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
