import reducer, { setUser, resetUser } from "service/userSlice";
import { User } from "types/user-types";

describe("user", () => {
  let user: User;
  beforeEach(() => {
    user = {
      id: "a",
      photoUrl: "fhf",
      firstName: "Ivan",
      lastName: "Ivan",
      email: "se@gamil.com",
    };
  });
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined }).user).toEqual(null);
  });

  it("should handle setUser action", () => {
    expect(reducer(undefined, setUser(user as User)).user?.firstName).toEqual(
      "Ivan"
    );
  });

  it("should handle resetUser action", () => {
    expect(reducer({ user }, resetUser()).user).toEqual(null);
  });
});
