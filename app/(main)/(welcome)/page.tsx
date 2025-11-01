// app/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/WELCOME.png)' }}
      />
      {/* Degradado muy sutil (opcional) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.10) 100%)',
        }}
      />

      <section className="relative z-10 min-h-screen">
        {/* Botón más alto, texto grande y color #C9961A; posición más arriba */}
        <div className="absolute inset-x-0 bottom-[22vh] px-8 pb-[env(safe-area-inset-bottom)] flex justify-center">
          <button
            onClick={() => router.push('/camera')}
            className="w-full max-w-2xl h-[72px] rounded-full
                       bg-[#C9961A] text-white text-4xl md:text-5xl font-extrabold
                       tracking-tight shadow-lg shadow-[rgba(201,150,26,0.35)]
                       hover:brightness-110 active:scale-95 transition"
            aria-label="Ir a la cámara"
          >
            ¡Verme Ahora!
          </button>
        </div>
      </section>
    </main>
  );
}
