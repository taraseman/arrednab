import { getDatabase, ref, onValue } from "firebase/database";
import { setUsers } from "service/allUsersSlice";
import type { AppDispatch } from "service/store";

const getUsers = async (dispatch: AppDispatch) => {
  const db = getDatabase();
  const dbRef = ref(db, "users");

  await onValue(dbRef, (snapshot) => {
    if (snapshot.val()) {
      dispatch(setUsers(snapshot.val()));
    }
  });
};

export default getUsers;
