"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import CourseCard from "../Courses/CourseCard";
import Loader from "../Loader/Loader";

// ------------------- Types -------------------
interface IUserCourseRef {
  id: string;
}

interface IUser {
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: { url: string } | null;
  courses: IUserCourseRef[];
}

interface ICourseContent {
  title: string;
  content: string;
}

interface ICourse {
  _id: string;
  name: string;
  ratings: number;
  purchased: number;
  estimatedPrice: number;
  price: number;
  thumbnail: { url: string };
  courseData?: ICourseContent[];
}

type Props = {
  user: IUser | null; // allow null
};

// ------------------- Component -------------------
const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar] = useState<string | null>(null);
  const [active, setActive] = useState<number>(1);
  const [courses, setCourses] = useState<ICourse[]>([]);

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined);

  // ALWAYS SAFE — hooks are at the top
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (data?.course && user?.courses?.length) {
      const filteredCourses = user.courses
        .map((item) =>
          data.course.find((course: ICourse) => item.id === course._id)
        )
        .filter((c): c is ICourse => c !== undefined);

      setCourses(filteredCourses);
    }
  }, [data, user]);

  const logOutHandler = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ❗ RETURN ONLY AFTER HOOKS
  if (!user) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center text-lg">
        Loading profile...
      </div>
    );
  }

  if (isLoading) return <Loader />;

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-[#f5f5f5] bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000012] rounded-[5px] shadow-md dark:shadow-sm mt-20 mb-20 sticky ${
          scroll ? "top-[120px]" : "top-8"
        } left-8`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      <div className="w-full h-full bg-transparent mt-20">
        {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
        {active === 2 && <ChangePassword />}
        {active === 3 && (
          <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 ">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
              {courses.length > 0 ? (
                courses.map((item) => (
                  <CourseCard item={item} key={item._id} isProfile={true} />
                ))
              ) : (
                <h1 className="text-center text-[18px] font-Poppins">
                  You don&apos;t have any purchased courses!
                </h1>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
