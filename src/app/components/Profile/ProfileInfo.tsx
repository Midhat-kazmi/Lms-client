import { styles } from "../../styles/styles";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useEditProfileMutation, useUpdateAvatarMutation } from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";

const avatarDefault =
  "https://images.unsplash.com/photo-1603415526960-f7e0328b78b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

// ------------------- Types -------------------
interface IUser {
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: { url: string } | null;
  courses: { id: string }[];
}

interface Props {
  user: IUser;
  avatar: string | null;
}

// ------------------- Component -------------------
const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user.name);
  const [loadUser, setLoadUser] = useState(false);

  const [updateAvatar, { isSuccess: avatarSuccess, error: avatarError }] = useUpdateAvatarMutation();
  useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const [editProfile, { isSuccess: profileSuccess, error: profileError }] = useEditProfileMutation();

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const avatarData = reader.result as string;
        updateAvatar(avatarData);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (avatarSuccess || profileSuccess) {
      setLoadUser(true);
    }
    if (profileSuccess) toast.success("User updated successfully");
    if (avatarError || profileError) console.log(avatarError || profileError);
  }, [avatarSuccess, profileSuccess, avatarError, profileError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "") {
      await editProfile(name);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar?.url || avatar || avatarDefault}
            alt="Profile Photo"
            width={120}
            height={120}
            className="w-[120px] h-[120px] object-cover cursor-pointer border-[3px] border-[#30bbb2ca] rounded-full"
          />
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>

      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%] dark:text-white text-black pt-2">
              <label htmlFor="name" className="block">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-[100%] dark:text-white text-black pt-2">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="text"
                id="email"
                readOnly
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={user.email}
              />
            </div>

            <input
              type="submit"
              className="w-full 800px:w-[250px] h-[40px] border border-[cyan] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer"
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
