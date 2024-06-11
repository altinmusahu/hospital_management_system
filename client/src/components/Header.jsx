import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

export default function Header({ textColor, btnColor }) {
  const token = useRouteLoaderData("root");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex justify-between items-center p-6 tracking-wider absolute z-50 w-full ${textColor}`}
    >
      <NavLink
        to="/"
        className="uppercase mx-6 md:mx-28 text-xl md:text-2xl font-semibold"
      >
        Orthoc
      </NavLink>
      <div className="flex items-center space-x-4 md:space-x-32">
        <ul
          className={`flex justify-end items-center relative gap-3 md:gap-9 uppercase text-sm md:text-base`}
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/departaments">Departments</NavLink>
          <NavLink to="/doctors">Doctors</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
          {token && localStorage.getItem("role") == 4 && (
            <NavLink to="/admin">Dashboard</NavLink>
          )}
        </ul>
        {!token ? (
          <div className="flex items-center justify-center -mx-1 md:-mx-2">
            <NavLink
              to="/login"
              className={`focus:outline-none border hover:text-[#62d2a2] hover:border-[#62d2a2] ${btnColor} text-white border-white font-medium rounded-lg text-xs md:text-sm px-6 md:px-8 py-2 md:py-2.5 me-1 md:me-2 mb-2`}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={`focus:outline-none border hover:text-[#62d2a2] hover:border-[#62d2a2] text-white ${btnColor} border-white font-medium rounded-lg text-xs md:text-sm px-6 md:px-8 py-2 md:py-2.5 me-1 md:me-2 mb-2`}
            >
              Sign up
            </NavLink>
          </div>
        ) : (
          <div className="relative px-4" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
              <button className={`px-6 py-2 rounded-lg bg-emerald-800 flex justify-center items-center ${btnColor}`}>
                Your Account
                <svg className="w-4 h-4 ml-1 flex justify-center items-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </button>
            {dropdownVisible && (
              <div className="absolute flex flex-col justify-center items-center mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {localStorage.getItem("role") == 1 && (
                  <NavLink to="/my-profile" className="flex justify-center items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</NavLink>
                )}
                {localStorage.getItem("role") == 3 && (
                  <NavLink to="/doctor" className="flex justify-center items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</NavLink>
                )}
                <Form action="/logout" method="post" className="block w-full text-left">
                  <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                </Form>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  textColor: PropTypes.string,
  btnColor: PropTypes.string,
};