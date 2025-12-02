// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: "AIzaSyA0FCmV3qbCHIb8RNvDO5MsjvEMuCJkWpg",
  authDomain: "photobooth-the-band.firebaseapp.com",
  projectId: "photobooth-the-band",
  storageBucket: "photobooth-the-band.appspot.com",
  messagingSenderId: "182037074241",
  appId: "1:182037074241:web:3a105e8c79f3003fe451c0"
};

// Siempre devuelve la misma app (evita inicializar dos veces)
export function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

// 👇 ESTA constante es la que vas a importar en page.tsx
export const storage = getStorage(getFirebaseApp());
