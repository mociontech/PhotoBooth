'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function QRPage() {
  const params = useSearchParams();
  const router = useRouter();
  const url = params.get('url') || '';

  return (
    <main className="relative min-h-screen text-white">
      {/* Fondo tal cual (con textos ya en la imagen) */}
      <img
        src="/assets/Resultado.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Contenido centrado para el QR */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-xl text-center flex flex-col items-center">
          {/* QR */}
          <div className="bg-white/95 p-4 md:p-5 rounded-2xl inline-block shadow-2xl">
            <QRCode value={url || 'about:blank'} size={320} />
          </div>

          {/* Abrir / Descargar */}
          {url && (
            <p className="mt-3">
              <a
                className="underline underline-offset-4 hover:opacity-90"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                Abrir / Descargar
              </a>
            </p>
          )}
        </div>

        {/* BOTÓN ANCLADO ABAJO, CENTRADO */}
        <div
          className="
            absolute inset-x-0 
            bottom-[7vh]                              /* ⬅️ baja/sube aquí */
            pb-[env(safe-area-inset-bottom)]          /* respeta notch */
            flex justify-center
          "
        >
          <button
            onClick={() => router.push('/')}
            className="
              w-[min(85vw,420px)]                     /* ancho responsivo */
              h-14 md:h-16
              rounded-full bg-[#C9961A] text-white
              text-[20px] md:text-[22px] lg:text-[24px]
              font-extrabold shadow-lg
              hover:brightness-110 active:scale-95 transition
            "
          >
            Volver al inicio
          </button>
        </div>
      </section>
    </main>
  );
}
