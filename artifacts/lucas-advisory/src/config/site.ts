/**
 * Configuração única de contato e envio.
 * Preencha os valores abaixo (ou use variáveis VITE_*) para ativar os canais.
 * Nada aqui foi inventado: campos vazios exibem aviso honesto ao visitante.
 */
export const siteConfig = {
  /** E-mail profissional, ex.: "contato@seudominio.com.br" */
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? '',
  /** WhatsApp só com dígitos e DDI, ex.: "5531900000000" */
  whatsapp: (import.meta.env.VITE_CONTACT_WHATSAPP as string | undefined) ?? '5531995265544',
  /** URL completa do LinkedIn */
  linkedin: (import.meta.env.VITE_CONTACT_LINKEDIN as string | undefined) ?? '',
  /** Endpoint Formspree; pode ser substituído por VITE_FORM_ENDPOINT no ambiente. */
  formEndpoint:
    (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ??
    'https://formspree.io/f/mrppzdwj',
  whatsappMessage: 'Olá, Lucas. Vim pelo seu site e gostaria de conversar sobre uma demanda.',
  city: 'Contagem — MG',
};
