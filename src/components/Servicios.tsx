'use client';

import ScrollReveal from './ScrollReveal';

const servicios = [
  {
    title: 'Agentes Operacionales',
    description:
      'Agente conectado a tu base de datos. Reportes automáticos, alertas y briefings diarios entregados por WhatsApp.',
    icon: '\u{1F916}',
    soon: false,
  },
  {
    title: 'Automatización Financiera',
    description:
      'Cobros, facturación y seguimiento de pagos automatizados. Menos trabajo manual, menos errores.',
    icon: '\u{1F4B0}',
    soon: false,
  },
  {
    title: 'Second Brain',
    description:
      'Base de conocimiento viva para toda tu empresa. Documentación, procesos y decisiones en un solo lugar.',
    icon: '\u{1F9E0}',
    soon: false,
  },
  {
    title: 'Agente de Ventas',
    description:
      'Bot conversacional AI para ventas por WhatsApp. Atiende, califica y cierra prospectos 24/7.',
    icon: '\u{1F4C8}',
    soon: true,
  },
  {
    title: 'Agente de Marketing',
    description:
      'Ciclo completo de marketing automatizado. Contenido, distribución y análisis con AI.',
    icon: '\u{1F4E3}',
    soon: true,
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            Nuestros Módulos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-warm-gray">
            Soluciones modulares que se adaptan a las necesidades de tu empresa.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 100}>
              <div className="group relative rounded-2xl border border-sand bg-white/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/30 hover:shadow-xl hover:shadow-amber/5">
                {s.soon && (
                  <span className="absolute right-4 top-4 rounded-full bg-amber/10 px-3 py-1 text-xs font-medium text-amber">
                    Próximamente
                  </span>
                )}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-2xl transition-transform duration-300 group-hover:scale-110">
                  {s.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-carbon">
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
    </section>
  );
}
