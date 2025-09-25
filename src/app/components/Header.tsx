import React, { FC, useEffect, useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSideBar(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Sticky header */}
      <div
        className={`${
          active
            ? "bg-black text-white fixed top-0 left-0 w-full h-[80px] shadow-xl transition duration-500"
            : "w-full border-b h-[80px]"
        }`}
      >
        <div className="w-[95%] m-auto h-full flex items-center justify-between px-3">
          {/* Logo */}
          <h2 className="text-[22px] font-bold">ELearning</h2>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Simple nav placeholder */}
            <button className="hidden md:block">Nav</button>

            {/* Mobile menu button */}
            <button
              className="md:hidden px-3 py-1 border rounded"
              onClick={() => setOpenSideBar(true)}
            >
              ☰
            </button>

            {/* User button */}
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setOpen(true)}
            >
              {open ? "Close Modal" : "Login"}
            </button>
          </div>
        </div>

        {/* Mobile sidebar */}
        {openSideBar && (
          <div
            id="screen"
            onClick={handleClose}
            className="fixed w-full h-screen top-0 left-0 bg-black bg-opacity-40"
          >
            <div className="w-[70%] h-full bg-white p-5 absolute right-0 top-0">
              <p className="mb-3">Sidebar Menu</p>
              <button onClick={() => setOpen(true)}>Login</button>
              <br />
              <br />
              <p className="text-sm">©️ 2025 E-Learning</p>
            </div>
          </div>
        )}
      </div>

      {/* Simple modal simulation */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <p className="mb-3">Modal: {route}</p>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
