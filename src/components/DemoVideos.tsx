'use client';

import ScrollReveal from './ScrollReveal';

const demos = [
  {
    title: 'Briefing Diario Automatizado',
    description: 'Un agente AI genera y entrega tu briefing matutino por WhatsApp.',
    icon: '\u{1F4CA}',
    color: 'rgba(196, 123, 43, 0.08)',
    colorEnd: 'rgba(232, 168, 76, 0.03)',
  },
  {
    title: 'Cobros Inteligentes',
    description: 'Automatizacion completa de cobros con seguimiento y recordatorios.',
    icon: '\u{1F4B3}',
    color: 'rgba(27, 122, 90, 0.08)',
    colorEnd: 'rgba(42, 158, 116, 0.03)',
  },
  {
    title: 'Second Brain en Accion',
    description: 'Base de conocimiento viva que responde preguntas de tu equipo.',
    icon: '\u{1F9E0}',
    color: 'rgba(44, 62, 80, 0.06)',
    colorEnd: 'rgba(107, 114, 128, 0.03)',
  },
];

export default function DemoVideos() {
  return (
    <section id="demos" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-lora text-center text-3xl font-bold text-carbon sm:text-4xl">
            Mira como funciona
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-warm-gray">
            Demos reales de nuestras soluciones en accion.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {demos.map((demo, i) => (
            <ScrollReveal key={demo.title} delay={i * 150}>
              <div className="group relative overflow-hidden rounded-2xl border border-sand bg-white/50 transition-all duration-300 hover:border-amber/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber/5">
                {/* Video placeholder — replace with <video> or iframe when ready */}
                <div
                  className="relative aspect-video flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${demo.color} 0%, ${demo.colorEnd} 100%)`,
                  }}
                >
                  <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    {demo.icon}
                  </div>
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber/90 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-amber group-hover:shadow-xl group-hover:shadow-amber/30">
                      <svg className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-carbon">{demo.title}</h3>
                  <p className="text-sm leading-relaxed text-warm-gray">{demo.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
