import { Middleware } from 'redux';

const persistActions = [
  'auth/setUser',
] as const;

const localStorageMiddleware: Middleware = (store) => {
  return (next) => (action) => {
    const result = next(action);
    if (persistActions.includes(result.type)) {
      const key = result.type.split('/')[0];
      localStorage.setItem(key, JSON.stringify(store.getState()[key]));
    } else if (result.type === 'auth/removeUser') {
      localStorage.clear();
      return;
    }
    return result;
  };
};

export default localStorageMiddleware;
