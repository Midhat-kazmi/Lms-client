"use client";

import {
  Cedarville_Cursive,
  Poppins,
  Josefin_Sans,
} from "next/font/google";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import { ReduxProvider } from "./provider";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const cursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Cursive",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} ${cursive.variable} transition-colors duration-300`}
      >
        <SessionProviderWrapper>
          <ReduxProvider>
            <Custom>{children}</Custom>
          </ReduxProvider>
        </SessionProviderWrapper>

        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}

/* ------------------------------
   Hydration-Safe Custom Wrapper
------------------------------ */
const Custom = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useLoadUserQuery({});
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Before hydration, render nothing (server and client match)
  if (!mounted) return null;

  return isLoading ? <Loader /> : <>{children}</>;
};
