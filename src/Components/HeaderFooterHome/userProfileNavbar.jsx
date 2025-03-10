import { useState, useEffect, useRef, use } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ApiContext } from "../../Store/apiContext";

const UserProfileNavbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const dropdownRef = useRef(null);
  const { authApi } = use(ApiContext);
  
  // Fetch User Data
  const mutation = useMutation({
    mutationFn: () => authApi.getUser(),
    onSuccess: (data) => {
      setUser(data.data);
    },
    onError: () => {
      setUser(null);
    },
  });

  useEffect(() => {
    mutation.mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setAlert(true);
    setUser(null);
    setIsOpen(false);
  };

  // Auto-hide alert after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("alert-1")?.remove();
    }, 6000);
    return () => clearTimeout(timer);
  }, [alert]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {alert && (
        <div
          id="alert-1"
          className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center p-4 text-blue-300 shadow-lg"
          role="alert"
        >
          <div className="flex items-center space-x-3 px-6 py-3 rounded-lg border border-blue-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-md">
            <svg
              className="shrink-0 w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="text-sm font-medium">
              User Log Out Successfully!!
            </div>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-white"
              data-dismiss-target="#alert-1"
              aria-label="Close"
              onClick={() => document.getElementById("alert-1")?.remove()}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {!user ? (
        <Link to="/authentication">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log In
          </button>
        </Link>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(prev => !prev)}
            className="flex text-sm bg-indigo-500 rounded-full md:me-0 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800 dark:bg-indigo-600"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={user.profileImage?.url}
              alt="User"
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
                {user.admin === "Yes" && (
                  <li>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 dark:hover:bg-blue-700 dark:text-white"
                    >
                      Admin
                    </Link>
                  </li>
                )}
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
