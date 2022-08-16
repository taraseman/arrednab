import reducer, { setAuth, resetAuth, AuthState } from "service/authSlice";

describe("authSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      id: null,
      refreshToken: null,
      token: null,
    });
  });

  it("should handle setAuth action", () => {
    const previousState: AuthState = {
      id: null,
      refreshToken: null,
      token: null,
    };

    expect(
      reducer(
        previousState,
        setAuth({
          id: "1",
          refreshToken: "a",
          token: "b",
        })
      )
    ).toEqual({
      id: "1",
      refreshToken: "a",
      token: "b",
    });
  });
  it("should handle resetAuth action", () => {
    const previousState: AuthState = {
      id: "1",
      refreshToken: "a",
      token: "b",
    };

    expect(reducer(previousState, resetAuth())).toEqual({
      id: null,
      refreshToken: null,
      token: null,
    });
  });
});
