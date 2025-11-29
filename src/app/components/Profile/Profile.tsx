"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogoutMutation } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import CourseCard from "../Courses/CourseCard";
import Loader from "../Loader/Loader";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState<any[]>([]);

  // CORRECT USAGE: mutation hook returns [trigger, resultObject]
  const [logoutTrigger, { isLoading: isLoggingOut, isError: logoutError, error: logoutErrorObj }] =
    useLogoutMutation();

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  // Properly attach/detach scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    // call once to initialize
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((item: any) =>
          data.course.find((course: any) => item.id === course.id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user]);

  const logOutHandler = async () => {
    try {
      // call server logout endpoint
    //  await logoutTrigger().unwrap(); // unwrap throws on error
      // then sign out of next-auth session (this redirects by default)
      await signOut();
    } catch (err) {
      console.error("Logout failed:", err);
      // optionally show a toast or handle UI on error
    }
  };

  // Show loader if getting courses OR logout is in progress
  if (isLoading || isLoggingOut) {
    return <Loader />;
  }

  return (
    <div className="w-[85%] flex mx-auto">
      {/* Main container*/}
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-[#f5f5f5] bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000012] rounded-[5px] shadow-md dark:shadow-sm mt-20 mb-20 sticky ${
          scroll ? "top-[120px]" : "top-8"
        } left-8`}
      >
        {/* Sticky-Sidebar   */}
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
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} isProfile={true} />
                ))}
            </div>
            {courses.length === 0 && (
              <h1 className="text-center text-[18px] font-Poppins">
                You don&apos;t have any purchased courses!
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
