import { useState, useEffect, useRef, use } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ApiContext } from "../../Store/apiContext";
import Alert from "../../Utils/alert";

const UserProfileNavbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const dropdownRef = useRef(null);
  const { authApi } = use(ApiContext);
  const navigate = useNavigate();
  
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
    setAlert(true)
    setUser(null);
    setIsOpen(false);
    navigate(`/authentication`)
  };

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
        <Alert
        message="User Log Out Successfully!!"
        type="blue"
      />
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
              src={(user.profileImage?.url) ? user.profileImage?.url : '/fmk_logo.png'}
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
