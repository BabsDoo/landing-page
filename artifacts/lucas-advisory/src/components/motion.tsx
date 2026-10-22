import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion, isMobile } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** anima os filhos diretos em sequência (0.08s) */
  stagger?: boolean;
  /** dispara no carregamento, sem ScrollTrigger */
  immediate?: boolean;
}

export function Reveal({ children, className, delay = 0, y, stagger, immediate }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const dy = (y ?? (stagger ? 36 : 32)) * (isMobile() ? 0.5 : 1);
    const ctx = gsap.context(() => {
      gsap.from(stagger ? Array.from(el.children) : el, {
        opacity: 0,
        y: dy,
        duration: 0.8,
        ease: 'power3.out',
        delay,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y, stagger, immediate]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Título com revelação em linhas mascaradas (0.9s, stagger 0.10s). */
export function HeadlineReveal({
  lines,
  as: Tag = 'h2',
  className,
  delay = 0,
  immediate,
  id,
}: {
  lines: ReactNode[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  immediate?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.hl-line'), {
        yPercent: 110,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, immediate]);
  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span className="hl-line block">{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(prefersReducedMotion() ? to : 0);
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const o = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(o, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: () => setVal(Math.round(o.v)) }),
    });
    return () => st.kill();
  }, [to]);
  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      {val}
      {suffix}
    </span>
  );
}

/** Progresso 0..1 do scroll sobre um contêiner, para linhas progressivas. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, start = 'top 72%', end = 'bottom 60%') {
  const [p, setP] = useState(prefersReducedMotion() ? 1 : 0);
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      onUpdate: (s) => setP(Math.round(s.progress * 500) / 500),
    });
    return () => st.kill();
  }, [ref, start, end]);
  return p;
}

/** Linha dourada preenchida pelo scroll. */
export function ProgressLine({ p, axis, className }: { p: number; axis: 'x' | 'y'; className?: string }) {
  return (
    <span aria-hidden className={cn('absolute bg-navy-950/10', className)}>
      <span
        className={cn('absolute inset-0 bg-gold', axis === 'x' ? 'origin-left' : 'origin-top')}
        style={{ transform: axis === 'x' ? `scaleX(${p})` : `scaleY(${p})` }}
      />
    </span>
  );
}
