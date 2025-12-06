"use client";

import React, { FC, useEffect, useState } from "react";
import { Moon, Sun, User, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";

// Redux
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useLogoutMutation, useSocialAuthMutation } from "@/redux/features/auth/authApi";

// Default avatar
import avatar from "../../../public/assets/f49a1537ed0ad0933cc151f8253d8100.jpg";

// Modals
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";

// ------------------- Props -------------------
type HeaderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route?: string; // optional
  setRoute?: (route: string) => void; // optional
};

// ------------------- Header -------------------
const Header: FC<HeaderProps> = ({
  activeItem,
  setOpen,
  open,
  route = "",
  setRoute = () => {},
}) => {
  const [mounted, setMounted] = useState(false); // prevent SSR mismatch
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [shouldLogout, setShouldLogout] = useState(false);

  const { data: session } = useSession();
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined);

  const [socialAuth, socialState] = useSocialAuthMutation();
  const [logout] = useLogoutMutation();

  // Mounted flag
  useEffect(() => setMounted(true), []);

  // Handle social auth
  useEffect(() => {
    if (!isLoading && session && !userData && !socialState.isLoading) {
      socialAuth({
        email: session.user?.email ?? "",
        name: session.user?.name ?? "",
        avatar: session.user?.image ?? "",
      });
    }
  }, [session, userData, isLoading, socialAuth, socialState.isLoading]);

  // Refetch user after social login
  useEffect(() => {
    if (socialState.isSuccess) {
      refetch();
      setOpen(false);
    }
  }, [socialState.isSuccess, refetch, setOpen]);

  // Backend logout sync with NextAuth
  useEffect(() => {
    if (!session && !isLoading && !userData) {
      setShouldLogout(true);
    }
  }, [session, isLoading, userData]);

  useEffect(() => {
    if (shouldLogout) logout({});
  }, [shouldLogout, logout]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode persistence
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const navItems = ["Home", "Courses", "About", "Policy", "FAQ"];

  if (!mounted) return null;

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
                src={userData.user?.avatar?.url || avatar}
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
            className="absolute right-0 top-0 w-[70%] h-full bg-white dark:bg-gray-900 p-6 shadow-lg"
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
      {open && route && (
        <>
          {route === "login" && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              component={Login}
              extraProps={{
                setRoute,
                activeItem,
                refetch,
              }}
            />
          )}

          {route === "signup" && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              component={SignUp}
              extraProps={{
                setRoute,
                activeItem,
              }}
            />
          )}

          {route === "verification" && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              component={Verification}
              extraProps={{
                setRoute,
                activeItem,
              }}
            />
          )}
        </>
      )}
    </header>
  );
};

export default Header;
