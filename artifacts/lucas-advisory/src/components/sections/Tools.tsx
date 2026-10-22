import { Container, Section } from '../primitives';
import { Reveal } from '../motion';
import { SectionHeader, icons } from '../cards';
import { tools } from '@/content/content';

export function Tools() {
  return (
    <Section id="ferramentas" theme="deep" className="!pt-0" labelledBy="tools-title">
      <Container>
        <div className="border-t border-white/10 pt-16 md:pt-24">
          <SectionHeader
            id="tools-title"
            theme="dark"
            eyebrow="Ferramentas"
            lines={['Ferramentas fazem parte da solução.', 'Não são a solução.']}
            intro="Experiência prática com diferentes ecossistemas contábeis, fiscais e de gestão."
            titleClassName="text-[36px] md:text-[48px]"
            introClassName="text-[19px]"
          />
          <Reveal stagger className="mt-14 grid items-stretch gap-x-10 gap-y-14 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => {
              const Icon = icons[t.icon];
              return (
                <div key={t.title} className="flex h-full flex-col">
                  <Icon strokeWidth={1.5} className="h-7 w-7 text-blue-500" aria-hidden />
                  <h3 className="mt-4 flex min-h-[54px] items-end border-b border-white/15 pb-3 font-sans text-[15px] font-bold uppercase leading-snug tracking-[0.13em] text-white">{t.title}</h3>
                  <ul className="mt-4 flex flex-col gap-1">
                    {t.items.map((item) => (
                      <li key={item.name} className="flex min-h-[48px] items-center gap-3 font-serif text-[24px] leading-snug text-gray-300">
                        {item.logo && (
                          <img
                            src={`${import.meta.env.BASE_URL}${item.logo}`}
                            alt=""
                            width="24"
                            height="24"
                            loading="lazy"
                            decoding="async"
                            className="h-6 w-6 shrink-0 object-contain"
                          />
                        )}
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
