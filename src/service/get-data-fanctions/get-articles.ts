import type { AppDispatch } from "service/store";
import { getDatabase, ref, onValue } from "firebase/database";
import { setArticles } from "service/articlesSlice";
import { Article } from "types/article-types";

const getArticles = async (dispatch: AppDispatch) => {
    const db = getDatabase();
    const dbRef = ref(db, "articles");

    await onValue(dbRef, (snapshot) => {
      if (snapshot.val() !== null) {
        dispatch(
          setArticles(Object.values(snapshot.val()).reverse() as Article[])
        );
      }
    });
  };

export default getArticles;