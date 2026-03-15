'use client';

import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

const icons = [
  // Shield with lock — data stays in your systems
  <svg key="shield" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  // Key — minimal access
  <svg key="key" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>,
  // Arrow right on rectangle — no lock-in
  <svg key="unlock" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>,
  // Eye — transparency
  <svg key="eye" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

export default function TrustSecurity() {
  const { t, tArray } = useTranslation();
  const items = tArray<{ title: string; description: string }>('trust.items');

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-amber">
            {t('trust.sectionLabel')}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            {t('trust.title')}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="flex gap-4 rounded-2xl border border-sand bg-white/50 p-6 hover:border-amber/20 hover:shadow-lg hover:shadow-amber/5" style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber/10 text-amber">
                  {icons[i]}
                </div>
                <div>
                  <h3 className="font-semibold text-carbon">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-warm-gray">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
