import reducer, {
  setUsers,
  resetUsers,
  updateUser,
  Users,
  UpdateUser,
} from "service/allUsersSlice";
import { defaultUsersMock } from "mocks/mocks";;

describe("allUsersSlice", () => {
  let defaultUsers: Users;
  beforeEach(() => {
    defaultUsers = { ...defaultUsersMock };
  });
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      users: null,
    });
  });
  it("should set Users correctly", () => {
    expect(reducer({ users: null }, setUsers(defaultUsers)).users).toEqual(
      defaultUsers
    );
  });
  it("should handle resetUsers", () => {
    expect(reducer({ users: defaultUsers }, resetUsers()).users).toEqual(null);
  });
  it("should only field value which we need", () => {
    expect(
      reducer(
        { users: defaultUsers },
        updateUser({
          id: "b",
          photoUrl: "fjf",
        } as UpdateUser)
      ).users?.b
    ).toEqual({
      id: "b",
      photoUrl: "fjf",
      firstName: "John",
      lastName: "John",
      email: "john@gamil.com",
    });
  });
  it("should update all posibility fiels correctly", () => {
    expect(
      reducer(
        { users: defaultUsers },
        updateUser({
          id: "b",
          photoUrl: "ip",
          firstName: "Ip",
          lastName: "Ip",
        } as UpdateUser)
      ).users?.b
    ).toEqual({
      id: "b",
      photoUrl: "ip",
      firstName: "Ip",
      lastName: "Ip",
      email: "john@gamil.com",
    });
  });
  it("should not add new user on update if there are no ID", () => {
    expect(
      reducer(
        { users: defaultUsers },
        updateUser({
          id: "o",
          photoUrl: "ip",
          firstName: "Ip",
          lastName: "Ip",
        } as UpdateUser)
      ).users
    ).toEqual(defaultUsers);
  });
});
