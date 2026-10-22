import { MessageCircle } from 'lucide-react';
import { Container, Button } from '../primitives';
import { HeadlineReveal, Reveal } from '../motion';
import { ImageFrame } from '../cards';
import { goToContact, openChannel } from '@/lib/actions';
import office from '@/assets/arch-office.jpg';

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy-950 py-[96px] text-white md:py-[160px]">
      <ImageFrame src={office} className="absolute inset-0" />
      <div aria-hidden className="absolute inset-0 bg-navy-950/85" />
      <Container className="relative text-center">
        <HeadlineReveal
          id="cta-title"
          className="mx-auto max-w-[860px] text-[34px] leading-[1.08] md:text-[56px]"
          lines={['Tem um desafio fiscal, tributário', 'ou operacional para resolver?']}
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[560px] text-[18px] text-gray-300">
            Conte brevemente o que está acontecendo. A partir daí podemos avaliar a melhor forma de atuação.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button onClick={() => goToContact()} data-testid="button-cta-quote">Solicitar orçamento</Button>
            <Button variant="secondary" onClick={() => openChannel('whatsapp')} data-testid="button-cta-whatsapp">
              <MessageCircle className="h-4 w-4" aria-hidden /> Falar pelo WhatsApp
            </Button>
          </div>
          <p className="mt-8 text-[14px] text-gold-soft">Atendimento remoto • Projetos e demandas pontuais</p>
        </Reveal>
      </Container>
    </section>
  );
}
