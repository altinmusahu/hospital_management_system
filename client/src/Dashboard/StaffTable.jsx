import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Sidebar } from "./Dashboard";

export default function StaffTable() {
  const [newStaff, setNewStaff] = useState({
    Emri: "",
    Mbiemri: "",
    Email: "",
    password: "",
    DataPunesimit: "",
    Roli: undefined,
    addedAttribute: undefined,
  });

  const [staffList, setStaffList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [departments, setDepartments] = useState([]);
  const getRoleString = (role) => {
    if (role == 3) {
      return "Doctor";
    } else if (role == 2) {
      return "Nurse";
    } else {
      return "Unknown";
    }
  };

  const toggleFormModal = () => {
    setShowForm(!showForm);
    setIsUpdating(false);
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/all-staff`);

      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/departments`
        );
        // console.log("Fetched departments:", response.data);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        await axios.put(
          `http://localhost:3000/admin/staff/${newStaff.Id}`,
          newStaff
        );
      } else {
        await axios.post(`http://localhost:3000/admin/staff`, newStaff);
      }
      fetchStaff();

      setNewStaff({
        Emri: "",
        Mbiemri: "",
        Email: "",
        password: "",
        DataPunesimi: "",
        Roli: undefined,
        addedAttribute: undefined,
      });
      setShowForm(false);
      setIsUpdating(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (id) => {
    setShowForm(true);
    setIsUpdating(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/admin/one-staff/${id}`
      );
      const staffData = response.data;
      setNewStaff({
        ...staffData[0],
        DataPunesimit: new Date(staffData[0].DataPunesimit)
          .toISOString()
          .substr(0, 10),
      });
    } catch (error) {
      console.error("Error fetching staff details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmed.isConfirmed) {
        await axios.delete(`http://localhost:3000/admin/staff/${id}`);
        fetchStaff();
        Swal.fire({
          title: "Deleted!",
          text: "Your staff member has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };
  return (
    <div className="w-[100%] flex">
      <Sidebar></Sidebar>
      <div className="lg:w-3/4 mt-20">
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-4 flex mx-auto justify-center">
            Staff Employees Data
          </h1>
          {/* Table code */}
          <div className="w-[90%] h-96 mx-auto">
            <table className="w-[90%] border-collapse border border-gray-300 mx-auto mt-10">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Name</th>
                  <th className="px-4 py-2 border border-gray-300">Lastname</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Date of Employment
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Role</th>
                  <th className="px-9 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff.Id} className="text-center ">
                    <td className="px-4 py-2 border border-gray-300">
                      {staff.Emri}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {staff.Mbiemri}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {staff.Email}
                    </td>

                    <td className="px-4 py-2 border border-gray-300">
                      {new Date(staff.DataPunesimit).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {getRoleString(staff.Roli)}
                    </td>
                    <td className="flex flex-row justify-center px-4 py-2  border border-gray-200">
                      <button
                        onClick={() => handleUpdate(staff.Id)}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg mx-1 flex items-center"
                      >
                        <FaEdit className="mr-1" /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(staff.Id)}
                        className="text-white bg-red-500 hover:bg-red-900 px-3 py-1 rounded-lg mx-1 flex items-center"
                      >
                        <MdDelete className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={toggleFormModal}
              className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add Staff
            </button>

            {/* Form modal */}
            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg p-20 max-w-md mx-auto">
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    {isUpdating ? "Update Staff" : "Add New Staff"}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    {/* Input fields */}
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="Emri"
                        value={newStaff["Emri"]}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="Mbiemri"
                        value={newStaff["Mbiemri"]}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Lastname
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="Email"
                        value={newStaff["Email"]}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="password"
                        name="password"
                        value={newStaff["password"]}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="date"
                        name="DataPunesimit"
                        value={newStaff["DataPunesimit"]}
                        onChange={handleChange}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="floating_date"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Date
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 mt-2 group">
                      <select
                        name="Roli"
                        value={newStaff["Roli"]}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option value="">Select an option</option>
                        <option value={3}>Doctor</option>
                        <option value={2}>Nurse</option>
                      </select>

                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Role
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 mt-2 group">
                      {newStaff.Roli === "3" && (
                        <div className="relative z-0 w-full mb-5 mt-2 group">
                          <select
                            name="addedAttribute"
                            value={newStaff.addedAttribute}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          >
                            <option value="">Select department</option>
                            {departments.map((dept) => (
                              <option key={dept.Id} value={dept.Id}>
                                {dept.Name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {newStaff.Roli === "2" && (
                        <select
                          name="addedAttribute"
                          value={newStaff.addedAttribute}
                          onChange={handleChange}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                          <option value="">Select shift</option>
                          <option value="Paradite">Paradite</option>
                          <option value="Pasdite">Pasdite</option>
                        </select>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                    >
                      {isUpdating ? "Update Staff" : "Add Staff"}
                    </button>
                    <button
                      onClick={toggleFormModal}
                      className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
