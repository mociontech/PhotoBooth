// app/camera/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function CameraIntro() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen text-white">
      {/* Fondo completo */}
      <img
        src="/assets/fonfoooooooooo.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <section className="relative z-10 min-h-screen">
        {/* PILL: MUCHO más grande */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            top-[38vh] md:top-[36vh]
            px-8 md:px-10 lg:px-12
            py-4 md:py-4.5 lg:py-5
            rounded-full
            bg-[#595959]/85
            shadow-[0_10px_28px_rgba(0,0,0,.35)]
            whitespace-nowrap
            text-[#9F9F9F]
            text-[26px] md:text-[30px] lg:text-[34px]
            font-bold tracking-wide
          "
        >
          Posiciónate dentro del marco
        </div>

        {/* Botón: más angosto y sin tocar la línea del marco */}
        <div className="absolute inset-x-0 bottom-[12vh] flex justify-center px-6">
          <button
            onClick={() => router.push('/camera/countdown')}
            className="
              w-full
              max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem]
              h-14 md:h-[3.5rem] lg:h-[3.75rem]
              rounded-full
              bg-[#C9961A]
              text-white
              text-[18px] md:text-[20px] lg:text-[22px]
              font-extrabold
              shadow-[0_10px_28px_rgba(0,0,0,.35)]
              hover:brightness-110 active:scale-95 transition
            "
          >
            Tomar la Foto
          </button>
        </div>
      </section>
    </main>
  );
}
