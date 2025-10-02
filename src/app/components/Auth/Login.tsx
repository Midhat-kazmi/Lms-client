"use client";
import React, { FC, useState } from "react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: () => void; // optional now
};

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    alert(`Logged in with email: ${email}`); // simple feedback
    setOpen(false); // close modal after login
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Login to E-Learning
      </h1>

      <form onSubmit={handleSubmit}>
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

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <span
          className="text-pink-600 cursor-pointer hover:underline"
          onClick={() => setRoute("signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
