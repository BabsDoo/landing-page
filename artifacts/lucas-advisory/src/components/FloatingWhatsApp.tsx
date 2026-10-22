import { openChannel } from '@/lib/actions';

export function FloatingWhatsApp() {
  return (
    <button
      type="button"
      onClick={() => openChannel('whatsapp')}
      aria-label="Falar pelo WhatsApp"
      title="Falar pelo WhatsApp"
      data-testid="button-floating-whatsapp"
      className="whatsapp-floating-pulse fixed bottom-5 right-5 z-40 inline-flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <svg className="relative z-[1] h-9 w-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.273.298-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.693.626.711.226 1.358.194 1.87.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 0C5.495 0 .16 5.335.157 11.89c-.001 2.096.547 4.142 1.588 5.946L.057 24l6.31-1.656a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.89a11.82 11.82 0 0 0-3.484-8.407A11.815 11.815 0 0 0 12.05 0m.005 21.75h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.82 9.82 0 0 1-1.5-5.255c.002-5.45 4.437-9.884 9.888-9.884 2.64.001 5.122 1.03 6.987 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.88-9.895 9.88" />
      </svg>
    </button>
  );
}
