import { useId, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Container, Section } from '../primitives';
import { ProgressLine, useScrollProgress } from '../motion';
import { SectionHeader, TimelineItem } from '../cards';
import { experience, olderExperience } from '@/content/content';
import { cn } from '@/lib/utils';

export function ExperienceTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const p = useScrollProgress(ref, 'top 70%', 'bottom 60%');
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const n = experience.length;
  return (
    <Section id="experiencia" theme="light" className="!pb-16 md:!pb-24" labelledBy="exp-title">
      <Container>
        <SectionHeader id="exp-title" theme="light" eyebrow="Trajetória" lines={['Experiência construída', 'dentro da operação.']} />
        <div className="mt-16">
          <ol ref={ref} className="relative ml-[7px] md:ml-0">
            <ProgressLine p={p} axis="y" className="bottom-0 left-0 top-2 w-px md:left-[190px]" />
            {experience.map((e, i) => (
              <TimelineItem key={e.company} {...e} active={p >= (i === 0 ? 0.02 : (i / n) * 0.95)} />
            ))}
          </ol>
          <div className="mt-10 md:ml-[220px]">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((o) => !o)}
              data-testid="button-timeline-expand"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[8px] border border-navy-950/25 px-5 text-[15px] font-bold text-navy-950 transition-colors hover:border-blue-700 hover:text-blue-700"
            >
              {open ? 'Recolher trajetória' : 'Ver trajetória completa'}
              {open ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
            </button>
            <div
              id={panelId}
              className={cn('grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
            >
              <div className="overflow-hidden" aria-hidden={!open}>
                <div className="mt-6 max-w-[900px] rounded-[14px] border-l-2 border-gold bg-white p-6 shadow-[0_16px_50px_rgba(7,17,31,0.10)] sm:p-8" data-testid="text-timeline-older">
                  <p className="text-[12px] font-bold uppercase tracking-[0.13em] text-gold-deep">Experiências anteriores</p>
                  <ol aria-label="Experiências profissionais anteriores" className="relative mt-6 ml-[7px] md:ml-0">
                    <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-navy-950/10 md:left-[190px]" />
                    {olderExperience.map((item) => (
                      <TimelineItem key={`${item.company}-${item.period}`} {...item} active />
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
