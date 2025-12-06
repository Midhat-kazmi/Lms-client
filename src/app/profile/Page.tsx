"use client";
import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { RootState } from "@/redux/store"; // ⬅️ added type

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(5);

  // ⬅️ FIXED unexpected any
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} Profile-ELearning`}
          description="ELearning is a platform for online learning and education."
          keywords="ELearning, online learning, education, courses, tutorials, training"
        />

        <Header open={open} setOpen={setOpen} activeItem={activeItem} />

        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
