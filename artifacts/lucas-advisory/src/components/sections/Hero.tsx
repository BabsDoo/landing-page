import { Container, Button } from '../primitives';
import { HeadlineReveal, Reveal } from '../motion';
import { PortraitPlaceholder } from '../cards';
import { microproof } from '@/content/content';
import { goToContact } from '@/lib/actions';
import { HeroMonogramEntrance } from './HeroMonogramEntrance';
import tower from '@/assets/arch-tower.jpg';
import portrait from '@/assets/lucas-portrait.png';

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-950 pb-16 pt-[120px] text-white">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[700px] w-[700px] rounded-full bg-blue-600/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[8%] hidden w-px bg-white/5 lg:block" />
      <HeroMonogramEntrance />
      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[55fr_45fr] lg:gap-12">
          <div>
            <Reveal immediate delay={0.1} y={16}>
              <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.13em] text-gold">
                <span aria-hidden className="h-px w-8 bg-gold" />
                Consultoria Fiscal • Tributária • Empresarial
              </p>
            </Reveal>
            <HeadlineReveal
              as="h1"
              id="hero-title"
              immediate
              delay={0.25}
              className="mt-6 text-[46px] leading-[0.98] sm:text-[60px] xl:text-[72px]"
              lines={[
                'Experiência técnica',
                'para transformar complexidade',
                <span key="g">
                  em <span className="text-gold">decisões mais seguras.</span>
                </span>,
              ]}
            />
            <Reveal immediate delay={0.75}>
              <p className="mt-8 max-w-[560px] text-[18px] text-gray-300">
                Consultoria e apoio técnico para empresas e escritórios de contabilidade em desafios fiscais, tributários, gerenciais e operacionais.
              </p>
            </Reveal>
            <Reveal immediate delay={0.9}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button onClick={() => goToContact()} data-testid="button-hero-proposal">Solicitar uma proposta</Button>
                <Button variant="secondary" onClick={() => document.getElementById('atuacao')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-hero-services">
                  Conhecer minha atuação
                </Button>
              </div>
            </Reveal>
            <Reveal immediate delay={1.4} y={12}>
              <ul className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-gray-300" aria-label="Áreas de domínio">
                {microproof.map((m, i) => (
                  <li key={m} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="text-gold">•</span>}
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal immediate delay={1.05} y={24} className="px-4 sm:px-8 lg:px-0">
            <PortraitPlaceholder image={tower} photo={portrait} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
