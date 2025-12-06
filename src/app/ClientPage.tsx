"use client";

import { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Footer from "./components/Footer";

export default function ClientPage() {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(0);
  
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
      />

      <Hero />

      <Footer />
    </div>
  );
}
