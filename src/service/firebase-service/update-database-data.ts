import { getDatabase, ref, update } from "firebase/database";

const updateDataBaseData = (data: object, path: string) => {
  return new Promise(async (resolve, reject) => {
    const db = getDatabase();

    try {
      const user = await update(ref(db, path), data);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export default updateDataBaseData;
