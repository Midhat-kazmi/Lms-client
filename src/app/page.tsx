// app/page.tsx (Server Component)
import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Elearning",
  description: "Best Platform",
  other: {
    keywords: "Programming, MERN, Redux",
  },
};

export default function Page() {
  return <ClientPage />;
}
