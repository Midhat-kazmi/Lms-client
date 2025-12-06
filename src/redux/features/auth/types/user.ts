export interface IUser {
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: { url: string } | null;
  courses: { id: string }[];
}
