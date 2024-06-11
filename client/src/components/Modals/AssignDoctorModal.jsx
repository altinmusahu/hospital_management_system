import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const AssignDoctor = ({ hideModal, data }) => {
  const { DepartmentId, Id } = data;
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/find-doctor/${DepartmentId}`)
      .then((response) => setDoctors(response.data))
      .catch((err) => console.error(err));
  }, [DepartmentId]);

  const clickToHide = (e) => {
    const classes = e.target.classList;
    if (classes[0] === "fixed" && classes[1] === "inset-0") {
      hideModal();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.patch(
        `http://localhost:3000/admin/assign-doctor/${Id}`,
        { doctorId }
      );
      if (request.status === 200) {
        hideModal();
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={clickToHide}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Assign Doctor
        </h2>
        <form onSubmit={submitHandler}>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="border border-black w-32 flex mx-auto"
          >
            <option></option>
            {doctors.map((doctor) => (
              <option key={doctor.Id} value={doctor.Id}>
                {doctor.Staff.Emri} {doctor.Staff.Mbiemri}
              </option>
            ))}
          </select>
          <div className="flex flex-row pt-6">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Assign
            </button>
            <button
              onClick={hideModal}
              className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AssignDoctor.propTypes = {
  hideModal: PropTypes.func,
  data: PropTypes.object,
};

export default AssignDoctor;
