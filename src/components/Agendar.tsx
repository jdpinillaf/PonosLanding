'use client';

import Script from 'next/script';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

export default function Agendar() {
  const { t } = useTranslation();

  return (
    <section id="book" className="bg-sand/50 px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            {t('agendar.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-warm-gray">
            {t('agendar.subtitle')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/jdpf1803/30min"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </ScrollReveal>
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
