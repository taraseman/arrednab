import { createSlice } from "@reduxjs/toolkit";
import { Article } from "types/article-types";

interface InitialState {
  articles: Article[];
}

interface RemovePayload {
  id: string;
}

const initialState: InitialState = {
  articles: [],
};

const slice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles(state, action: { payload: Article[] }) {
      state.articles = action.payload;
    },
    addArticle(state, action: { payload: Article }) {
      state.articles = [action.payload, ...state.articles];
    },
    removeArticle(state, action: { payload: RemovePayload }) {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload.id
      );
    },
  },
});

export const { setArticles } = slice.actions;

export default slice.reducer;
