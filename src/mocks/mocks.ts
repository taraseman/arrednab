import { Article } from "types/article-types";
import { Users } from "service/allUsersSlice";
import { User } from "types/user-types";

export const articlesMock: Article[] = [
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

export const defaultUsersMock: Users = {
  a: {
    id: "a",
    photoUrl: "fhf",
    firstName: "Ivan",
    lastName: "Ivan",
    email: "se@gamil.com",
  },
  b: {
    id: "b",
    photoUrl: "fhf",
    firstName: "John",
    lastName: "John",
    email: "john@gamil.com",
  },
  c: {
    id: "c",
    photoUrl: "fhf",
    firstName: "Mary",
    lastName: "Mary",
    email: "mary@gamil.com",
  },
};

export const userMock: User = {
  id: "a",
  photoUrl: "fhf",
  firstName: "Ivan",
  lastName: "Ivan",
  email: "se@gamil.com",
};
