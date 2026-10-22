import { useLayoutEffect, useRef, type ReactNode } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CalendarClock,
  Cpu,
  FileSearch,
  FileText,
  Layers,
  LayoutDashboard,
  Route,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap, isDesktop, prefersReducedMotion } from '@/lib/gsap';
import { Eyebrow, LogoMark, type Theme } from './primitives';
import { HeadlineReveal, Reveal } from './motion';

export const icons: Record<string, LucideIcon> = {
  search: FileSearch,
  dash: LayoutDashboard,
  flow: Workflow,
  shield: ShieldCheck,
  cal: CalendarClock,
  cpu: Cpu,
  book: BookOpenCheck,
  route: Route,
  users: Users,
  layers: Layers,
  file: FileText,
  bars: BarChart3,
};

export function SectionHeader({
  eyebrow,
  lines,
  theme = 'dark',
  intro,
  align = 'left',
  id,
  className,
  titleClassName,
  introClassName,
}: {
  eyebrow: string;
  lines: ReactNode[];
  theme?: Theme;
  intro?: string;
  align?: 'left' | 'center';
  id?: string;
  className?: string;
  titleClassName?: string;
  introClassName?: string;
}) {
  const light = theme === 'light';
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-[820px]', className)}>
      <Reveal>
        <Eyebrow theme={theme} className={align === 'center' ? 'justify-center' : ''}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <HeadlineReveal
        id={id}
        lines={lines}
        className={cn('mt-5 text-[34px] leading-[1.08] md:text-[44px]', light ? 'text-navy-950' : 'text-white', titleClassName)}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn('mt-6 text-[18px] leading-[1.65]', light ? 'text-gray-700' : 'text-gray-300', introClassName)}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Imagem com entrada 1.05 → 1 e paralaxe sutil (máx. ~6%, só em desktop). */
export function ImageFrame({
  src,
  alt = '',
  className,
  eager,
  parallax = true,
}: {
  src: string;
  alt?: string;
  className?: string;
  eager?: boolean;
  parallax?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  useLayoutEffect(() => {
    if (!wrap.current || !img.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(img.current, {
        scale: 1.05,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrap.current, start: 'top 90%', once: true },
      });
      if (parallax && isDesktop()) {
        gsap.fromTo(
          img.current,
          { yPercent: -3 },
          { yPercent: 3, ease: 'none', scrollTrigger: { trigger: wrap.current, scrub: true, start: 'top bottom', end: 'bottom top' } },
        );
      }
    }, wrap);
    return () => ctx.revert();
  }, [parallax]);
  return (
    <div ref={wrap} className={cn('relative overflow-hidden', className)}>
      <img
        ref={img}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute -top-[4%] left-0 h-[108%] w-full object-cover"
      />
    </div>
  );
}

/** Espaço reservado para o retrato. Passe `photo` para substituir facilmente. */
export function PortraitPlaceholder({ image, photo, className }: { image: string; photo?: string; className?: string }) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[460px]', className)}>
      <span aria-hidden className="absolute -right-4 -top-4 h-full w-full rounded-[14px] border border-gold/35 sm:-right-6 sm:-top-6" />
      <span aria-hidden className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-gold/60" />
      <div
        role="img"
        aria-label={photo ? 'Retrato de Lucas Ramos Melo' : 'Espaço reservado para o retrato profissional de Lucas Ramos Melo'}
        className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-navy-850 shadow-[0_28px_80px_rgba(4,13,24,0.35)]"
      >
        <ImageFrame src={photo ?? image} eager className="absolute inset-0" />
        {!photo && (
          <>
            <div aria-hidden className="absolute inset-0 bg-navy-950/70" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(57,137,201,0.28),transparent_60%)]" />
          </>
        )}
        {!photo && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <LogoMark size={132} className="opacity-90" />
            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.2em] text-gold-soft">Retrato institucional</p>
            <p className="mt-1 text-[14px] text-gray-300">Espaço reservado</p>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-navy-950/80 px-6 py-4">
          <p className="font-serif text-[22px] text-white">Lucas Ramos Melo</p>
          <p className="text-[10px] leading-snug tracking-[0.05em] text-gray-300">Consultoria - Gestão - Automação de Processos</p>
        </div>
      </div>
    </div>
  );
}

export function ServiceCard({
  icon,
  title,
  text,
  topics,
  badge,
  lead,
  onSelect,
  index,
}: {
  icon: string;
  title: string;
  text: string;
  topics: string[];
  badge?: string;
  lead?: string;
  onSelect: () => void;
  index: number;
}) {
  const Icon = icons[icon];
  return (
    <article
      data-testid={`card-service-${index}`}
      className="group flex h-auto min-w-0 flex-col rounded-[14px] border border-white/10 bg-navy-850 p-6 transition-[transform,border-color] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/45 focus-within:border-gold/45 md:h-full md:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <Icon strokeWidth={1.5} className="h-9 w-9 text-gold transition-transform duration-[320ms] group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden />
        <span className="font-serif text-[22px] text-white/25">{String(index + 1).padStart(2, '0')}</span>
      </div>
      {badge && (
        <span className="mt-5 inline-flex max-w-full w-fit whitespace-normal break-words rounded-full border border-gold/25 bg-gold/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-soft">
          {badge}
        </span>
      )}
      <h3 className="mt-5 min-w-0 break-words text-[26px] leading-tight text-white md:text-[28px]">{title}</h3>
      {lead && <p className="mt-2 break-words font-serif text-[20px] italic text-gold-soft">{lead}</p>}
      <p className="mt-3 break-words text-gray-300">{text}</p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Tópicos de ${title}`}>
        {topics.map((t) => (
          <li key={t} className="min-w-0 max-w-full whitespace-normal break-words rounded-full border border-white/12 px-3 py-1 text-[14px] leading-snug text-gray-300">
            {t}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onSelect}
        className="mt-7 flex min-h-[44px] items-center gap-2 pt-0 text-[15px] font-bold text-gold hover:text-gold-hover md:mt-auto md:pt-8"
      >
        Conversar sobre isso
        <ArrowRight className="h-4 w-4 transition-transform duration-[320ms] group-hover:translate-x-1.5" aria-hidden />
      </button>
    </article>
  );
}

export function MetricCard({
  children,
  title,
  text,
  titleClassName,
}: {
  children?: ReactNode;
  title: string;
  text?: string;
  titleClassName?: string;
}) {
  return (
    <div className="relative h-full rounded-[14px] border border-white/8 bg-navy-800 p-6 sm:p-8">
      <span aria-hidden className="absolute left-6 top-0 h-[2px] w-10 bg-gold sm:left-8" />
      <p className={cn('break-words font-serif text-[28px] leading-[1.05] text-white sm:text-[34px] md:text-[44px]', titleClassName)}>{children ?? title}</p>
      {children && <p className="mt-2 text-[16px] font-semibold text-white">{title}</p>}
      {text && <p className="mt-2 break-words text-[15px] text-gray-300">{text}</p>}
    </div>
  );
}

export function TimelineItem({
  period,
  company,
  role,
  text,
  active,
}: {
  period: string;
  company: string;
  role: string;
  text?: string;
  active: boolean;
}) {
  return (
    <li
      className={cn(
        'relative grid gap-1 pb-12 pl-9 transition-[opacity,transform] duration-700 ease-out last:pb-0 md:grid-cols-[170px_1fr] md:gap-10 md:pl-0',
        active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-30',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute left-0 top-2 h-[15px] w-[15px] -translate-x-[7px] rounded-full border-2 transition-colors duration-500 md:left-[190px] md:-translate-x-[8px]',
          active ? 'border-gold bg-gold' : 'border-gray-300 bg-warm',
        )}
      />
      <p className="pt-0.5 text-[13px] font-bold uppercase tracking-[0.13em] text-gold-deep md:text-right">{period}</p>
      <div className="md:pl-12">
        <h3 className="text-[26px] leading-tight text-navy-950 md:text-[30px]">{company}</h3>
        <p className="mt-1 text-[16px] font-semibold text-blue-700">{role}</p>
        {text && <p className="mt-3 max-w-[620px] text-gray-700">{text}</p>}
      </div>
    </li>
  );
}
