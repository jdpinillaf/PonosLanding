'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/i18n/context';
import LanguageSwitcher from './LanguageSwitcher';

const linkKeys = [
  { key: 'navbar.services', href: '#services' },
  { key: 'navbar.demos', href: '#demos' },
  { key: 'navbar.howItWorks', href: '#how-it-works' },
  { key: 'navbar.successStories', href: '#success-stories' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const sectionIds = linkKeys.map((l) => l.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-parchment/90 backdrop-blur-xl border-b border-sand/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex flex-col items-center leading-none">
          <span className="font-lora text-xl font-bold tracking-[0.2em] text-carbon transition-colors duration-300 group-hover:text-amber">
            PONOS
          </span>
          <span className="text-[0.55rem] font-medium tracking-[0.3em] text-warm-gray">
            AI OPERATIONS
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {linkKeys.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm transition-colors duration-300 ${
                activeSection === l.href.slice(1)
                  ? 'text-amber font-medium'
                  : 'text-warm-gray hover:text-carbon'
              }`}
            >
              {t(l.key)}
              {activeSection === l.href.slice(1) && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full bg-amber" />
              )}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="#book"
            className="rounded-xl bg-amber px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-amber-light hover:shadow-md hover:shadow-amber/20 hover:-translate-y-0.5"
          >
            {t('navbar.bookConsultation')}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-warm-gray transition-colors hover:text-carbon md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-sand/50 bg-parchment/95 px-6 pb-4 backdrop-blur-xl">
          {linkKeys.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm transition-colors ${
                activeSection === l.href.slice(1)
                  ? 'text-amber font-medium'
                  : 'text-warm-gray hover:text-amber'
              }`}
            >
              {t(l.key)}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="inline-block rounded-xl bg-amber px-5 py-2.5 text-sm font-medium text-white"
            >
              {t('navbar.bookConsultation')}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
