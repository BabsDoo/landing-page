import { useEffect, useRef } from 'react';
import originalMonogram from '@assets/monograma_LRM_vetor_1791161554544.svg';
import { gsap, ScrollTrigger, prefersReducedMotion, isMobile } from '@/lib/gsap';

const maskStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color,
  maskImage: `url("${originalMonogram}")`,
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskImage: `url("${originalMonogram}")`,
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

// depth layers: far -> near. [size vw-ish, final opacity, start scale]
const layers = [
  { cls: 'w-[min(52vw,560px)]', o: 0.1, from: 0.45, mobile: true },
  { cls: 'w-[min(78vw,860px)]', o: 0.055, from: 0.6, mobile: false },
  { cls: 'w-[min(125vw,1400px)]', o: 0.03, from: 0.75, mobile: true },
];

/** Monograma LRM em camadas de profundidade, aproximando-se atrás do conteúdo do hero. */
export function HeroMonogramEntrance() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduce = prefersReducedMotion();
    const mobile = isMobile();

    const ctx = gsap.context(() => {
      const ls = q('[data-layer]') as HTMLElement[];
      const frames = q('[data-frame]');
      const glow = q('[data-glow]');

      if (reduce) {
        ls.forEach((l, i) => gsap.set(l, { opacity: layers[i].o * 1.2, scale: 1 }));
        gsap.set(frames, { opacity: 0.08, scale: 1 });
        gsap.set(glow, { opacity: 1 });
        return;
      }

      gsap.set(ls, { opacity: 0, scale: (i: number) => layers[i].from });
      gsap.set(frames, { opacity: 0, scale: 0.5 });
      gsap.set(glow, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(glow, { opacity: 1, duration: 2.4 }, 0)
        .to(frames, { opacity: (i: number) => 0.14 - i * 0.04, scale: 1, duration: 2.8, stagger: 0.25, ease: 'expo.out' }, 0.1)
        .to(ls, { opacity: (i: number) => layers[i].o, scale: 1, duration: 3.2, stagger: 0.22, ease: 'expo.out' }, 0.15);

      // ambient: slow, restrained approach drift, paused out of view
      const ambient = gsap.timeline({ repeat: -1, yoyo: true, paused: true, defaults: { ease: 'sine.inOut' } });
      ls.forEach((l, i) => ambient.to(l, { scale: 1 + 0.035 * (i + 1), duration: 9 }, 0));
      if (!mobile) ambient.to(frames, { scale: 1.05, duration: 9 }, 0);
      const visibility = ScrollTrigger.create({
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (!tl.isActive() && tl.progress() === 1) self.isActive ? ambient.play() : ambient.pause();
        },
      });
      tl.eventCallback('onComplete', () => {
        if (visibility.isActive) ambient.play();
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        data-glow
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(200,154,75,0.10), rgba(200,154,75,0) 70%)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            data-frame
            className={`absolute rounded-t-[999px] border border-gold/60 will-change-transform ${i > 0 ? 'hidden sm:block' : ''}`}
            style={{ width: `${34 + i * 16}vmin`, height: `${58 + i * 22}vmin` }}
          />
        ))}
        {layers.map((l, i) => (
          <div
            key={i}
            data-layer
            className={`absolute aspect-square will-change-transform ${l.cls} ${l.mobile ? '' : 'hidden sm:block'}`}
            style={maskStyle(i === 0 ? '#E5C88B' : '#C89A4B')}
          />
        ))}
      </div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(7,17,31,0.55), rgba(7,17,31,0) 65%)' }} />
    </div>
  );
}
