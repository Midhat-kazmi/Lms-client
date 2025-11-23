"use client";

import React, { FC, useEffect, useState } from "react";
import { Moon, Sun, User, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Auth + Redux
import { useSession } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useLogoutMutation, useSocialAuthMutation } from "@/redux/features/auth/authApi";

import avatar from "../../../public/assets/f49a1537ed0ad0933cc151f8253d8100.jpg";

// Modals
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";

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

  // NextAuth + Redux User Loading
  const { data: session } = useSession();
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined);

  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout] = useLogoutMutation();

  const [shouldLogout, setShouldLogout] = useState(false);

  // Trigger logout correctly
  useEffect(() => {
    if (shouldLogout) {
      logout({});
    }
  }, [shouldLogout, logout]);

  // Sync social login with backend
  useEffect(() => {
    if (!isLoading) {
      if (!userData && session) {
        socialAuth({
          email: session.user?.email ?? "",
          name: session.user?.name ?? "",
          avatar: session.user?.image ?? "",
        });
        refetch();
      }
    }
  }, [session, isLoading, userData, refetch, socialAuth]);

  // auto-close login modal after success
  useEffect(() => {
    if (session && isSuccess) {
      setOpen(false);
    }

    // If user logged out from NextAuth but not backend → trigger logout
    if (!session && !isLoading && !userData) {
      setShouldLogout(true);
    }
  }, [session, isSuccess, isLoading, userData, setOpen]);

  // Scroll header effect
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load dark mode from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Save dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

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

          {/* Dark Mode */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Avatar / Login */}
          {userData ? (
            <Link href="/profile">
              <Image
                src={userData?.user?.avatar?.url || avatar}
                alt="User"
                width={32}
                height={32}
                className="rounded-full w-[32px] h-[32px] cursor-pointer object-cover hidden md:block"
              />
            </Link>
          ) : (
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hidden md:block"
              onClick={() => {
                setRoute("login");
                setOpen(true);
              }}
            >
              <User size={20} />
            </button>
          )}

          {/* Mobile Menu */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            onClick={() => setOpenSideBar(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
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

            {/* Mobile Avatar or Login */}
            {userData ? (
              <Link href="/profile">
                <Image
                  src={userData.user?.avatar?.url || avatar}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full w-[40px] h-[40px] mb-4"
                />
              </Link>
            ) : (
              <>
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
              </>
            )}

            <p className="text-xs mt-6 text-gray-500 dark:text-gray-400">
              ©️ 2025 E-Learning
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      {route === "login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
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

      {route === "verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </header>
  );
};

export default Header;
