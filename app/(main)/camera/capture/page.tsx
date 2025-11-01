'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFirebaseApp } from '@/lib/firebase';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function CameraCapture() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(3);
  const [err, setErr] = useState<string | null>(null);
  const overlayRef = useRef<HTMLImageElement | null>(null);

  // Pre-carga del PNG de marco (para dibujarlo en el canvas)
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/posicionate.png';          // <-- tu archivo de marco
    img.crossOrigin = 'anonymous';
    overlayRef.current = img;
  }, []);

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

        // Conteo 3 → 2 → 1
        const t = setInterval(() => {
          setCount((c) => {
            if (c <= 1) {
              clearInterval(t);
              captureAndUpload().catch(console.error);
              return 0;
            }
            return c - 1;
          });
        }, 1000);
      } catch {
        setErr('Habilita la cámara en el navegador.');
      }
    })();

    return () => stream?.getTracks().forEach((tr) => tr.stop());
  }, []);

  const captureAndUpload = async () => {
    try {
      setErr(null);

      const v = videoRef.current!;
      const c = canvasRef.current!;
      const ctx = c.getContext('2d')!;
      const w = v.videoWidth || 1080;
      const h = v.videoHeight || 1440;

      c.width = w;
      c.height = h;

      // Dibuja el frame de video
      // (Selfie espejada opcional: descomenta las 2 líneas)
      // ctx.translate(w, 0); ctx.scale(-1, 1);
      ctx.drawImage(v, 0, 0, w, h);

      // Dibuja el MARCO encima (queda “impreso” en la foto final)
      await ensureImageLoaded(overlayRef.current);
      if (overlayRef.current) {
        ctx.drawImage(overlayRef.current, 0, 0, w, h);
      }

      // Exporta y sube
      const dataUrl = c.toDataURL('image/jpeg', 0.92);
      const storage = getStorage(getFirebaseApp());
      const storageRef = ref(storage, `photos/${Date.now()}.jpg`);
      await uploadString(storageRef, dataUrl, 'data_url');
      const url = await getDownloadURL(storageRef);

      router.push(`/qr?url=${encodeURIComponent(url)}`);
    } catch (e) {
      console.error(e);
      setErr('Error al capturar o subir la foto.');
    }
  };

  // Espera a que el PNG del marco esté cargado (por si la red se demora)
  function ensureImageLoaded(img: HTMLImageElement | null) {
    return new Promise<void>((resolve) => {
      if (!img) return resolve();
      if (img.complete) return resolve();
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Cámara en vivo */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />

      {/* MARCO en pantalla (mismo PNG que se imprime en el canvas) */}
      <img
        src="/assets/posicionate.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Conteo 3-2-1 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <span
          className="font-extrabold"
          style={{
            fontSize: '28vmin',         // grande y responsivo
            color: '#888888',           // gris
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            lineHeight: 1,
          }}
        >
          {count}
        </span>
      </div>

      {/* Error / Volver */}
      {err && (
        <p className="absolute bottom-6 w-full text-center text-red-300 z-10">
          {err}
        </p>
      )}
      <button
        onClick={() => router.push('/camera')}
        className="absolute top-5 left-5 z-10 rounded-full px-4 py-2 bg-white/10 text-white border border-white/30 hover:bg-white/20"
      >
        Volver
      </button>

      {/* Canvas oculto para componer la foto final */}
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
