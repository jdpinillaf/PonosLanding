import type { Metadata } from 'next';
import { Lora, Work_Sans } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import Providers from '@/components/Providers';
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
  title: 'Ponos | AI Consulting — Custom solutions for your business',
  description:
    'Boutique AI consulting firm. We connect AI to your real data, on your channels. Operational agents, financial automation, and more.',
  keywords: [
    'AI',
    'artificial intelligence',
    'consulting',
    'automation',
    'WhatsApp',
    'AI agents',
    'LATAM',
  ],
  openGraph: {
    title: 'Ponos | Custom AI solutions for your business',
    description:
      'Boutique AI consulting firm. We connect AI to your real data, on your channels.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ponos',
    url: 'https://ponos.com.co',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ponos | Custom AI solutions for your business',
    description:
      'Boutique AI consulting firm. We connect AI to your real data, on your channels.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
