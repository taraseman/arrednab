export type UserRole = "pUser" | "pUser" | "admin";

export const Role = {
  pUser: "pUser",
  nUser: "nUser",
  admin: "admin",
} as const;

export interface User {
  [x: string]: any;
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  email: string;
  role?: UserRole;
}

