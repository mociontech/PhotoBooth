import {
  ref,
  uploadString,
  getStorage,
  getDownloadURL,
} from "firebase/storage";

import app from "./index";

const storage = getStorage(app);

const uploadStringBase64 = async (fileString: any) => {
  const time = new Date().valueOf();
  const storageRef = ref(storage, `${time}.png`);
  try {
    await uploadString(storageRef, fileString, "data_url");
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Uploaded a data_url string!", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading data_url string:", error);
    throw error;
  }
};

export default uploadStringBase64;