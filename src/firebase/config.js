import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_n5tuGFKautOLaPbrSH3o5_iR_NsypW8",
  authDomain: "photobooth-rd.firebaseapp.com",
  projectId: "photobooth-rd",
  storageBucket: "photobooth-rd.appspot.com",
  messagingSenderId: "270392039923",
  appId: "1:270392039923:web:8388c1b995e187112c9a86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
