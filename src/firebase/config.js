import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0FCmV3qbCHIb8RNvDO5MsjvEMuCJkWpg",
  authDomain: "photobooth-the-band.firebaseapp.com",
  projectId: "photobooth-the-band",
  storageBucket: "photobooth-the-band.appspot.com",
  messagingSenderId: "182037074241",
  appId: "1:182037074241:web:3a105e8c79f3003fe451c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
