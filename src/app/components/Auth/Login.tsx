"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useLoginMutation } from "../../../redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
};

//  Validation Schema
const schema = Yup.object().shape({
  email: Yup.string().email("Invalid Email!").required("Please enter your email."),
  password: Yup.string().required("Please enter your password.").min(6, "Password must be at least 6 characters."),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  // Formik setup
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  //  Handle API responses
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      setOpen(false);
      refetch && refetch();
    }

    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data.message || "Login failed!");
    }
  }, [isSuccess, error, setOpen, refetch]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Login to E-Learning
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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

        {/* Password Field */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-5 py-2 px-4 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">OR</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
      </div>

      {/* Social Logins */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          onClick={() => signIn("google")}
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Continue with Google
          </span>
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          onClick={() => signIn("github")}
        >
          <AiFillGithub size={20} className="text-gray-800 dark:text-white" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Continue with GitHub
          </span>
        </button>
      </div>

      {/* Signup Link */}
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
