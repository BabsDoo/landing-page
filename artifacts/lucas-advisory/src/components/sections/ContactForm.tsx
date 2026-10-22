import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, CheckCircle2, ChevronDown, Loader2, MessageCircle } from 'lucide-react';
import { Container, Section, Button } from '../primitives';
import { Reveal } from '../motion';
import { SectionHeader } from '../cards';
import { needOptions, serviceOptions } from '@/content/content';
import { submitLead } from '@/lib/lead';
import { openChannel, type Prefill } from '@/lib/actions';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.'),
  company: z.string().trim().min(2, 'Informe sua empresa ou escritório.'),
  email: z.string().trim().email('Informe um e-mail válido.'),
  whatsapp: z.string().refine((v) => v.replace(/\D/g, '').length >= 10, 'Informe um WhatsApp com DDD.'),
  service: z.string().min(1, 'Selecione como posso ajudar.'),
  need: z.string({ required_error: 'Indique o tipo de necessidade.' }).min(1, 'Indique o tipo de necessidade.'),
  message: z.string().trim().min(10, 'Conte um pouco mais sobre o desafio (mínimo de 10 caracteres).'),
});
type Values = z.infer<typeof schema>;

const field =
  'mt-2 w-full min-h-[52px] rounded-[8px] border border-white/20 bg-navy-850 px-4 text-[16px] text-white placeholder:text-gray-500 transition-colors hover:border-white/40 focus:border-gold';

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-gray-300">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-[14px] text-[#E39593]">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', company: '', email: '', whatsapp: '', service: '', need: '', message: '' },
  });
  const need = watch('need');

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<Prefill>).detail;
      if (d.service) setValue('service', d.service, { shouldValidate: true });
      if (d.need) setValue('need', d.need, { shouldValidate: true });
    };
    window.addEventListener('lead:prefill', on);
    return () => window.removeEventListener('lead:prefill', on);
  }, [setValue]);

  const onSubmit = async (values: Values) => {
    setStatus('loading');
    try {
      await submitLead(values);
      setStatus('success');
      reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Não foi possível enviar sua solicitação.');
      setStatus('error');
    }
  };

  return (
    <Section id="contato" theme="dark" labelledBy="contact-title">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[4fr_6fr] lg:gap-24">
          <div>
            <SectionHeader id="contact-title" eyebrow="Contato" lines={['Vamos entender', 'sua necessidade.']} intro="Quanto mais claro o contexto, mais objetiva a conversa. Se preferir, fale diretamente pelo WhatsApp." />
            <Reveal delay={0.2}>
              <Button variant="secondary" className="mt-8" onClick={() => openChannel('whatsapp')} data-testid="button-contact-whatsapp">
                <MessageCircle className="h-4 w-4" aria-hidden /> Falar pelo WhatsApp
              </Button>
              <p className="mt-5 text-[14px] text-gray-300">Contagem — MG • Atendimento remoto</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            {status === 'success' ? (
              <div role="status" className="rounded-[18px] border border-gold/30 bg-navy-850 p-10" data-testid="status-form-success">
                <CheckCircle2 className="h-9 w-9 text-gold" strokeWidth={1.5} aria-hidden />
                <p className="mt-5 font-serif text-[30px] leading-tight text-white">
                  Obrigado. Recebi suas informações e entrarei em contato para entender melhor a demanda.
                </p>
                <Button variant="text" className="mt-6" onClick={() => setStatus('idle')}>Enviar outra solicitação</Button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit(onSubmit)} className="rounded-[18px] border border-white/10 bg-navy-900 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:p-10" aria-busy={status === 'loading'}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="name" label="Nome" error={errors.name?.message}>
                    <input id="name" autoComplete="name" aria-invalid={!!errors.name} className={field} {...register('name')} data-testid="input-name" />
                  </Field>
                  <Field id="company" label="Empresa / Escritório" error={errors.company?.message}>
                    <input id="company" autoComplete="organization" aria-invalid={!!errors.company} className={field} {...register('company')} data-testid="input-company" />
                  </Field>
                  <Field id="email" label="E-mail" error={errors.email?.message}>
                    <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={field} {...register('email')} data-testid="input-email" />
                  </Field>
                  <Field id="whatsapp" label="WhatsApp" error={errors.whatsapp?.message}>
                    <input id="whatsapp" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={!!errors.whatsapp} className={field} {...register('whatsapp')} data-testid="input-whatsapp" />
                  </Field>
                </div>
                <div className="mt-6">
                  <Field id="service" label="Como posso ajudar?" error={errors.service?.message}>
                    <div className="relative">
                      <select id="service" aria-invalid={!!errors.service} className={cn(field, 'appearance-none pr-12')} {...register('service')} data-testid="select-service">
                        <option value="">Selecione uma opção</option>
                        {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 mt-1 h-5 w-5 -translate-y-1/2 text-gold" aria-hidden />
                    </div>
                  </Field>
                </div>
                <fieldset className="mt-6">
                  <legend className="text-[14px] font-semibold text-gray-300">Sua necessidade é:</legend>
                  <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {needOptions.map((o) => (
                      <label key={o} className={cn('flex min-h-[48px] cursor-pointer items-center justify-center rounded-[8px] border px-3 text-center text-[15px] font-semibold transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-gold', need === o ? 'border-gold bg-gold/12 text-gold-soft' : 'border-white/20 text-gray-300 hover:border-white/40')}>
                        <input type="radio" value={o} className="sr-only" {...register('need')} />
                        {o}
                      </label>
                    ))}
                  </div>
                  {errors.need && <p role="alert" className="mt-1.5 text-[14px] text-[#E39593]">{errors.need.message}</p>}
                </fieldset>
                <div className="mt-6">
                  <Field id="message" label="Conte brevemente o desafio" error={errors.message?.message}>
                    <textarea id="message" rows={5} aria-invalid={!!errors.message} className={cn(field, 'py-3')} {...register('message')} data-testid="input-message" />
                  </Field>
                </div>
                {status === 'error' && (
                  <div role="alert" className="mt-6 flex gap-3 rounded-[8px] border border-danger/60 bg-danger/10 p-4 text-[15px] text-white" data-testid="status-form-error">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#E39593]" aria-hidden />
                    <p>{errorMsg}</p>
                  </div>
                )}
                <Button type="submit" disabled={status === 'loading'} className="mt-8 w-full sm:w-auto" data-testid="button-submit-form">
                  {status === 'loading' ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando…</>) : status === 'error' ? 'Tentar novamente' : 'Enviar solicitação'}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
