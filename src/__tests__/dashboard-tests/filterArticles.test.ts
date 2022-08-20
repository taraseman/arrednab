import { filterArticles } from "pages/dashboard/Dashboard";
import { Article } from "types/article-types";

describe("Filter articles", () => {
  let articles: Article[];
  beforeEach(() => {
    articles = [
      {
        id: "1a",
        authorId: "1author",
        title: "title1",
        description: "description1",
        imageUrl: "url1",
        category: "other",
        created: 1660672448094,
        comments: [
          {
            id: "c11",
            created: "1660672448094",
            authorId: "1aa",
            message: "fkkfkkdkfkd",
          },
        ],
      },
      {
        id: "1a",
        authorId: "1author",
        title: "title2",
        description: "description2",
        imageUrl: "url1",
        category: "science",
        created: 1660672431208,
        comments: [],
      },
      {
        id: "1a",
        authorId: "1author",
        title: "title3",
        description: "description3",
        imageUrl: "url1",
        category: "studying",
        created: 1660672382768,
        comments: [],
      },
      {
        id: "1a",
        authorId: "1author",
        title: "title4",
        description: "description4",
        imageUrl: "url1",
        category: "studying",
        created: 1660672372939,
        comments: [],
      },
    ];
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


