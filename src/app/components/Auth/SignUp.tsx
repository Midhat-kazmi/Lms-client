"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
};

// Validation Schema
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name."),
  email: Yup.string().email("Invalid email format!").required("Please enter your email."),
  password: Yup.string()
    .required("Please enter your password.")
    .min(6, "Password must be at least 6 characters."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});

const Signup: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const { name, email, password } = values;
        const res = await registerUser({ name, email, password });

        if ("data" in res) {
          toast.success("Signup successful! Please verify your email.");
          setRoute("verification");
        } else {
          toast.error("Signup failed! Please try again.");
        }
      } catch (err) {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
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
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            errors.name && touched.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && touched.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}

        {/* Email */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            errors.email && touched.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && touched.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}

        {/* Password */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.password && touched.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <span
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            onClick={() => setShow(!show)}
          >
            {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </span>
        </div>
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1">
          Confirm Password
        </label>
        <input
          type={show ? "text" : "password"}
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            errors.confirmPassword && touched.confirmPassword
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-5 py-2 px-4 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition disabled:opacity-70"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">OR</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm sm:text-base"
        >
          <FcGoogle size={20} />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Continue with Google
          </span>
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm sm:text-base"
        >
          <AiFillGithub size={20} className="text-gray-800 dark:text-white" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Continue with GitHub
          </span>
        </button>
      </div>

      {/* Login Link */}
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
