import axios from "axios";
import { useEffect, useState } from "react";
import { Sidebar } from "./Dashboard";

export default function Patients() {
  const [patientList, setPatientList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const patientsPerPage = 10;

  const fetchPatients = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/patients`, {
        params: {
          page,
          limit: patientsPerPage,
        },
      });
      setPatientList(response.data.data);
      setTotalPatients(response.data.total);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalPatients / patientsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="lg:w-3/4 mt-20">
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-4 flex mx-auto justify-center">
            Patients
          </h1>

          <table className="w-[60%] border-collapse border border-gray-300 mx-auto mt-10">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border w-[20%] border-gray-300">Emri</th>
                <th className="px-4 py-2 border w-[10%] border-gray-300">Mbiemri</th>
                <th className="px-4 py-2 border w-[20%] border-gray-300">Mosha</th>
                <th className="px-4 py-2 border w-[20%] border-gray-300">Email</th>
                <th className="px-4 py-2 border w-[20%] border-gray-300">City</th>
                <th className="px-4 py-2 border w-[20%] border-gray-300">Shteti</th>
              </tr>
            </thead>
            <tbody>
              {patientList &&
                patientList.map((patient) => (
                  <tr key={patient.Id}>
                    <td className="px-4 py-2 border border-gray-300">{patient.Emri}</td>
                    <td className="px-4 py-2 border border-gray-300">{patient.Mbiemri}</td>
                    <td className="px-4 py-2 border border-gray-300">{patient.Mosha}</td>
                    <td className="px-4 py-2 border border-gray-300">{patient.Email}</td>
                    <td className="px-4 py-2 border border-gray-300">{patient.City}</td>
                    <td className="px-4 py-2 border border-gray-300">{patient.Shteti}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 ${
                  index + 1 === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
