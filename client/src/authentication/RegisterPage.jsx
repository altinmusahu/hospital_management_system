import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage({ showAlert }) {
  const nav = useNavigate();

  const [Emri, setName] = useState("");
  const [Mbiemri, setLastname] = useState("");
  const [Mosha, setAge] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [City, setCity] = useState("");
  const [Shteti, setState] = useState("");
  const [allStates, setAllStates] = useState([]);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/countries")
      .then((response) => {
        setAllStates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/register", {
        Emri,
        Mbiemri,
        Mosha,
        Email,
        password,
        City,
        Shteti,
        Roli: 1,
      })
      .then((result) => {
        setMsg(result.data.message);
        showAlert("Registration successful!");
        nav("/login");
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          toast.error("Email is already in use. Please use a different email.");
        } else {
          console.error("Registration error:", err);
          toast.error("An error occurred during registration.");
        }
      });
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
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow p-6 space-y-4 mt-12">
            <h1 className="text-xl leading-tight tracking-wide text-black mb-4">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 tracking-wide"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={Emri}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 tracking-wide"
                  >
                    Your lastname
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={Mbiemri}
                    onChange={(e) => setLastname(e.target.value)}
                    className="bg-gray-50 border sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                    placeholder="Your lastname"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 tracking-wide"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-gray-50 border sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 tracking-wide"
                  >
                    State
                  </label>
                  <select
                    name="state"
                    id="state"
                    value={Shteti}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-gray-50 border sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                    required
                  >
                    <option value="">Select a state</option>
                    {allStates.map((state, index) => (
                      <option key={index} value={state.Shteti}>
                        {state.Shteti}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 tracking-wide"
                >
                  Your age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={Mosha}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-gray-50 border sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your age"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 tracking-wide"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 tracking-wide"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5"
                  placeholder="Your email"
                  required
                />
              </div>
              {msg && <div>{msg}</div>}
              {/* Password field and submit button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

RegisterPage.propTypes = {
  showAlert: PropTypes.any,
};
