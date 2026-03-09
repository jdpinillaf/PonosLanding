'use client';

import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

const nums = ['01', '02', '03'];

export default function ComoFunciona() {
  const { t, tArray } = useTranslation();
  const steps = tArray<{ title: string; description: string }>('comoFunciona.steps');

  return (
    <section id="how-it-works" className="bg-sand/50 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            {t('comoFunciona.title')}
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-amber/20 to-transparent md:block" />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className="relative text-center">
                  <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-amber/10" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber text-xl font-bold text-white shadow-lg shadow-amber/20">
                      {nums[i]}
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-carbon">
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
      </div>
    </section>
  );
}
