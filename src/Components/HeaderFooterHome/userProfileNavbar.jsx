import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const UserProfileNavbar = () => {
  // Dummy user data (Replace with real authentication logic)
  // const dummyUser1 = {
  //   name: "Aman 1",
  //   email: "singhamandeep0708@gmail.com",
  //   avatar: "/favicon.ico",
  //   admin: "No",
  // };
  const dummyUser2 = {
    name: "Aman 2",
    email: "as2041909@gmail.com",
    avatar: "/favicon.ico",
    admin: "Yes",
  };

  const [user, setUser] = useState(null); // Initially, no user is logged in
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const dropdownRef = useRef(null);

  const dummyUserSelection = () => {
    const success = true  // << Change this to false to see logged in user profile and check admin and deashboard features
    if (success) {
      handleLogout
    } else {
      setUser(dummyUser2);
    }
  };

  const handleLogout = () => {
    setUser(null); // Logs out the user
    setIsOpen(false); // Close dropdown
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!user ? (
        <Link to="/authentication">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={dummyUserSelection()} // Simulating login (Remove this in real authentication)
          >
            Log In
          </button>
        </Link>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm bg-indigo-500 rounded-full md:me-0 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800 dark:bg-indigo-600"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={user.avatar}
              alt="user photo"
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-blue-800 dark:divide-blue-700">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.name}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-blue-200">
                  {user.email}
                </span>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 dark:hover:bg-blue-700 dark:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className={user.admin === "Yes" ? "" : "hidden"}>
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 dark:hover:bg-blue-700 dark:text-white"
                  >
                    Admin
                  </Link>
                </li>
                {/* <li>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 dark:hover:bg-blue-700 dark:text-white">
                    Profile
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 dark:hover:bg-blue-700 dark:text-white">
                    Settings
                  </Link>
                </li> */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 dark:hover:bg-blue-700 dark:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfileNavbar;
