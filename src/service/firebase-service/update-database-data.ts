import { getDatabase, ref, update } from "firebase/database";

const updateDataBaseData = (data: object, path: string) => {
  return new Promise(async (resolve, reject) => {
    const db = getDatabase();

    try {
      const response = await update(ref(db, path), data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export default updateDataBaseData;
