import { useAppSelector } from "hooks/redux";

export function useAuth() {
  const { token, email, id } = useAppSelector((state) => state.auth);

  return {
    isAuth: !!token,
    email,
    token,
    id,
  };
}
