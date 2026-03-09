'use client';

import { useTranslation } from '@/i18n/context';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-sand px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-lora text-lg font-bold tracking-[0.2em] text-carbon">
            PONOS
          </span>
          <span className="text-[0.5rem] tracking-[0.3em] text-warm-gray">
            AI CONSULTING
          </span>
        </div>
        <p className="text-sm text-warm-gray">
          &copy; {new Date().getFullYear()} Ponos. {t('footer.rights')}
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/company/ponos-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-warm-gray transition-colors duration-300 hover:text-amber"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/ponos_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-warm-gray transition-colors duration-300 hover:text-amber"
          >
            Twitter/X
          </a>
        </div>
      </div>
    </footer>
  );
}
