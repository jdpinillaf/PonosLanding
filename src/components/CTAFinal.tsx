'use client';

import ScrollReveal from './ScrollReveal';

export default function CTAFinal() {
  return (
    <section className="px-6 py-28">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-carbon px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
          <h2 className="relative font-lora text-3xl font-bold text-parchment sm:text-4xl">
            Transforma tu operacion con AI
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-parchment/70">
            Conversemos sobre como AI puede simplificar los procesos de tu
            empresa. Sin compromiso.
          </p>
          <a
            href="#agendar"
            className="relative mt-8 inline-block rounded-xl bg-amber px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-light hover:shadow-xl hover:shadow-amber/30"
          >
            Agenda tu consulta gratuita
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
