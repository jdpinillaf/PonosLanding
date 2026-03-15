'use client';

import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n/context';

export default function Founder() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-amber">
            {t('founder.sectionLabel')}
          </p>
        </ScrollReveal>

        <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
          {/* Photo */}
          <ScrollReveal delay={100} className="shrink-0">
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-2 border-sand shadow-lg sm:h-72 sm:w-72">
              <Image
                src="/founder-jesus-pinilla.png"
                alt="Jesus David Pinilla — Founder de Ponos"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 256px, 288px"
                priority={false}
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={250} className="flex-1 text-center md:text-left">
            <h3 className="font-lora text-2xl font-bold text-carbon sm:text-3xl">
              {t('founder.name')}
            </h3>
            <p className="mt-1 text-sm font-medium text-amber">
              {t('founder.role')}
            </p>

            {/* Credentials */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {['credential1', 'credential2', 'credential3'].map((key) => (
                <span
                  key={key}
                  className="rounded-full bg-amber/10 px-3 py-1 text-xs font-medium text-amber"
                >
                  {t(`founder.${key}`)}
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mt-6 border-l-2 border-amber/30 pl-4 text-base leading-relaxed text-warm-gray">
              {t('founder.quote')}
            </blockquote>

            {/* LinkedIn */}
            <a
              href={t('founder.linkedin')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-carbon transition-colors hover:text-amber"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
