import { siteConfig } from '@/config/site';

export interface LeadPayload {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  service: string;
  need: string;
  message: string;
}

export class LeadSubmitError extends Error {}

/**
 * Envia os dados validados ao endpoint Formspree configurado.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const endpoint = siteConfig.formEndpoint.trim();
  if (!endpoint) throw new LeadSubmitError('O serviço de recebimento do formulário não está configurado.');
  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new LeadSubmitError('Não foi possível conectar ao serviço de envio. Verifique sua conexão e tente novamente.');
  }
  if (!res.ok) {
    let detail = '';
    try {
      const data: { errors?: { message?: string }[] } = await res.json();
      detail = data.errors?.map((error) => error.message).filter(Boolean).join(' ') ?? '';
    } catch {
      // Use the generic message below when Formspree returns no JSON details.
    }
    throw new LeadSubmitError(
      detail ||
        `O serviço de envio respondeu com erro (${res.status}). Sua solicitação não foi entregue; tente novamente.`,
    );
  }
}
