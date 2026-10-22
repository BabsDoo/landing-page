import { Container, Logo } from '../primitives';
import { footerNav } from '@/content/content';
import { openChannel, type Channel } from '@/lib/actions';

const channels: { c: Channel; label: string }[] = [
  { c: 'email', label: 'E-mail' },
  { c: 'whatsapp', label: 'WhatsApp' },
  { c: 'linkedin', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-ink py-16 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="footer" />
            <p className="mt-5 max-w-[320px] text-[15px] text-gray-300">Consultoria Fiscal • Tributária • Empresarial</p>
          </div>
          <nav aria-label="Rodapé">
            <ul>
              {footerNav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="flex min-h-[44px] items-center text-[15px] text-gray-300 hover:text-gold-soft">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="flex min-h-[44px] items-center text-[15px] text-white">Contagem — MG</p>
            {channels.map(({ c, label }) => (
              <button key={c} type="button" onClick={() => openChannel(c)} data-testid={`button-footer-${c}`} className="flex min-h-[44px] items-center text-[15px] text-gray-300 hover:text-gold-soft">
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-14 border-t border-white/10 pt-6 text-[14px] text-gray-500">© 2026 Lucas Ramos Melo. Todos os direitos reservados.</p>
      </Container>
    </footer>
  );
}
