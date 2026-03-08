'use client';

import ScrollReveal from './ScrollReveal';

const steps = [
  {
    num: '01',
    title: 'Diagnóstico',
    description:
      'Analizamos tus procesos, datos y canales para identificar dónde AI genera mayor impacto.',
  },
  {
    num: '02',
    title: 'Implementación',
    description:
      'Construimos e integramos la solución a tus sistemas existentes. Sin migrar, sin interrumpir.',
  },
  {
    num: '03',
    title: 'Resultados',
    description:
      'Tu equipo recibe reportes, alertas y automatizaciones donde ya trabaja: WhatsApp, email o tu plataforma.',
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-sand/50 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            Cómo Funciona
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-amber/20 to-transparent md:block" />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 200}>
                <div className="relative text-center">
                  <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-amber/10" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber text-xl font-bold text-white shadow-lg shadow-amber/20">
                      {s.num}
                    </div>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-carbon">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-warm-gray">
                    {s.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
