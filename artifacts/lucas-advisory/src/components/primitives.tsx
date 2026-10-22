import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import originalMonogram from '@assets/monograma_LRM_vetor_1791161554544.svg';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-[1320px] px-5 sm:px-8', className)}>
      {children}
    </div>
  );
}

export type Theme = 'dark' | 'light' | 'deep';

export function Section({
  id,
  theme,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  theme: Theme;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const bg = theme === 'dark' ? 'bg-navy-950 text-white' : theme === 'deep' ? 'bg-navy-900 text-white' : 'bg-warm text-navy-950';
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative overflow-hidden py-[72px] md:py-[120px]', bg, className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, theme = 'dark', className }: { children: ReactNode; theme?: Theme; className?: string }) {
  const light = theme === 'light';
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.13em]',
        light ? 'text-blue-700' : 'text-gold',
        className,
      )}
    >
      <span aria-hidden className={cn('h-px w-8', light ? 'bg-gold-deep' : 'bg-gold')} />
      {children}
    </p>
  );
}

/** Monograma LRM original, em champanhe, sobre o azul-marinho da marca. */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block shrink-0 rounded-[8px] border border-gold/55 p-[3px]', className)}
      style={{ width: size, height: size }}
    >
      <span
        className="block h-full w-full"
        style={{
          backgroundColor: '#C89A4B',
          maskImage: `url("${originalMonogram}")`,
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          maskSize: 'contain',
          WebkitMaskImage: `url("${originalMonogram}")`,
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
        }}
      />
    </span>
  );
}

export function Logo({ variant = 'header' }: { variant?: 'header' | 'footer' }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark size={variant === 'header' ? 56 : 54} />
      <span className="flex flex-col leading-none">
        {variant === 'header' ? (
          <>
            <span className="text-[18px] font-bold tracking-[0.15em] text-white">LUCAS RAMOS MELO</span>
            <span className="mt-1.5 max-w-[185px] text-[11px] font-semibold leading-snug tracking-[0.05em] text-gold-soft sm:max-w-none sm:whitespace-nowrap">
              Consultoria - Gestão - Automação de Processos
            </span>
          </>
        ) : (
          <>
            <span className="font-serif text-[28px] font-medium text-white">Lucas Ramos Melo</span>
            <span className="mt-1.5 max-w-[300px] text-[11px] leading-snug tracking-[0.05em] text-gray-300">
              Consultoria - Gestão - Automação de Processos
            </span>
          </>
        )}
      </span>
    </span>
  );
}

type Variant = 'primary' | 'secondary' | 'secondaryLight' | 'text';

const base =
  'group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[8px] px-7 text-[15px] font-bold transition-[transform,background-color,border-color,color] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-60';
const variants: Record<Variant, string> = {
  primary: 'bg-gold text-navy-950 hover:-translate-y-0.5 hover:bg-gold-hover',
  secondary: 'border border-white/30 bg-transparent text-white hover:-translate-y-0.5 hover:border-gold hover:text-gold-soft',
  secondaryLight: 'border border-navy-950/25 text-navy-950 hover:-translate-y-0.5 hover:border-blue-700 hover:text-blue-700',
  text: 'min-h-[44px] px-0 text-gold hover:text-gold-hover',
};

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
