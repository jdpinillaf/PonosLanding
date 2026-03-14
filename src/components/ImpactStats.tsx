'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

function useCountUp(target: number, duration: number, trigger: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, trigger]);

  return value;
}

const CARD_STYLE = 'bg-white/50 border-sand';
const NUMBER_COLOR = 'text-amber';

function StatCard({
  number,
  suffix,
  label,
  index,
  trigger,
}: {
  number: number;
  suffix: string;
  label: string;
  index: number;
  trigger: boolean;
}) {
  const displayValue = useCountUp(number, 1500, trigger);

  return (
    <ScrollReveal delay={index * 150} className="h-full">
      <div
        className={`h-full rounded-2xl border p-6 text-center hover:scale-[1.03] hover:border-amber/30 hover:shadow-lg hover:shadow-amber/5 ${CARD_STYLE}`}
        style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        <p className={`font-lora text-4xl font-bold sm:text-5xl ${NUMBER_COLOR}`}>
          {displayValue}
          <span>{suffix}</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-warm-gray">{label}</p>
      </div>
    </ScrollReveal>
  );
}

export default function ImpactStats() {
  const { t, tArray } = useTranslation();
  const items = tArray<{ number: number; suffix: string; label: string }>(
    'impactStats.items'
  );
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 py-28" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            {t('impactStats.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-warm-gray">
            {t('impactStats.subtitle')}
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {items.map((item, i) => (
            <StatCard
              key={i}
              number={item.number}
              suffix={item.suffix}
              label={item.label}
              index={i}
              trigger={triggered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
