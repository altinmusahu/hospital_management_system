import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import picture from "../assets/healthcare.gif";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isStaff, setIsStaff] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        `http://localhost:3000/auth/login?staff=${isStaff}`,
        credentials
      );
      if (request.status === 200) {
        localStorage.setItem("token", request.data.token);
        localStorage.setItem("role", request.data.Roli);
        localStorage.setItem("userId", request.data.id);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());
        localStorage.setItem("refreshToken", request.data.refreshToken);
        setCredentials({ email: "", password: "" });

        if (request.data.Roli === 4) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("Email doesn't exist");
      } else if (err.response.status === 400) {
        toast.success(
          "Please confirm your account.\nA verification code was sent to your email"
        );
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="relative">
        <div className="flex justify-end items-center min-h-screen ">
          <div className="w-96 bg-white rounded-lg shadow p-6 space-y-4 h-96 mx-56">
            <h1 className="text-xl leading-tight tracking-wide text-black mb-12">
              Sign in to your account as {isStaff ? "Staff" : "User"}
            </h1>
            <form className="space-y-4" onSubmit={loginHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black tracking-wider"
                  required
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials((data) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                  id="email"
                  className="bg-gray-50 border  sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-800 dark:text-gray-800"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black tracking-wider"
                  required
                >
                  Your password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((data) => ({
                      ...data,
                      password: e.target.value,
                    }))
                  }
                  id="password"
                  className="bg-gray-50 border  sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-800 dark:text-gray-800"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-800 rounded bg-gray-800 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-700 dark:text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <NavLink
                  to="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </NavLink>
              </div>
              <button
                type="submit"
                className="w-full text-white tracking-wider focus:ring-4 hover:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-700"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <NavLink
                  to="/register"
                  className="font-bold text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </NavLink>
              </p>
            </form>
            <button
              onClick={() => setIsStaff((prevState) => !prevState)}
              type="button"
              className="w-full text-black tracking-wider focus:ring-4 hover:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-700"
            >
              Login{isStaff ? " as User" : " as Staff"}
            </button>
          </div>
        </div>
        <img src={picture} className="absolute inset-0 w-2/5 top-56 mx-56" />
      </section>
    </>
  );
}
