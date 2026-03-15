'use client';

import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

export default function ROITable() {
  const { t, tArray } = useTranslation();
  const rows = tArray<{ process: string; before: string; after: string }>('roi.rows');

  return (
    <section className="bg-sand/50 px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-amber">
            {t('roi.sectionLabel')}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            {t('roi.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-warm-gray">
            {t('roi.subtitle')}
          </p>
        </ScrollReveal>

        {/* Desktop table */}
        <ScrollReveal delay={150}>
          <div className="mt-16 hidden overflow-hidden rounded-2xl border border-sand bg-white/50 md:block">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-sand bg-sand/30 px-6 py-4">
              <div className="text-sm font-semibold text-carbon">Proceso</div>
              <div className="text-center text-sm font-semibold text-red-500/80">
                {t('roi.beforeLabel')}
              </div>
              <div className="text-center text-sm font-semibold text-emerald-600">
                {t('roi.afterLabel')}
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 items-center px-6 py-4 ${
                  i < rows.length - 1 ? 'border-b border-sand/60' : ''
                } ${i === rows.length - 1 ? 'bg-amber/5' : ''}`}
              >
                <div className="text-sm font-medium text-carbon">{row.process}</div>
                <div className="text-center text-sm text-warm-gray">{row.before}</div>
                <div className="text-center text-sm font-medium text-emerald-600">{row.after}</div>
              </div>
            ))}

            {/* ROI footer */}
            <div className="grid grid-cols-3 items-center border-t-2 border-amber/20 bg-amber/5 px-6 py-5">
              <div className="font-lora text-sm font-bold text-carbon">{t('roi.roiLabel')}</div>
              <div />
              <div className="text-center">
                <span className="rounded-full bg-amber/15 px-4 py-1.5 text-sm font-bold text-amber">
                  {t('roi.roiValue')}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile cards */}
        <div className="mt-16 space-y-4 md:hidden">
          {rows.map((row, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className={`rounded-2xl border border-sand bg-white/50 p-5 ${
                  i === rows.length - 1 ? 'border-amber/30 bg-amber/5' : ''
                }`}
              >
                <p className="text-sm font-semibold text-carbon">{row.process}</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-500">
                      &times;
                    </span>
                    <span className="text-sm text-warm-gray">{row.before}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-600">
                      &#10003;
                    </span>
                    <span className="text-sm font-medium text-emerald-600">{row.after}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* ROI badge mobile */}
          <ScrollReveal delay={rows.length * 100}>
            <div className="flex items-center justify-center rounded-2xl border border-amber/30 bg-amber/5 p-5">
              <span className="rounded-full bg-amber/15 px-4 py-1.5 text-sm font-bold text-amber">
                {t('roi.roiLabel')}: {t('roi.roiValue')}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
