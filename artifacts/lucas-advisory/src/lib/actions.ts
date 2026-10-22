import { siteConfig } from '@/config/site';
import { toast } from '@/hooks/use-toast';

export type Channel = 'email' | 'whatsapp' | 'linkedin';

const labels: Record<Channel, string> = {
  email: 'O e-mail',
  whatsapp: 'O WhatsApp',
  linkedin: 'O LinkedIn',
};
const keys: Record<Channel, string> = {
  email: 'email',
  whatsapp: 'whatsapp',
  linkedin: 'linkedin',
};

export function isConfigured(c: Channel) {
  return siteConfig[c].trim().length > 0;
}

/** Abre o canal se configurado; caso contrário informa honestamente. */
export function openChannel(c: Channel) {
  if (!isConfigured(c)) {
    toast({
      variant: 'destructive',
      title: `${labels[c]} ainda não foi configurado`,
      description: `Defina "${keys[c]}" em src/config/site.ts para ativar este canal. Enquanto isso, use o formulário de contato.`,
    });
    return;
  }
  const v = siteConfig[c].trim();
  if (c === 'email') window.location.href = `mailto:${v}`;
  else if (c === 'whatsapp')
    window.open(
      `https://wa.me/${v.replace(/\D/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`,
      '_blank',
      'noopener,noreferrer',
    );
  else window.open(v, '_blank', 'noopener,noreferrer');
}

export interface Prefill {
  service?: string;
  need?: string;
}

/** Rola até o formulário e pré-seleciona opções. */
export function goToContact(prefill?: Prefill) {
  if (prefill) window.dispatchEvent(new CustomEvent('lead:prefill', { detail: prefill }));
  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
}
