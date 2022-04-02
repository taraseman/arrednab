import { useAppSelector } from "hooks/redux";

export function useAuth() {
  const { token, id } = useAppSelector((state) => state.auth);

  return {
    isAuth: !!token,
    token,
    id,
  };
}
