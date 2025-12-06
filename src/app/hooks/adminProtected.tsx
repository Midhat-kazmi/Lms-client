"use client";
import { ReactNode, FC } from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { redirect } from "next/navigation";
import { RootState } from "../../redux/store"; 

interface ProtectedProps {
  children: ReactNode;
}

// Define a typed selector for auth slice
interface IUser {
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: { url: string } | null;
  courses?: { id: string }[];
}

interface AuthState {
  user: IUser | null;
  token?: string;
}

const AdminProtected: FC<ProtectedProps> = ({ children }) => {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { user } = useTypedSelector((state) => state.auth as AuthState);

  // If not logged in or not admin, redirect to homepage
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  // User is admin, render protected children
  return <>{children}</>;
};

export default AdminProtected;
