const LogIn = ({ onSwitch, onForgot }) => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg bg-blue-900 p-6 rounded-lg shadow-md">
          <div className="bg-blue-900 text-white max-w-lg font-semibold mb-4">
            This is just a dummy text , Ignore this , i will remove this in
            future. This is just to inform you that if you want to see logged in
            user profile for checking out dashboard and admin pages . just go to
            codebase and in components folder , go to HeaderFooterHome folder
            and then to userProfileNavbar.jsx , then in it, there is a function
            called dummyUserSelection at line 23 , there just change success =
            false and you will be able to see logged in user profile and those
            pages.
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-white">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Login
            </button>
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={onForgot}
                className="text-white mt-2 block hover:underline"
              >
                Forgot Password?
              </button>
              <p className="mt-1 mb-1 text-white">or</p>
              <button
                onClick={onSwitch}
                className="bg-blue-500 text-white mt-2 py-2 rounded-md hover:bg-blue-600 w-full"
              >
                Create an Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
