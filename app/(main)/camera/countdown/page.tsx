// app/camera/countdown/page.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CameraCountdown() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(3);
  const [err, setErr] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let t: NodeJS.Timeout | null = null;

    (async () => {
      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: { ideal: 'user' },
            width: { ideal: 1080 },
            height: { ideal: 1920 },
            aspectRatio: { ideal: 9 / 16 },
            frameRate: { ideal: 30 },
          },
          audio: false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        const v = videoRef.current!;
        v.srcObject = stream;
        await v.play();

        // Contador 3-2-1
        t = setInterval(() => {
          setCount((c) => {
            if (c <= 1) {
              if (t) clearInterval(t);
              captureAndSave().catch(console.error);
              return 0;
            }
            return c - 1;
          });
        }, 1000);
      } catch (e) {
        console.error(e);
        setErr('Habilita la cámara y recarga la página.');
      }
    })();

    return () => {
      if (t) clearInterval(t);
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
    };
  }, []);

  /** Componer a 1080x1920: video en "cover" + marco PNG encima */
  async function composeFrame(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    frameSrc: string,
    targetW = 1080,
    targetH = 1920
  ) {
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    canvas.width = Math.round(targetW * dpr);
    canvas.height = Math.round(targetH * dpr);
    canvas.style.width = `${targetW}px`;
    canvas.style.height = `${targetH}px`;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const vw = video.videoWidth || targetW;
    const vh = video.videoHeight || targetH;

    // cover: escalar y recortar centrado
    const scale = Math.max(canvas.width / vw, canvas.height / vh);
    const sw = Math.round(canvas.width / scale);
    const sh = Math.round(canvas.height / scale);
    const sx = Math.floor((vw - sw) / 2);
    const sy = Math.floor((vh - sh) / 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    await new Promise<void>((resolve, reject) => {
      const frame = new Image();
      frame.crossOrigin = 'anonymous';
      frame.onload = () => {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        resolve();
      };
      frame.onerror = () => reject(new Error('No se pudo cargar el marco PNG'));
      // Usa el mismo arte que muestras detrás en la cámara (sin banda blanca):
      frame.src = '/assets/posicionate.png';
    });
  }

  /** Captura → compone → guarda en localStorage → navega a PREVIEW */
  const captureAndSave = async () => {
    try {
      const v = videoRef.current!;
      const c = canvasRef.current!;
      await composeFrame(v, c, '/assets/posicionate.png', 1080, 1920);

      // JPEG de alta calidad (menor peso que PNG para subir)
      const dataUrl = c.toDataURL('image/jpeg', 0.95);

      // Guarda para la preview
      localStorage.setItem('lastPhoto', dataUrl);

      // Apaga cámara para liberar recursos
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;

      // Ir a la pantalla de previsualización (Repetir / Siguiente)
      router.push('/camera/preview');
    } catch (e) {
      console.error(e);
      setErr('Error al capturar la foto.');
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Fondo/marco tal cual (misma imagen que usarás en la composición) */}
      <img
        src="/assets/posicionate.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Video en vivo */}
      <video
        ref={videoRef}
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Contador */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
            <span className="text-6xl md:text-7xl font-extrabold text-white">
              {count}
            </span>
          </div>
          {err && <p className="mt-4 text-red-300">{err}</p>}
        </div>
      </section>

      {/* Canvas oculto (1080x1920) */}
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}

