import Image from "next/image";
import React, { FC } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

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
  active: number;
  avatar: string | null;
  logOutHandler: () => void;
  setActive: (active: number) => void;
}

// ------------------- Component -------------------
const SideBarProfile: FC<Props> = ({ user, active, avatar, logOutHandler, setActive }) => {
  return (
    <div className="w-full ">
      {/* Profile */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-blue-50" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          alt=""
          src={user.avatar?.url || avatar || avatarDefault}
          width={20}
          height={20}
          className="cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>

      {/* Admin Dashboard */}
      {user.role === "admin" && (
        <Link
          href="/admin"
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
          onClick={() => setActive(4)}
        >
          <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black" />
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}

      {/* Logout */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 5 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={logOutHandler}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
