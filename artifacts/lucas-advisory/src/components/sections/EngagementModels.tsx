import { ArrowRight } from 'lucide-react';
import { Container, Section } from '../primitives';
import { Reveal } from '../motion';
import { SectionHeader } from '../cards';
import { models } from '@/content/content';
import { goToContact } from '@/lib/actions';

export function EngagementModels() {
  return (
    <Section theme="dark" labelledBy="models-title">
      <Container>
        <SectionHeader id="models-title" eyebrow="Como podemos trabalhar" lines={['A solução certa', 'depende do desafio.']} />
        <Reveal stagger className="mt-16 grid gap-6 lg:grid-cols-3">
          {models.map((m, i) => (
            <article key={m.kicker} className="group flex flex-col rounded-[18px] border border-white/10 bg-navy-850 p-8 transition-[transform,border-color] duration-[320ms] hover:-translate-y-1.5 hover:border-gold/45 md:p-10">
              <p className="font-serif text-[44px] leading-none text-gold/70">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.13em] text-gold-soft">{m.kicker}</p>
              <h3 className="mt-3 text-[30px] leading-tight text-white">{m.title}</h3>
              <p className="mt-4 text-gray-300">{m.text}</p>
              <button
                type="button"
                onClick={() => goToContact(m.prefill)}
                className="mt-auto flex min-h-[48px] items-center gap-2 pt-8 text-[15px] font-bold text-gold hover:text-gold-hover"
              >
                {m.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-[320ms] group-hover:translate-x-1.5" aria-hidden />
              </button>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
