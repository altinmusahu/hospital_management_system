import axios from "axios";
import { useState } from "react";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import Sidebar from "../Profile/Sidebar";

const DoctorProfile = () => {
  const token = useRouteLoaderData("root");
  const [data, setData] = useState(useLoaderData());
  const navigate = useNavigate();


  const updateData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const request = await axios.put(
      "http://localhost:3000/edit-my-profile",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (request.status === 200) {
      navigate("/");
      alert("Updated");
    } else {
      return;
    }
  };

  return (
    <section className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-14">
        <button
            className="flex items-center mb-6 text-blue-600 hover:text-blue-800"
            onClick={() => navigate("/")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back Home
          </button>
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <form onSubmit={updateProfile} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="emri" className="block text-sm font-medium text-gray-700">Emri</label>
              <input
                type="text"
                name="Emri"
                onChange={updateData}
                value={data.Emri}
                className="mt-1 block py-2 w-full rounded-md focus:outline-none sm:text-md tracking-wider"
              />
            </div>
            <div>
              <label htmlFor="mbiemri" className="block text-sm font-medium text-gray-700">Mbiemri</label>
              <input
                type="text"
                name="Mbiemri"
                onChange={updateData}
                value={data.Mbiemri}
                className="mt-1 block py-2 w-full rounded-md focus:outline-none sm:text-md tracking-wider"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="Email"
                onChange={updateData}
                value={data.Email}
                className="mt-1 block py-2 w-full rounded-md focus:outline-none sm:text-md tracking-wider"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Departamenti</label>
              <input
                type="text"
                name="City"
                onChange={updateData}
                value={data.Doctors[0].Department.Name}
                className="mt-1 block py-2 w-full rounded-md focus:outline-none sm:text-md tracking-wider"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default DoctorProfile;

export const loader = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  const request = await axios.get("http://localhost:3000/admin/staff-details", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (request.status === 200) {
    return request.data;
  }
  return null;
};