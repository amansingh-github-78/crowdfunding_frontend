import { useState } from "react";
import { Link } from "react-router-dom";
import UserProfileNavbar from "./userProfileNavbar";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-blue-50 border-gray-200 dark:bg-blue-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/fmk_logo.png" className="h-8" alt="FundMyKnowledge Logo" />
            <span className="self-center lg:text-2xl md:text-2xl sm:text-sm font-semibold whitespace-nowrap text-blue-900 dark:text-white">
              FundMyKnowledge
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-900 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-200 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
              aria-controls="navbar-user"
              aria-expanded={isUserMenuOpen}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <UserProfileNavbar />
          </div>
          {/* Toggle mobile menu */}
          <div
            className={`items-center justify-between ${
              isUserMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border-2 border-blue-400 rounded-lg bg-blue-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-50 dark:bg-blue-900 md:dark:bg-blue-900 dark:border-blue-800">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-blue-900 rounded-sm hover:bg-blue-600 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-300"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="block lg:block md:hidden">
                <Link
                  to="/explore"
                  className="block py-2 px-3 text-blue-900 rounded-sm hover:bg-blue-600 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-300"
                  aria-current="page"
                >
                  Explore Campaigns
                </Link>
              </li>
              <li className="block lg:block md:hidden">
                <Link
                  to="/start"
                  className="block py-2 px-3 text-blue-900 rounded-sm hover:bg-blue-600 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-300"
                  aria-current="page"
                >
                  Start Campaign
                </Link>
              </li>
              <li className="block lg:block md:hidden">
                <Link
                  to="/mycampaigns"
                  className="block py-2 px-3 text-blue-900 rounded-sm hover:bg-blue-600 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-300"
                  aria-current="page"
                >
                  My Campaigns
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 text-blue-900 rounded-sm hover:bg-blue-600 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-blue-900 rounded-sm hover:bg-blue-600 md:hover:bg-transparent md:hover:text-indigo-600 md:p-0 dark:text-white md:dark:hover:text-indigo-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
