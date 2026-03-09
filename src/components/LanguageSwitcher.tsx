'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/i18n/context';

const languages = [
  { code: 'en' as const, label: 'English', flag: '🇺🇸' },
  { code: 'es' as const, label: 'Español', flag: '🇲🇽' },
];

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === locale)!;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-sand px-3 py-1.5 text-sm font-medium text-warm-gray transition-all duration-300 hover:border-amber hover:text-carbon"
        aria-label="Change language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs tracking-wide">{current.code.toUpperCase()}</span>
        <svg
          className={`h-3 w-3 text-warm-gray transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute right-0 top-full mt-2 min-w-[140px] overflow-hidden rounded-xl border border-sand bg-white shadow-lg shadow-black/5 transition-all duration-300 origin-top ${
          open
            ? 'scale-y-100 opacity-100 translate-y-0'
            : 'scale-y-0 opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              setLocale(lang.code);
              setOpen(false);
            }}
            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-200 ${
              locale === lang.code
                ? 'bg-amber/5 text-amber font-medium'
                : 'text-warm-gray hover:bg-sand/50 hover:text-carbon'
            }`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.label}</span>
            {locale === lang.code && (
              <svg className="ml-auto h-4 w-4 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
