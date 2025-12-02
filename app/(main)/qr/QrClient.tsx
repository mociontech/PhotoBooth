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
      {/* Fondo */}
      <img
        src="/assets/Resultado.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {url && (
          <div className="bg-white p-4 rounded-2xl shadow-2xl">
            <QRCode value={url} size={320} />
          </div>
        )}

        {url && (
          <p className="mt-3">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Abrir / Descargar
            </a>
          </p>
        )}

        <button
          onClick={() => router.push('/')}
          className="mt-8 px-10 h-12 rounded-full bg-[#C9961A] text-white font-semibold shadow-lg hover:brightness-110 active:scale-95 transition"
        >
          Volver al inicio
        </button>
      </section>
    </main>
  );
}
