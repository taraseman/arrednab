import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";

const uploadFile = (file: File, filePath: string) => {
  return new Promise(async (resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, filePath);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};

export default uploadFile;
