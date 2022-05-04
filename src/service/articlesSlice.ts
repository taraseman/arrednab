import { createSlice } from "@reduxjs/toolkit";
import { Article } from "types/article-types";

interface InitialState {
  articles: Article[];
}

interface RemovePayload {
  id: string;
}

const articles = localStorage.getItem("articles");

const initialState: InitialState = {
  articles: articles ? JSON.parse(articles).articles : null,
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
    resetArticles(state) {
      state.articles = [];
    },
  },
});

export const { setArticles, resetArticles } = slice.actions;

export default slice.reducer;
