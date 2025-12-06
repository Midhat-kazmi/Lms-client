"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useActivationMutation } from "../../../redux/features/auth/authApi";
import { styles } from "../../styles/styles";
import { RootState } from "../../../redux/store"; // Adjust path to your store

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  // Typed selector for activation token
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const activationToken = useTypedSelector((state) => state.auth.activationToken);

  const [activation, { isSuccess, error }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account Activated Successfully!");
      setRoute("login");
    }
    if (error && "data" in error) {
      const err = error as { data: { message: string } };
      toast.error(err.data.message);
      setInvalidError(true);
    }
  }, [isSuccess, error, setRoute]);

  // Define refs individually for ESLint/Turbopack safety
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const verificationHandler = async () => {
    const verificationCode = Object.values(verifyNumber).join("");
    if (verificationCode.length !== 6) {
      setInvalidError(true);
      return;
    }

    await activation({
      activationToken,
      activationCode: verificationCode,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h1 className={`${styles.title}`}>Verify Your Account</h1>

      <div className="w-full flex items-center justify-center mt-4">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={30} />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-2 sm:gap-3">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            ref={ref}
            value={verifyNumber[index as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className={`w-[45px] sm:w-[55px] h-[55px] bg-transparent border-2 rounded-lg text-black dark:text-white text-center text-lg font-semibold outline-none ${
              invalidError ? "border-red-500" : "border-gray-400 dark:border-white"
            }`}
          />
        ))}
      </div>

      <div className="w-full flex justify-center mt-8">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>

      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to sign in?
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("login")}
        >
          Login
        </span>
      </h5>
    </div>
  );
};

export default Verification;