import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB2Y18EngGzPOiTB1p5MF8MbCrtEmsY9xY",
  authDomain: "photobooth-puerto-rico.firebaseapp.com",
  projectId: "photobooth-puerto-rico",
  storageBucket: "photobooth-puerto-rico.appspot.com",
  messagingSenderId: "42328674280",
  appId: "1:42328674280:web:e43ffc196bf66c46401e5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app