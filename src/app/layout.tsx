import type { Metadata } from 'next';
import { Lora, Work_Sans } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
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
  title: 'Ponos | Consultora AI — Soluciones personalizadas para tu empresa',
  description:
    'Consultora boutique de inteligencia artificial. Conectamos AI a tus datos reales, en tus canales. Agentes operacionales, automatizacion financiera y mas.',
  keywords: [
    'AI',
    'inteligencia artificial',
    'consultora',
    'automatizacion',
    'WhatsApp',
    'agentes AI',
    'LATAM',
  ],
  openGraph: {
    title: 'Ponos | Soluciones AI personalizadas para tu empresa',
    description:
      'Consultora boutique de inteligencia artificial. Conectamos AI a tus datos reales, en tus canales.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Ponos',
    url: 'https://ponos.com.co',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ponos | Soluciones AI personalizadas para tu empresa',
    description:
      'Consultora boutique de inteligencia artificial. Conectamos AI a tus datos reales, en tus canales.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${lora.variable} ${workSans.variable} font-work-sans bg-parchment text-soft-black antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
