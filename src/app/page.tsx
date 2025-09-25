"use client";
import { useState } from "react";
import type { Metadata } from "next";
import Heading from "./utils/Heading";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Elearning",
  description: "Best Platform",
  other: {
    keywords: "Programming, MERN, Redux",
  },
};

export default function Page() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  //  Add route state
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Elearning"
        description="Best Platform"
        keywords="Programming, MERN, Redux"
      />

      {/*  Pass all required props */}
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
    </div>
  );
}
