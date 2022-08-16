import store from "service/store";

describe("Store default values", () => {
  it("User should be null", () => {
    const state = store.getState().user;
    expect(state.user).toEqual(null);
  });
  it("Users should be null", () => {
    const state = store.getState().users;
    expect(state.users).toEqual(null);
  });
  it("Articles should be empty array", () => {
    const state = store.getState().articles;
    expect(state.articles).toEqual([]);
  });
  it("Auth state values shold be nulls", () => {
    const state = store.getState().auth;
    expect(state).toEqual({
      token: null,
      refreshToken: null,
      id: null,
    });
  });
});
