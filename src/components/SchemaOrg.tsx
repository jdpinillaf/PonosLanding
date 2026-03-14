export default function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://ponos.com.co/#organization',
        name: 'Ponos',
        url: 'https://ponos.com.co',
        logo: 'https://ponos.com.co/logo-ponos.png',
        description:
          'AI-powered operations for service companies. We automate invoicing, dispatch, scheduling, and reporting connected to your real data.',
        areaServed: ['US', 'CO', 'LATAM'],
        knowsLanguage: ['es', 'en'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://ponos.com.co/#website',
        url: 'https://ponos.com.co',
        name: 'Ponos',
        publisher: { '@id': 'https://ponos.com.co/#organization' },
        inLanguage: ['es', 'en'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
