import { filterArticles } from "pages/dashboard/Dashboard";
import { Article } from "types/article-types";
import { articlesMock } from "../mocks/mocks";

describe("Filter articles", () => {
  let articles: Article[];
  beforeEach(() => {
    articles = [...articlesMock];
  });

  it("without filters all articles are in descending order of time", () => {
    const filteredArticles = filterArticles(articles, "", "");
    expect(filteredArticles[1].created).toBeGreaterThan(
      filteredArticles[3].created
    );
    expect(filteredArticles[0].created).toBeGreaterThan(
      filteredArticles[1].created
    );
  });

  it("without filters any articles function should return empty array", () => {
    expect(filterArticles([], "", "")).toEqual([]);
  });

  it("search should find by title and description", () => {
    expect(filterArticles(articles, "", "title1")).toHaveLength(1);
    expect(filterArticles(articles, "", "description1")).toHaveLength(1);
    expect(filterArticles(articles, "", "description")).toHaveLength(
      articles.length
    );
  });

  it("if there are no any articles by search term return empty array", () => {
    expect(filterArticles(articles, "", "title14")).toHaveLength(0);
    expect(filterArticles(articles, "", "abn")).toHaveLength(0);
  });

  it("if there are no any articles by surch category return empty array", () => {
    expect(filterArticles(articles, "football", "")).toHaveLength(0);
    expect(filterArticles(articles, "pop", "")).toHaveLength(0);
  });

  it("if there are no any articles by surch category but is by serch term or opposite return empty array", () => {
    expect(filterArticles(articles, "football", "description")).toHaveLength(0);
    expect(filterArticles(articles, "other", "ioi")).toHaveLength(0);
  });

  it("filter by category", () => {
    expect(filterArticles(articles, "science", "")[0].category).toEqual(
      "science"
    );
  });

  it("if there are two items of category return them and save order", () => {
    const filteredArticles = filterArticles(articles, "studying", "");

    expect(filteredArticles[0].category).toEqual("studying");
    expect(filteredArticles[0].created).toBeGreaterThan(
      filteredArticles[1].created
    );
  });
});
