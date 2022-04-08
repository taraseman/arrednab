import { getDatabase, ref, set } from "firebase/database";

const setDataBaseData = <DataType>(data: DataType, path: string) => {
  return new Promise(async (resolve, reject) => {
    const db = getDatabase();

    try {
      const user = await set(ref(db, path), data);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export default setDataBaseData;
