// app/(main)/qr/QrClient.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function QrClient() {
  const params = useSearchParams();
  const router = useRouter();
  const url = params.get('url') || '';

  return (
    <main className="relative min-h-screen text-white">
      {/* Fondo con texto ya incluido */}
      <img
        src="/assets/Resultado.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Solo QR centrado en pantalla */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {url && (
          <>
            <div className="bg-white p-4 md:p-5 rounded-2xl shadow-2xl">
              <QRCode value={url} size={260} />
            </div>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 underline underline-offset-4 hover:opacity-90"
            >
              Abrir / Descargar
            </a>
          </>
        )}
      </section>

      {/* Botón grande, un poco más arriba del borde inferior */}
      <button
        onClick={() => router.push('/')}
        className="
          absolute left-1/2 bottom-64 -translate-x-1/2
          px-24 h-22 md:px-20 md:h-16
          rounded-full bg-[#C9961A] text-white
          text-lg md:text-xl font-semibold
          shadow-lg hover:brightness-110 active:scale-95 transition
        "
      >
        Volver al inicio
      </button>
    </main>
  );
}
