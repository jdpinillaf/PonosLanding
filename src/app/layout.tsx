import type { Metadata } from 'next';
import { Lora, Work_Sans } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import Providers from '@/components/Providers';
import SchemaOrg from '@/components/SchemaOrg';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ponos.com.co'),
  title: 'Ponos | AI-Powered Operations for Service Companies',
  description:
    'We automate invoicing, dispatch, scheduling, and reporting for service companies with AI connected to your real data.',
  keywords: [
    'AI operations',
    'service company automation',
    'AI dispatch',
    'invoicing automation',
    'HVAC automation',
    'field service AI',
    'WhatsApp operations',
    'AI agents',
    'service companies',
    'business process automation',
  ],
  alternates: {
    canonical: 'https://ponos.com.co',
    languages: {
      'en': 'https://ponos.com.co',
      'es': 'https://ponos.com.co',
    },
  },
  icons: {
    icon: '/logo-ponos-small.png',
    shortcut: '/logo-ponos-small.png',
  },
  openGraph: {
    title: 'Ponos | AI-Powered Operations for Service Companies',
    description:
      'We automate invoicing, dispatch, scheduling, and reporting for service companies with AI connected to your real data.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Ponos',
    url: 'https://ponos.com.co',
    images: [
      {
        url: '/logo-ponos.png',
        width: 1200,
        height: 630,
        alt: 'Ponos — AI Operations for Service Companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ponos | AI-Powered Operations for Service Companies',
    description:
      'We automate invoicing, dispatch, scheduling, and reporting for service companies with AI connected to your real data.',
    images: ['/logo-ponos.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaOrg />
      </head>
      <body
        className={`${lora.variable} ${workSans.variable} font-work-sans bg-parchment text-soft-black antialiased`}
      >
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
