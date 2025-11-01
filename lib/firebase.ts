// lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';

let firebaseApp: FirebaseApp;

export function getFirebaseApp() {
  if (!getApps().length) {
    firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FB_API_KEY!,
      authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN!,
      projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID!,
      storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET!,
      appId: process.env.NEXT_PUBLIC_FB_APP_ID!,
    });
  } else {
    firebaseApp = getApp();
  }
  return firebaseApp;
}
