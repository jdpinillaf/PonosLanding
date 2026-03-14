'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/context';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const letters = ['P', 'O', 'N', 'O', 'S'];
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Subtle background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-amber/[0.04] blur-3xl" />
        <div className="absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-emerald/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Animated Logo */}
        <div className="mb-10">
          <div
            className="flex items-center justify-center"
            style={{ perspective: '800px' }}
          >
            {letters.map((letter, i) => (
              <span
                key={i}
                className="inline-block font-lora text-5xl font-bold tracking-[0.12em] text-carbon sm:tracking-[0.25em] sm:text-7xl lg:text-8xl"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded
                    ? 'translateY(0) rotateX(0deg)'
                    : 'translateY(40px) rotateX(-90deg)',
                  filter: loaded ? 'blur(0)' : 'blur(8px)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${300 + i * 120}ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Decorative line */}
          <div
            className="mx-auto mt-4 h-[1.5px] bg-amber/60"
            style={{
              width: loaded ? '60px' : '0px',
              transition: 'width 0.5s ease-out',
              transitionDelay: '1100ms',
            }}
          />

          {/* Subtitle */}
          <p
            className="mt-3 text-xs font-medium tracking-[0.3em] text-warm-gray sm:text-sm"
            style={{
              opacity: loaded ? 0.7 : 0,
              transition: 'opacity 0.8s ease-out',
              transitionDelay: '1300ms',
            }}
          >
            AI OPERATIONS
          </p>
        </div>

        {/* Headline */}
        <h1
          className="font-lora text-2xl font-bold leading-tight tracking-tight text-carbon sm:text-4xl lg:text-5xl"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease-out',
            transitionDelay: '1500ms',
          }}
        >
          {t('hero.headline')}{' '}
          <span className="gradient-text">{t('hero.headlineHighlight')}</span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-2xl text-lg text-warm-gray sm:text-xl"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease-out',
            transitionDelay: '1700ms',
          }}
        >
          {t('hero.subtitle')}
        </p>

        <p
          className="mx-auto mt-2 max-w-2xl text-base italic text-warm-gray/70"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.7s ease-out',
            transitionDelay: '1900ms',
          }}
        >
          {t('hero.tagline')}
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease-out',
            transitionDelay: '2100ms',
          }}
        >
          <a
            href="#book"
            className="rounded-xl bg-amber px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-light hover:shadow-lg hover:shadow-amber/20"
          >
            {t('hero.ctaPrimary')}
          </a>
          <a
            href="#services"
            className="rounded-xl border border-sand px-8 py-3.5 text-base font-semibold text-carbon transition-all duration-300 hover:-translate-y-0.5 hover:border-amber hover:text-amber"
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.7s ease-out',
          transitionDelay: '2500ms',
          animation: loaded ? 'scrollBounce 2s ease-in-out 3s infinite' : 'none',
        }}
      >
        <svg
          className="h-6 w-6 text-warm-gray"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
