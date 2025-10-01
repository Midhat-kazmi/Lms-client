"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            About
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <Link href="/about" className="hover:underline">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <Link href="/courses" className="hover:underline">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:underline">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:underline">
                Course Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Social Links
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Youtube
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Github
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Newsletter
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Stay up-to-date with everything related to our brand and gain invaluable insights 
            for your programming journey by subscribing to our newsletter.
          </p>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Connect
          </button>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8">
        <p className="text-center text-gray-600 dark:text-gray-400 py-6 text-sm">
          Copyright © 2025 ELearning | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
