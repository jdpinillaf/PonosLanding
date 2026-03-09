'use client';

import { LanguageProvider } from '@/i18n/context';
import MetadataUpdater from './MetadataUpdater';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MetadataUpdater />
      {children}
    </LanguageProvider>
  );
}
