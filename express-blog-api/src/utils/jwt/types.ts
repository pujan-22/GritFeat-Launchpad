export interface TokenPayload {
  id: string;
  email: string;
  role: "admin" | "blogger";
}