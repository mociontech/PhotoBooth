// app/(main)/qr/page.tsx
import { Suspense } from 'react';
import QrClient from './QrClient';

export const dynamic = 'force-dynamic'; // evita prerender estático

export default function QRPage() {
  return (
    <Suspense fallback={null}>
      <QrClient />
    </Suspense>
  );
}
