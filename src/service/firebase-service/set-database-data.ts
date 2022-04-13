import { getDatabase, ref, set } from "firebase/database";

const setDataBaseData = <DataType>(data: DataType, path: string) => {
  return new Promise(async (resolve, reject) => {
    const db = getDatabase();

    try {
      const response = await set(ref(db, path), data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export default setDataBaseData;
