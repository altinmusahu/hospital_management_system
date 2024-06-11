import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import AssignDoctor from "../components/Modals/AssignDoctorModal";
import { Sidebar } from "./Dashboard";

const statuses = ["Pending", "Assigned", "Completed", "Cancelled"];

const Appointment = () => {
  const apps = useLoaderData();
  const [appointments, setAppointments] = useState(apps);
  const [status, setStatus] = useState(statuses[0]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);

  const [month, setMonth] = useState();

  useEffect(() => {
    const filteredAppointments = apps.filter((app) => app.Statusi === status);
    setAppointments(filteredAppointments);
  }, [status, apps]);

  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);
  useEffect(() => {
    const processedData = [];
    appointments.map((app) =>
      processedData.push({
        Id: app.Id,
        Date: app.Date,
        Department: app.Department.Name,
        Doctor: app.DoctorId,
        Patient: app.Patient.Emri + " " + app.Patient.Mbiemri,
        Pershkrimi: app.Pershkrimi,
        Statusi: app.Statusi,
      })
    );
    setToDownload(processedData);
  }, [appointments]);

  const [toDownload, setToDownload] = useState([]);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(toDownload)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  const downloadAppointmentsPerMonth = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:3000/admin/month-report?month=${month}`
    );
    setToDownload(response.data);
    exportData();
  };

  const cancelAppointment = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Cancel appointment?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      });

      if (confirmed.isConfirmed) {
        const request = await axios.patch(
          `http://localhost:3000/admin/cancel-appointment/${id}`
        );
        if (request.status === 200) {
          setStatus(statuses[2]);
          Swal.fire({
            title: "Deleted!",
            text: "Appointment has been cancelled.",
            icon: "success",
          });
        } else {
          console.error("Failed to cancel the appointment");
        }
      }
    } catch (err) {
      console.error("Error cancelling the appointment:", err);
    }
  };

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="lg:w-3/4 mt-20">
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-4 flex mx-auto justify-center">
            Appointments
          </h1>
          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className="p-3 border rounded-lg bg-emerald-800 text-white text-center ml-14"
          >
            <option key={0.01} value=""></option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <div className="w-[90%] mx-auto mt-10">
            <table className="w-[100%] border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-gray-300">Data</th>
                  <th className="px-4 py-2 border border-gray-300">Ora</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Pershkrimi
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Statusi</th>
                  <th className="px-4 py-2 border border-gray-300">Emri</th>
                  <th className="px-4 py-2 border border-gray-300">Mbiemri</th>
                  <th className="px-4 py-2 border border-gray-300">Mosha</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Department
                  </th>
                  {status !== "Cancelled" && (
                    <th className="px-4 py-2 border border-gray-300">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {appointments.map((med) => (
                  <tr key={med.Id}>
                    <td className="px-4 py-2 border border-gray-300">
                      {med.Date.toString().split("T")[0]}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {med.Date.toString().split("T")[1].split(":00")[0]}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {med.Pershkrimi}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {med.Statusi}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {med.Patient.Emri}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {med.Patient.Mbiemri}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {med.Patient.Mosha}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {med.Department.Name}
                    </td>
                    {status !== "Cancelled" && (
                      <td className="flex flex-row justify-center px-4 py-2 border border-gray-300">
                        {status === "Pending" && (
                          <button
                            onClick={() => {
                              showModal();
                              setData(med);
                            }}
                            className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg mx-1 flex items-center"
                          >
                            Assign
                          </button>
                        )}
                        <button
                          onClick={() => cancelAppointment(med.Id)}
                          className="text-white bg-red-500 hover:bg-red-900 px-3 py-1 rounded-lg mx-1 flex items-center"
                        >
                          Cancel
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {modal && <AssignDoctor hideModal={hideModal} data={data} />}
          </div>
        </div>
        <p className="font-bold pl-16 pt-4 w-full justify-center items-center">
          Export all appointments as:{" "}
        </p>
        <br />
        <div className="flex flex-row gap-2 ml-14 justify-center w-52">
          <button
            type="button"
            className="border w-20 text-sm bg-gray-200 border-black text-center"
            onClick={exportData}
          >
            JSON
          </button>
          <CSVLink
            className="border w-20 text-sm bg-gray-200 border-black text-center p-1"
            data={toDownload}
          >
            CSV
          </CSVLink>
          <br />
        </div>
        <form className="ml-14" onSubmit={downloadAppointmentsPerMonth}>
          <p className="font-bold pt-4 w-full justify-center items-center">
            or generate by selected month:
          </p>
          <select
            className="border p-1 border-black mr-4 mt-2"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value={1}>Janar</option>
            <option value={2}>Shkurt</option>
            <option value={3}>Mars</option>
            <option value={4}>Prill</option>
            <option value={5}>Maj</option>
            <option value={6}>Qershor</option>
            <option value={7}>Korrik</option>
            <option value={8}>Gusht</option>
            <option value={9}>Shtator</option>
            <option value={10}>Tetor</option>
            <option value={11}>Nentor</option>
            <option value={12}>Dhjetor</option>
          </select>
          <button
            className="border border-green-700 bg-green-700 text-white hover:bg-inherit hover:text-green-700 p-1"
            type="submit"
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;

export const loader = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/admin/appointments"
    );
    return response.data.rows;
  } catch (error) {
    console.error("Error loading appointments:", error);
    return [];
  }
};
