"use client";
import React, { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
};

const Signup: FC<Props> = ({ setRoute, setOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    alert(`Signed up with email: ${email}`);
    setOpen(false); // close modal after signup
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Create Your Account
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {/* Email */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {/* Password */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm Password */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Confirm Password
        </label>
        <input
          type={show ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Social Signup */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        <span className="mx-2 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
      </div>

      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <FcGoogle size={20} /> Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <AiFillGithub size={20} /> GitHub
        </button>
      </div>

      <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <span
          className="text-pink-600 cursor-pointer hover:underline"
          onClick={() => setRoute("login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
