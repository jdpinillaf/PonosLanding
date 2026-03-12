'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';

type Locale = 'en' | 'es';

const dictionaries: Record<Locale, Record<string, unknown>> = { en, es };

function resolve(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return path; // fallback: return key path as-is
  }, obj);
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  tArray: <T = unknown>(key: string) => T[];
  tObject: <T = unknown>(key: string) => T;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Locale | null;
    if (saved && (saved === 'en' || saved === 'es')) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    } else {
      const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
      setLocaleState(browserLang);
      document.documentElement.lang = browserLang;
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const val = resolve(dictionaries[locale], key);
      return typeof val === 'string' ? val : key;
    },
    [locale]
  );

  const tArray = useCallback(
    <T = unknown,>(key: string): T[] => {
      const val = resolve(dictionaries[locale], key);
      return Array.isArray(val) ? (val as T[]) : [];
    },
    [locale]
  );

  const tObject = useCallback(
    <T = unknown,>(key: string): T => {
      const val = resolve(dictionaries[locale], key);
      return val as T;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray, tObject }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
