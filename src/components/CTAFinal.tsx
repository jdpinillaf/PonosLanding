'use client';

import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

export default function CTAFinal() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-28">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-carbon px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
          <h2 className="relative font-lora text-3xl font-bold text-parchment sm:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-parchment/70">
            {t('cta.subtitle')}
          </p>
          <a
            href="#book"
            className="relative mt-8 inline-block rounded-xl bg-amber px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-light hover:shadow-xl hover:shadow-amber/30"
          >
            {t('cta.button')}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
