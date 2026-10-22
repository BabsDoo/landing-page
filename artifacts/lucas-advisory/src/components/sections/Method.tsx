import { useRef } from 'react';
import { Container, Section } from '../primitives';
import { HeadlineReveal, ProgressLine, Reveal, useScrollProgress } from '../motion';
import { Eyebrow } from '../primitives';
import { steps } from '@/content/content';
import { cn } from '@/lib/utils';

export function Method() {
  const ref = useRef<HTMLOListElement>(null);
  const p = useScrollProgress(ref, 'top 75%', 'bottom 65%');
  const n = steps.length;
  return (
    <Section theme="light" labelledBy="method-title">
      <Container>
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal><Eyebrow theme="light" className="justify-center">Método</Eyebrow></Reveal>
          <HeadlineReveal
            id="method-title"
            className="mt-5 text-[34px] leading-[1.08] md:text-[52px]"
            lines={['Entre a legislação e a operação existe uma distância.', <span key="b" className="text-blue-700">Minha atuação acontece justamente aí.</span>]}
          />
        </div>
        <ol ref={ref} className="relative mt-20 grid gap-12 pl-10 md:mt-24 lg:grid-cols-5 lg:gap-8 lg:pl-0">
          <ProgressLine p={p} axis="x" className="left-0 right-0 top-[7px] hidden h-px lg:block" />
          <ProgressLine p={p} axis="y" className="bottom-0 left-[7px] top-0 w-px lg:hidden" />
          {steps.map((s, i) => {
            const on = p >= (i === 0 ? 0.02 : i / n);
            return (
              <li key={s.n} className="relative lg:pt-12">
                <span
                  aria-hidden
                  className={cn(
                    'absolute -left-10 top-1.5 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-500 lg:left-0 lg:top-0',
                    on ? 'border-gold bg-gold' : 'border-gray-300 bg-warm',
                  )}
                />
                <p className={cn('font-serif text-[56px] leading-none transition-colors duration-500', on ? 'text-gold-deep' : 'text-navy-950/20')}>{s.n}</p>
                <h3 className="mt-4 font-sans text-[14px] font-bold uppercase tracking-[0.13em] text-navy-950">{s.title}</h3>
                <p className="mt-3 max-w-[260px] text-gray-700">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
