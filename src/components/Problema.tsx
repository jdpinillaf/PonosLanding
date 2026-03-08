'use client';

import ScrollReveal from './ScrollReveal';

const pains = [
  'Reportes manuales que toman horas cada semana',
  'Tareas repetitivas que consumen a tu equipo',
  'Datos desconectados entre sistemas',
  'Información crítica que no llega a tiempo',
];

const solutions = [
  'Reportes automáticos entregados por WhatsApp',
  'Agentes AI que ejecutan tareas operacionales',
  'Datos conectados y accesibles en tiempo real',
  'Alertas inteligentes antes de que sea tarde',
];

export default function Problema() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            El problema que resolvemos
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <ScrollReveal delay={100}>
            <div className="rounded-2xl border border-red-200/50 bg-gradient-to-br from-red-50/50 to-sand p-8 transition-all duration-300 hover:shadow-lg hover:shadow-red-100/20">
              <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-red-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm">
                  &#10005;
                </span>
                Sin Ponos
              </h3>
              <ul className="space-y-4">
                {pains.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-warm-gray">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="rounded-2xl border border-emerald/20 bg-gradient-to-br from-emerald/[0.05] to-sand p-8 transition-all duration-300 hover:shadow-lg hover:shadow-emerald/10">
              <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-emerald">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald/10 text-sm">
                  &#10003;
                </span>
                Con Ponos
              </h3>
              <ul className="space-y-4">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-carbon">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
