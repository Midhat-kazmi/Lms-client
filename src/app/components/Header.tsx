"use client";
import React, { FC, useEffect, useState } from "react";
import { Moon, Sun, User, Menu, X } from "lucide-react";
import Link from "next/link";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

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
  const [darkMode, setDarkMode] = useState(false);

  //  Scroll effect (adds shadow when scrolled)
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  Load saved theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  //  Apply/remove dark mode & save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const navItems = ["Home", "Courses", "About", "Policy", "FAQ"];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        active ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-[95%] mx-auto flex items-center justify-between h-[70px]">
        {/* Logo */}
        <h2 className="text-2xl font-bold text-black dark:text-white">
          ELearning
        </h2>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={`/${item.toLowerCase()}`}
              onClick={() => setRoute(item.toLowerCase())}
              className={`text-sm font-medium transition-colors ${
                activeItem === i
                  ? "text-pink-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-pink-600"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* 🌙 / ☀️ Dark Mode Toggle */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* 👤 User/Login Icon */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => {
              setRoute("login");
              setOpen(true);
            }}
          >
            <User size={20} />
          </button>

          {/* ☰ Mobile Menu */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            onClick={() => setOpenSideBar(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/*  Mobile Sidebar */}
      {openSideBar && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpenSideBar(false)}
        >
          <div
            className="absolute right-0 top-0 w-[70%] h-full bg-white dark:bg-gray-900 p-6 shadow-lg animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-black dark:text-white">
                Menu
              </h2>
              <button onClick={() => setOpenSideBar(false)}>
                <X size={24} className="text-black dark:text-white" />
              </button>
            </div>

            {/* Sidebar Links */}
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={`/${item.toLowerCase()}`}
                className={`mb-4 block cursor-pointer ${
                  activeItem === i
                    ? "text-pink-600 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => {
                  setRoute(item.toLowerCase());
                  setOpenSideBar(false);
                }}
              >
                {item}
              </Link>
            ))}

            <hr className="my-4 border-gray-300 dark:border-gray-700" />

            {/* Auth Buttons */}
            <button
              onClick={() => {
                setRoute("login");
                setOpen(true);
                setOpenSideBar(false);
              }}
              className="w-full py-2 px-4 bg-pink-600 text-white rounded-lg"
            >
              Login
            </button>

            <button
              onClick={() => {
                setRoute("signup");
                setOpen(true);
                setOpenSideBar(false);
              }}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg mt-3"
            >
              Sign Up
            </button>

            <p className="text-xs mt-6 text-gray-500 dark:text-gray-400">
              ©️ 2025 E-Learning
            </p>
          </div>
        </div>
      )}

      {/* 🪟 Modals */}
      {route === "login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}
      {route === "signup" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}
    </header>
  );
};

export default Header;
