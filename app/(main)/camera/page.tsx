// app/(main)/camera/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CameraIntro() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Encender cámara al entrar
  useEffect(() => {
    let stream: MediaStream;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (e) {
        console.error(e);
        setErr('Activa el permiso de cámara para continuar.');
      }
    })();

    return () => {
      // Apagar cámara al salir
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* FONDO con el marco blanco grande */}
      <img
        src="/assets/posicionate.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
      />

      {/* CÁMARA dentro del marco blanco */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="
            w-[64vw] max-w-[750px]
            aspect-[9/16]
            rounded-[60px]
            overflow-hidden
            bg-black
          "
        >
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* BOTÓN TOMAR LA FOTO -> va a /camera/countdown */}
      <div className="absolute inset-x-0 bottom-[22vh] flex justify-center px-6">
        <button
          onClick={() => router.push('/camera/countdown')}
          className="
            w-full
            max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem]
            h-14 md:h-[3.5rem] lg:h-[3.75rem]
            rounded-full
            bg-[#C1A56C]
            text-black
            text-[18px] md:text-[20px] lg:text-[22px]
            font-extrabold
            shadow-[0_10px_28px_rgba(0,0,0,.35)]
            hover:brightness-110 active:scale-95 transition
          "
        >
          Tomar la Foto
        </button>
      </div>

      {err && (
        <p className="absolute bottom-6 w-full text-center text-red-300 text-sm md:text-base">
          {err}
        </p>
      )}
    </main>
  );
}



