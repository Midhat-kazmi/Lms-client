"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Loader } from "../Loader/Loader";

const Hero = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Mock data for now
  const isLoading = false;
  const data = {
    layout: {
      banner: {
        image: { url: "/assets/hero-banner-1.png" },
        title: "Welcome to LMS",
        subTitle: "Learn anytime, anywhere with our trusted platform.",
      },
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search === "") return;
    router.push(`/courses?title=${search}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-8 py-10 lg:py-0 relative overflow-hidden">
          {/* Animated background circle */}
          <div className="absolute top-[75px] lg:left-[100px] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] hero_animation rounded-full opacity-20 lg:opacity-30"></div>

          {/* Hero banner Image */}
          <div className="lg:w-1/2 flex items-center justify-center z-10 mb-8 lg:mb-0">
            <Image
              src="https://res.cloudinary.com/dgve6ewpr/image/upload/v1759371686/lms-learning-management-system-as-online-education-concept-educational-technology-online-learning-delivery-training-knowledge-software-application-qualification-framework-illustration-free-vector_uk8cmt.jpg"
              width={320}
              height={320}
              alt="Hero Banner"
              className="object-cover w-64 h-64 lg:w-80 lg:h-80 rounded-full shadow-lg"
            />
          </div>

          {/* Hero content section */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Main headline */}
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
              {data.layout.banner.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              {data.layout.banner.subTitle}
            </p>

            {/* Search form */}
            <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search Courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-12 px-4 pr-12 text-lg text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors"
                >
                  <BiSearch className="text-white" size={24} />
                </button>
              </div>
            </form>

            {/* Trust indicators */}
            {/* Trust indicators */}
<div className="flex items-center space-x-4">
  <div className="flex -space-x-4">
    <Image
      src="https://res.cloudinary.com/dgve6ewpr/image/upload/v1759371687/f49a1537ed0ad0933cc151f8253d8100_revxua.jpg"
      alt="User 1"
      width={48}
      height={48}
      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-900"
    />
    <Image
      src="https://res.cloudinary.com/dgve6ewpr/image/upload/v1754548277/avatars/c3t4yrlzawahrptjdkt8.jpg"
      alt="User 2"
      width={48}
      height={48}
      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-900"
    />
    <Image
      src="https://res.cloudinary.com/dgve6ewpr/image/upload/v1757171811/avatars/k3ppf5cqmjl1bkko8mrn.jpg"
      alt="User 3"
      width={48}
      height={48}
      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-900"
    />
  </div>
  <p className="text-sm text-gray-600 dark:text-gray-300">
    <span className="font-semibold">500K+</span> People already trust us.{" "}
    <Link href="/courses" className="text-blue-500 hover:underline">
      View Courses
    </Link>
  </p>
</div>

          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
