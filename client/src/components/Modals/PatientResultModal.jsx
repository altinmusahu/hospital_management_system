import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const PatientResultsModal = ({ onClose, appointmentId }) => {
  const [appointmentResults, setAppointmentResults] = useState(null);

  const fetchAppointmentResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/result/${appointmentId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAppointmentResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const generatePDF = () =>
    (window.location.href = `http://localhost:3000/report/${appointmentId}`);

  useEffect(() => {
    fetchAppointmentResults();
  }, [appointmentId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Appointment Results</h3>
        <p>
          <strong>Name:</strong> {appointmentResults?.Patient?.Emri}
        </p>
        <p>
          <strong>Lastname:</strong> {appointmentResults?.Patient?.Mbiemri}
        </p>

        <p>
          <strong>Room:</strong> {appointmentResults?.Results?.RoomId}
        </p>
        <p>
          <strong>Prescriptions:</strong>{" "}
          {appointmentResults?.hasPrescription ? "Yes" : "No"}
        </p>

        <div className="flex flex-row gap-2 justify-center">
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            onClick={generatePDF}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate as PDF
          </button>
        </div>
      </div>
    </div>
  );
};
PatientResultsModal.propTypes = {
  onClose: PropTypes.func,
  appointmentId: PropTypes.object,
};

export default PatientResultsModal;
