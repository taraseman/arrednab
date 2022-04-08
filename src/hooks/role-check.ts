import { useAppSelector } from "hooks/redux";
import { Role } from "types/user-types";

export type RoleCheck =
  | Array<keyof typeof Role>
  | { except: Array<keyof typeof Role> };

function useRoleCheck(roles: RoleCheck) {
  const role = useAppSelector((state) => state.user.user?.role);
  if (!role) return;
  return Array.isArray(roles)
    ? roles.includes(role)
    : !roles.except.includes(role);
}

export default useRoleCheck;
