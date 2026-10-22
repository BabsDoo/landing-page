import { Container, Section } from '../primitives';
import { Reveal } from '../motion';
import { PortraitPlaceholder, SectionHeader } from '../cards';
import tower from '@/assets/arch-tower.jpg';
import portrait from '@/assets/lucas-portrait.png';

export function About() {
  return (
    <Section id="sobre" theme="light" labelledBy="about-title">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[5fr_6fr] lg:gap-24">
          <Reveal className="px-4 sm:px-8 lg:px-0">
            <PortraitPlaceholder image={tower} photo={portrait} />
          </Reveal>
          <div>
            <SectionHeader
              id="about-title"
              theme="light"
              eyebrow="Sobre mim"
              lines={['Visão estratégica, soluções práticas', 'e uma inquietação constante por fazer melhor.']}
            />
            <Reveal delay={0.1} className="mt-8 max-w-[620px] space-y-5 text-[17px] text-gray-700">
              <p>
                Sou Lucas Ramos Melo, profissional com experiência em contabilidade, consultoria e gestão,
                construindo uma trajetória que conecta conhecimento técnico, liderança e visão de negócios.
              </p>
              <p>
                Acredito que <strong className="font-semibold text-navy-950">bons resultados começam com boas perguntas, processos bem estruturados e pessoas trabalhando na mesma direção.</strong>{' '}
                Gosto de entender os desafios a fundo, simplificar o complexo e transformar ideias em soluções
                que realmente funcionam.
              </p>
              <p>
                Minha atuação vai além da análise fiscal e contábil. Tenho especial interesse em{' '}
                <strong className="font-semibold text-navy-950">gestão, melhoria contínua, automação de processos e inteligência artificial</strong>,
                utilizando a tecnologia para eliminar tarefas repetitivas, aumentar a eficiência e apoiar
                decisões mais inteligentes.
              </p>
              <p>
                Sou movido pela curiosidade, pelo pensamento crítico e pela vontade de evoluir. Para mim,{' '}
                <strong className="font-semibold text-navy-950">consultar é compreender, gerir é conectar e inovar é transformar.</strong>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
