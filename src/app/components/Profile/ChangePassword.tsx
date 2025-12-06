import { styles } from "../../styles/styles";
import { useUpdatePasswordMutation } from "../../../redux/features/user/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
    }

    if (error && "data" in error) {
      const err = error as { data: { message: string } };
      toast.error(err.data.message);
    }
  }, [error, isSuccess]);

  // Typed form event
  const passwordChangeHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await updatePassword({
      oldPassword,
      newPassword,
    });
  };

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-2xl 800px:text-3xl font-Poppins text-center font-[500] text-black pb-2 dark:text-white">
        Change Password
      </h1>

      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          {/* Old Password */}
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="old-password"
              className="block pb-2 dark:text-white text-black"
            >
              Enter your old password
            </label>
            <input
              type="password"
              id="old-password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          {/* New Password */}
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="new-password"
              className="block pb-2 dark:text-white text-black"
            >
              Enter your new password
            </label>
            <input
              type="password"
              id="new-password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="confirm-password"
              className="block pb-2 text-black dark:text-white"
            >
              Enter your confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Submit */}
            <input
              type="submit"
              className="!w-[95%] 800px:w-[250px] h-[40px] border border-[cyan] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
