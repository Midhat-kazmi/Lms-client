import { useActivationMutation } from "../../../redux/features/auth/authApi";
import { styles } from "../../styles/styles";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};
type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account Activated Successfully!");
      setRoute("login");
    }
    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data.message);
      setInvalidError(true);
    }
  }, [isSuccess, error, setRoute]);

  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  const handleInputChange = (index: number, value: string) => {
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
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 6) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h1 className={`${styles.title}`}>Verify Your Account</h1>

      {/* Blue circular icon */}
      <div className="w-full flex items-center justify-center mt-4">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={30} />
        </div>
      </div>

      {/* Six OTP inputs */}
      <div className="mt-8 flex items-center justify-between gap-2 sm:gap-3">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            key={key}
            type="number"
            ref={inputRefs[index]}
            className={`w-[45px] sm:w-[55px] h-[55px] bg-transparent border-2 rounded-lg text-black dark:text-white text-center text-lg font-semibold outline-none ${
              invalidError
                ? "border-red-500"
                : "border-gray-400 dark:border-white"
            }`}
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>

      {/* Verify button */}
      <div className="w-full flex justify-center mt-8">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>

      {/* Go back footer link */}
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to sign in?{" "}
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
