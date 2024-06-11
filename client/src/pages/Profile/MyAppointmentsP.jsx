import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import ResultsModal from "../../components/Modals/PatientResultModal.jsx";
import Swal from "sweetalert2";

const statuses = ["Pending", "Assigned", "Completed"];

export default function MyAppointmentsP() {
  const apps = useLoaderData();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState(apps);
  const [status, setStatus] = useState(statuses[0]);

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    filterAppointments();
  }, [status, apps]);

  const filterAppointments = () => {
    const filteredAppointments = apps.filter((app) => app.Statusi === status);
    setAppointments(filteredAppointments);
  };

  const cancelAppointment = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (confirmed.isConfirmed) {
        const token = localStorage.getItem("token");
        if (!token) {
          return redirect("/login");
        }
        const response = await axios.delete(
          `http://localhost:3000/delete-my-appointment/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          Swal.fire({
            title: "Cancelled!",
            text: "Your appointment has been cancelled.",
            icon: "success",
          });

          // Update appointments state by filtering out the canceled appointment
          const updatedAppointments = appointments.filter(
            (app) => app.Id !== id
          );
          setAppointments(updatedAppointments);
        }
      }
    } catch (error) {
      console.error("Error cancelling appointment: ", error);
    }
  };

  return (
    <>
      <div className="flex ">
        <Sidebar />
        <div className="container mx-auto mt-10 pt-10">
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
          <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className="mb-6 p-3 border rounded-lg bg-emerald-800 text-white text-center"
          >
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((appointment) => (
              <div
                key={appointment.Id}
                className="bg-gray-200 shadow-md p-6 rounded-lg border border-gray-300"
              >
                <div className="text-lg font-semibold mb-2 text-gray-700">
                  {appointment.Pershkrimi}
                </div>
                <div className="text-gray-700 mb-1">
                  <span className="font-semibold">Date: </span>
                  {appointment.Date.split("T")[0]}
                </div>
                <div className="text-gray-700 mb-1">
                  <span className="font-semibold">Time: </span>
                  {appointment.Date.split("T")[1].split(":00")[0]}
                </div>
                <div className="text-gray-700 mb-1">
                  <span className="font-semibold">Status: </span>
                  {appointment.Statusi}
                </div>
                <div className="text-gray-700 mb-1">
                  <span className="font-semibold">Doctor: </span>
                  {appointment.Doctor
                    ? `${appointment.Doctor.Staff.Emri} ${appointment.Doctor.Staff.Mbiemri}`
                    : "Not Assigned"}
                </div>
                <div className="text-gray-700">
                  <span className="font-semibold">Department: </span>
                  {appointment.Department.Name}
                </div>
                {appointment.Statusi === "Completed" && (
                  <button
                    onClick={() => openModal(appointment)}
                    className="border bg-yellow-500 p-2 rounded mt-2 font-bold hover:bg-yellow-600"
                  >
                    Results
                  </button>
                )}
                {status === "Assigned" && (
                  <button
                    onClick={() => cancelAppointment(appointment.Id)}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <ResultsModal
          appointmentId={selectedAppointment.Id}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export const loader = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  const response = await axios.get("http://localhost:3000/my-appointments", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 200) {
    return response.data;
  }
  return null;
};
