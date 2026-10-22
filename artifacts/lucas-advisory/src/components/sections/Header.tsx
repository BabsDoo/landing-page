import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav } from '@/content/content';
import { cn } from '@/lib/utils';
import { Logo, Button } from '../primitives';
import { goToContact } from '@/lib/actions';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  const solid = scrolled || open;
  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-[320ms]',
        solid ? 'border-white/15 bg-navy-950/95 backdrop-blur-[18px]' : 'border-white/10 bg-navy-950/75 backdrop-blur-[18px]',
      )}
    >
      <div className="mx-auto flex h-[96px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <a href="#hero" aria-label="Lucas Ramos Melo — início" onClick={() => setOpen(false)} className="rounded-[8px]">
          <Logo />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-2 xl:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`link-nav-${n.href.slice(1)}`}
              className="flex min-h-[50px] items-center rounded-[8px] border border-white/10 bg-white/[0.035] px-3.5 text-[16px] font-semibold text-white/90 transition-[transform,background-color,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-white/[0.08] hover:text-gold-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {n.label}
            </a>
          ))}
          <Button className="ml-2 min-h-[56px] px-7 text-[16px] shadow-[0_8px_24px_rgba(200,154,75,0.18)]" onClick={() => goToContact()} data-testid="button-nav-cta">
            Solicitar orçamento
          </Button>
        </nav>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/25 bg-white/[0.04] text-white transition-colors hover:border-gold/50 hover:text-gold-soft xl:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
          data-testid="button-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-96px)] overflow-y-auto border-t border-white/10 bg-navy-950 px-5 pb-10 pt-6 xl:hidden"
      >
        <nav aria-label="Principal (mobile)" className="flex flex-col">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="my-1 flex min-h-[60px] items-center rounded-[8px] border border-white/10 bg-white/[0.035] px-4 font-serif text-[30px] text-white transition-colors hover:border-gold/40 hover:bg-white/[0.07]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <Button
          className="mt-8 min-h-[56px] w-full text-[16px]"
          onClick={() => {
            setOpen(false);
            setTimeout(() => goToContact(), 50);
          }}
        >
          Solicitar orçamento
        </Button>
      </div>
    </header>
  );
}
