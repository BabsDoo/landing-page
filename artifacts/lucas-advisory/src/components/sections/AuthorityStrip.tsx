import { Container, Section } from '../primitives';
import { CountUp, Reveal } from '../motion';
import { MetricCard } from '../cards';
import { authority, financialOfferings } from '@/content/content';

export function AuthorityStrip() {
  return (
    <Section id="authority" theme="deep" className="!py-14 md:!py-20" labelledBy="authority-title">
      <h2 id="authority-title" className="sr-only">Visão geral da atuação</h2>
      <Container>
        <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {authority.map((a) =>
            'value' in a && a.value ? (
              <MetricCard key={a.title} title={a.title}>
                <CountUp to={a.value} suffix={a.suffix} />
              </MetricCard>
            ) : (
              <MetricCard
                key={a.title}
                title={a.title}
                text={a.text}
                titleClassName={a.title === 'Automação de Processos com IA' ? 'text-[25px] leading-tight md:text-[30px]' : undefined}
              />
            ),
          )}
          {financialOfferings.map((offering) => (
            <MetricCard
              key={offering.title}
              title={offering.title}
              text={offering.text}
            />
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
