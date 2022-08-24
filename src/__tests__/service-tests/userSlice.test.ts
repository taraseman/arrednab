import reducer, { setUser, resetUser } from "service/userSlice";
import { User } from "types/user-types";
import { userMock } from "../../mocks/mocks";

describe("user", () => {
  let user: User;
  beforeEach(() => {
    user = {
      ...userMock,
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
