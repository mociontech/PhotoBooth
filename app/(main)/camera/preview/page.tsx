'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFirebaseApp } from '@/lib/firebase';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function CameraPreview() {
  const router = useRouter();
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const d = localStorage.getItem('lastPhoto');
    if (!d) {
      router.replace('/camera');
      return;
    }
    setDataUrl(d);
  }, [router]);

  const handleRetake = () => {
    localStorage.removeItem('lastPhoto');
    router.replace('/camera');
  };

  const handleNext = async () => {
    if (!dataUrl) return;
    setErr(null);
    setUploading(true);
    try {
      const app = getFirebaseApp();
      const storage = getStorage(app);
      const r = ref(storage, `photos/${Date.now()}.jpg`);
      await uploadString(r, dataUrl, 'data_url');
      const publicUrl = await getDownloadURL(r);
      localStorage.removeItem('lastPhoto');
      router.push(`/qr?url=${encodeURIComponent(publicUrl)}`);
    } catch (e) {
      console.error(e);
      setErr('No se pudo subir la foto. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="relative min-h-screen text-white">
      {/* FONDO IGUAL AL DE OTRAS PANTALLAS */}
      <img
        src="/assets/fonfoooooooooo.jpg"  // o el que estés usando como fondo “negro con destellos”
        alt=""
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />
      {/* (opcional) leve oscurecido para dar contraste */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* CONTENIDO */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[560px] flex flex-col items-center">
          {/* FOTO compuesta SIN tarjeta blanca */}
          {dataUrl && (
            <img
              src={dataUrl}
              alt="Previsualización"
              className="w-full max-w-[560px] aspect-[9/16] object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,.6)] ring-1 ring-white/10"
            />
          )}

          {err && <p className="mt-4 text-red-300 text-center">{err}</p>}

          {/* BOTONES estilo del tema */}
          <div className="mt-5 flex items-center gap-4">
            <button
              onClick={handleRetake}
              disabled={uploading}
              className="px-6 h-12 rounded-full bg-white text-black text-base md:text-lg font-semibold shadow-md
                         hover:brightness-110 active:scale-95 transition disabled:opacity-60"
            >
              ⟲ Repetir
            </button>

            <button
              onClick={handleNext}
              disabled={uploading}
              className="px-6 h-12 rounded-full bg-[#C9961A] text-white text-base md:text-lg font-semibold shadow-md
                         hover:brightness-110 active:scale-95 transition disabled:opacity-60"
            >
              {uploading ? 'Subiendo…' : 'Siguiente →'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
