import { Container, Section } from '../primitives';
import { Reveal } from '../motion';
import { SectionHeader, ServiceCard } from '../cards';
import { services } from '@/content/content';
import { goToContact } from '@/lib/actions';
import office from '@/assets/office-financial-analysis-still-life.jpg';
import reports from '@/assets/office-reports-still-life.jpg';

export function Services() {
  return (
    <Section id="atuacao" theme="dark" labelledBy="services-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 w-[min(42vw,560px)] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(7,17,31,0.26) 0%, rgba(7,17,31,0.56) 68%, #07111F 100%), linear-gradient(180deg, rgba(7,17,31,0.32), transparent 34%, transparent 72%, rgba(7,17,31,0.52)), url("${reports}")`,
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[min(42vw,560px)] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(270deg, rgba(7,17,31,0.26) 0%, rgba(7,17,31,0.56) 68%, #07111F 100%), linear-gradient(180deg, rgba(7,17,31,0.32), transparent 34%, transparent 72%, rgba(7,17,31,0.52)), url("${office}")`,
          }}
        />
      </div>
      <Container className="relative z-10">
        <SectionHeader
          id="services-title"
          eyebrow="Áreas de atuação"
          lines={['Soluções para desafios que não', 'cabem em respostas padronizadas.']}
          intro="Atuação pontual ou recorrente, adaptada à necessidade da empresa ou do escritório contábil."
        />
        <Reveal className="mx-auto mt-16 grid grid-cols-1 items-stretch gap-6 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              index={i}
              icon={s.icon}
              title={s.title}
              text={s.text}
              topics={s.topics}
              badge={s.badge}
              lead={s.lead}
              onSelect={() => goToContact({ service: s.service })}
            />
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
