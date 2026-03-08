'use client';

import ScrollReveal from './ScrollReveal';

const casos = [
  {
    name: 'JPRO Solutions',
    sector: 'Servicios Financieros',
    quote:
      'Automatizamos cobros y facturación, reduciendo horas de trabajo manual cada semana.',
  },
  {
    name: 'Ponos',
    sector: 'Dogfooding',
    quote:
      'Usamos nuestras propias herramientas. Nuestro Second Brain documenta todo lo que hacemos.',
  },
];

export default function CasosExito() {
  return (
    <section id="casos" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            Casos de Éxito
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {casos.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 150}>
              <div className="group rounded-2xl border border-sand bg-white/50 p-8 transition-all duration-300 hover:border-amber/20 hover:shadow-lg hover:shadow-amber/5">
                <div className="mb-4 font-lora text-4xl leading-none text-amber/30">
                  &ldquo;
                </div>
                <p className="mb-8 text-base leading-relaxed text-carbon">
                  {c.quote}
                </p>
                <div className="flex items-center gap-3 border-t border-sand pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/10 font-lora text-sm font-bold text-amber">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-carbon">{c.name}</p>
                    <p className="text-xs text-warm-gray">{c.sector}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
