import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import AppointmentResult from "../../components/Modals/AppointmentResult";
import Sidebar from "../Profile/Sidebar.jsx"

const statuses = ["Assigned", "Completed"];

const MyAppointments = () => {
  const apps = useLoaderData();
  const [appointments, setAppointments] = useState(apps);
  const [status, setStatus] = useState(statuses[0]);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [appointmentId, setAppointmentId] = useState();

  useEffect(() => {
    const filteredAppointments = apps.filter((app) => app.Statusi === status);
    setAppointments(filteredAppointments);
  }, [status, apps]);

  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  return (
    <div className=" flex">
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
            <h2 className="text-2xl font-bold mb-6">Appointments</h2>

        <div className="w-full">
          <select className="px-2 py-2 rounded-2xl" onChange={(e) => setStatus(e.target.value)} value={status}>
            <option key="0.011"></option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <div className="w-[90%] h-96">
            <table className="w-[90%] bg-stone-50 rounded-lg mt-8 ml-10">
              <thead>
                <tr>
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Ora</th>
                  <th className="px-4 py-2">Pershkrimi</th>
                  <th className="px-4 py-2">Statusi</th>
                  <th className="px-4 py-2">Emri</th>
                  <th className="px-4 py-2">Mbiemri</th>
                  <th className="px-4 py-2">Mosha</th>
                  {/* <th className="px-9 py-2">Department</th> */}
                  {status === "Assigned" && (
                    <th className="px-9 py-2">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {appointments.map((med) => (
                  <tr key={med.Id} className="text-center">
                    <td>{med.Date.toString().split("T")[0]}</td>
                    <td>{med.Date.toString().split("T")[1].split(":00")[0]}</td>
                    <td>{med.Pershkrimi}</td>
                    <td>{med.Statusi}</td>
                    <td>{med.Patient.Emri}</td>
                    <td>{med.Patient.Mbiemri}</td>
                    <td>{med.Patient.Mosha}</td>
                    {/* <td>{med.Department.Name}</td> */}
                    {status === "Assigned" && (
                      <td>
                        <button
                          onClick={() => {
                            showModal();
                            setAppointmentId(med.Id);
                          }}
                          className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg"
                        >
                          Result
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {modal && (
              <AppointmentResult hideModal={hideModal} id={appointmentId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;

export async function loader() {
  const token = localStorage.getItem("token");
  const result = await axios.get("http://localhost:3000/doctor/appointments", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (result.status === 200) {
    return result.data;
  }
  return null;
}
