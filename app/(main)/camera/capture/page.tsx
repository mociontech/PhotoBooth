// app/camera/countdown/page.tsx (por ejemplo)
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/firebase'; // 👈 usamos el mismo módulo
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function CameraCapture() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(3);
  const [err, setErr] = useState<string | null>(null);
  const overlayRef = useRef<HTMLImageElement | null>(null);

  // Pre-carga del PNG de marco
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/posicionate.png';
    img.crossOrigin = 'anonymous';
    overlayRef.current = img;
  }, []);

  // Arranca cámara + contador
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

    const v = videoRef.current;
    const c = canvasRef.current;
    const frameImg = overlayRef.current;

    if (!v || !c || !frameImg) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    // Tamaño final fijo (mismo de tu arte)
    const TARGET_W = 1080;
    const TARGET_H = 1920;
    c.width = TARGET_W;
    c.height = TARGET_H;

    // Asegurarnos de que el PNG está listo
    await ensureImageLoaded(frameImg);

    ctx.clearRect(0, 0, TARGET_W, TARGET_H);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1) Dibujar primero TODO el marco (fondo + logo + regalos)
    ctx.drawImage(frameImg, 0, 0, TARGET_W, TARGET_H);

    // 2) Definir el rectángulo donde va la foto,
    //    MÁS ABAJO para que se vea el logo.
    //    (ajusta estos números si quieres subir/bajar un poco más)
    const FRAME_X = 120;     // margen lateral
    const FRAME_Y = 500;     // ⬅️ bajé este valor (antes más pequeño)
    const FRAME_W = TARGET_W - FRAME_X * 2;
    const FRAME_H = 1000;    // ⬅️ altura útil de la foto

    // Medidas del video
    const vw = v.videoWidth || 1080;
    const vh = v.videoHeight || 1920;

    // Escalar el video para llenar el rectángulo (tipo cover)
    const scale = Math.max(FRAME_W / vw, FRAME_H / vh);
    const drawW = vw * scale;
    const drawH = vh * scale;

    const drawX = FRAME_X + (FRAME_W - drawW) / 2;
    const drawY = FRAME_Y + (FRAME_H - drawH) / 2;

    // Si quieres espejo, descomenta este bloque y comenta el drawImage normal
    /*
    ctx.save();
    ctx.translate(drawX + drawW, drawY);
    ctx.scale(-1, 1);
    ctx.drawImage(v, 0, 0, vw, vh, 0, 0, drawW, drawH);
    ctx.restore();
    */

    // Video normal (no espejo)
    ctx.drawImage(v, drawX, drawY, drawW, drawH);

    // 3) Exportar foto final (marco + video recortado)
    const dataUrl = c.toDataURL('image/jpeg', 0.92);

    // Guardar para /camera/preview
    localStorage.setItem('lastPhoto', dataUrl);

    router.push('/camera/preview');
  } catch (e) {
    console.error(e);
    setErr('Error al capturar la foto.');
  }
};


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

      {/* Marco en pantalla */}
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
            fontSize: '28vmin',
            color: '#888888',
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            lineHeight: 1,
          }}
        >
          {count}
        </span>
      </div>

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

      {/* Canvas oculto */}
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}

