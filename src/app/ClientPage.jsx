'use client'

import { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

export default function ClientPage() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Elearning"
        description="Best Platform"
        keywords="Programming, MERN, Redux"
      />

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
