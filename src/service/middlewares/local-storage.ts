import { Middleware } from 'redux';

const persistActions = [
  'auth/setAuth',
  'user/setUser',
  'users/setUsers'
] as const;

const localStorageMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    const result = next(action);
    if (persistActions.includes(result.type)) {
      const key = result.type.split('/')[0];
      localStorage.setItem(key, JSON.stringify(store.getState()[key]));
    } else if (result.type === 'auth/resetAuth') {
      localStorage.clear();
      return;
    }
    return result;
  };
};

export default localStorageMiddleware;
