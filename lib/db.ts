// lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  Timestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyA0FCmV3qbCHIb8RNvDO5MsjvEMuCJkWpg",
  authDomain: "photobooth-the-band.firebaseapp.com",
  projectId: "photobooth-the-band",
  storageBucket: "photobooth-the-band.appspot.com",
  messagingSenderId: "182037074241",
  appId: "1:182037074241:web:3a105e8c79f3003fe451c0"
};

// 🔹 Siempre devuelve la misma app (evita inicializar dos veces)
export function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

// Instancias compartidas
export const db = getFirestore(getFirebaseApp());
export const storage = getStorage(getFirebaseApp());

/* ================== HELPERS OPCIONALES ================== */

// Registrar usuario
export async function register(name: string, mail: string, phone: string) {
  try {
    const snap = await getDoc(doc(db, "users", mail));
    if (snap.exists()) return;

    await setDoc(doc(db, "users", mail), {
      nombre: name,
      correo: mail,
      telefono: phone,
      fecha: Timestamp.now(),
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * Sube la foto original del usuario (selfie sin marco, por ejemplo)
 * a la carpeta Gayosso/userPhotos
 */
export async function uploadUserPhotoToFirebase(base64Image: string) {
  try {
    const id = Date.now();
    const storageRef = ref(storage, `Gayosso/userPhotos/${id}.jpg`);

    await uploadString(storageRef, base64Image, "data_url");
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Error uploading image to Firebase", error);
    throw error;
  }
}

/**
 * Sube la foto generada (ya con marco) a Gayosso/generatedPhotos
 */
export async function uploadGeneratedPhotoToFirebase(blob: Blob) {
  try {
    const id = Date.now();
    const storageRef = ref(storage, `Gayosso/generatedPhotos/${id}.jpeg`);

    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Error uploading image to Firebase", error);
    throw error;
  }
}

