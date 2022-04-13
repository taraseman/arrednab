export type UserRole = "pUser" | "pUser" | "admin";

export const Role = {
  pUser: "pUser",
  nUser: "nUser",
  admin: "admin",
} as const;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  email: string;
  role?: UserRole;
}

