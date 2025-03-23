"use server";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-50 dark:bg-blue-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <img
                  src="/fmk_logo.png"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-900 dark:text-white">
                  FundMyKnowledge
                </span>
              </Link>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 gap-8 sm:gap-6">
              <div>
                <h2 className="mb-4 text-sm font-semibold text-blue-900 uppercase dark:text-white">
                  Email
                </h2>
                <ul className="text-blue-700 dark:text-blue-300 font-medium space-y-2">
                  <li>
                    <p className="hover:underline break-all">
                      as2041909@gmail.com
                    </p>
                  </li>
                  <li>
                    <p className="hover:underline break-all">
                      singhamandeep0708@gmail.com
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-sm font-semibold text-blue-900 uppercase dark:text-white">
                  Contact
                </h2>
                <ul className="text-blue-700 dark:text-blue-300 font-medium space-y-2">
                  <li>
                    <p className="hover:underline">+910000000000</p>
                  </li>
                  <li>
                    <p className="hover:underline">+911029384756</p>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-blue-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-blue-700 dark:text-blue-300 font-medium">
                  <li className="mb-4">
                    <Link to="/about" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blue-200 sm:mx-auto dark:border-blue-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-blue-700 sm:text-center dark:text-blue-300">
              ©{" "}
              {new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
              })}{" "}
              <Link to="/" className="hover:underline">
                FundMyKnowledge™
              </Link>
              . All Rights Reserved.
            </span>

            <div>
              <div className="flex mb-2 mt-4 sm:justify-center sm:mt-0">
                <h1 className="text-white font-bold">Powered By</h1>
              </div>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                <a
                  href="https://www.linkedin.com/in/amandeep-singh-098782255/"
                  target="_blank"
                  className="text-blue-300 hover:text-white"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.225 0H1.771C.792 0 0 .775 0 1.732v20.536C0 23.225.792 24 1.771 24h20.453c.979 0 1.776-.775 1.776-1.732V1.732C24 .775 23.204 0 22.225 0zM7.125 20.452H3.558V9h3.567v11.452zM5.341 7.56a2.071 2.071 0 1 1 0-4.141 2.071 2.071 0 0 1 0 4.141zM20.452 20.452h-3.566v-5.567c0-1.328-.027-3.04-1.854-3.04-1.855 0-2.14 1.45-2.14 2.949v5.658H9.326V9h3.422v1.562h.049c.478-.902 1.646-1.855 3.387-1.855 3.623 0 4.268 2.385 4.268 5.49v6.255z" />
                  </svg>
                  <span className="sr-only">Linkedln</span>
                </a>
                <a
                  href="https://www.instagram.com/amandeepsingh_tech/profilecard/?igsh=YWU0Zm9wZDh4cjN5"
                  target="_blank"
                  className="text-blue-300 hover:text-white ms-5"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.69 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.148 3.225-1.664 4.771-4.919 4.919-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-3.225-.148-4.771-1.664-4.919-4.919C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849C2.38 3.926 3.928 2.38 7.163 2.232 8.429 2.175 8.809 2.163 12 2.163M12 0C8.741 0 8.332.013 7.052.07 3.174.236.236 3.17.07 7.052.013 8.332 0 8.741 0 12c0 3.259.013 3.668.07 4.948.166 3.882 3.104 6.816 6.982 6.982C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.07c3.882-.166 6.816-3.1 6.982-6.982.057-1.28.07-1.689.07-4.948s-.013-3.668-.07-4.948c-.166-3.882-3.1-6.816-6.982-6.982C15.668.013 15.259 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-10.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://x.com/amanDS_tech?t=vlSU4WR8Z5Ea5VmjjQMzfg&s=09"
                  target="_blank"
                  className="text-blue-300 hover:text-white ms-5"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 17"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Twitter page</span>
                </a>
                <a
                  href="https://github.com/amansingh-github-78"
                  target="_blank"
                  className="text-blue-300 hover:text-white ms-5"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">GitHub account</span>
                </a>
                <a
                  href="https://www.amandeepsingh.tech"
                  target="_blank"
                  className="text-blue-300 hover:text-white ms-5"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Dribbble account</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
