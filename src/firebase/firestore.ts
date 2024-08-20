import {
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "./index";

const collectionName = "usersPhoto";

const db = getFirestore(app);

const setNewUser = async (email: string, name: string) => {
  await setDoc(
    doc(db, collectionName, email),
    { name, email },
    { merge: true }
  );
};

export default setNewUser;
