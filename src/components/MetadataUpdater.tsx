'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/i18n/context';

export default function MetadataUpdater() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('meta.title');

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    setMeta('description', t('meta.description'));
    setMeta('og:title', t('meta.ogTitle'));
    setMeta('og:description', t('meta.ogDescription'));
    setMeta('og:locale', t('meta.title').includes('Consultora') ? 'es_MX' : 'en_US');
    setMeta('twitter:title', t('meta.ogTitle'));
    setMeta('twitter:description', t('meta.ogDescription'));
  }, [t]);

  return null;
}
