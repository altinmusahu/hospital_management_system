import axios from "axios";
import { useEffect, useState } from "react";

const Appointment = () => {
  const [allDepartments, setAllDepartments] = useState([]);
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState();
  const [department, setDepartment] = useState();

  useEffect(() => {
    axios.get("http://localhost:3000/admin/departments").then((response) => {
      setAllDepartments(response.data);
    });
  }, []);

  const addAppointmentHandler = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        "http://localhost:3000/appointment",
        {
          Date: date,
          Pershkrimi: symptoms,
          DepartmentId: department,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (request.status === 201) {
        console.log("Created");
        setDate();
        setDepartment();
        setSymptoms("");
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative p-20">
      <form onSubmit={addAppointmentHandler} className="bg-slate-600 ">
        <div>
          <h2>Booking Details</h2>
          <label htmlFor="symptoms">Initial Symptoms:</label>
          <textarea
            onChange={(e) => setSymptoms(e.target.value)}
            id="symptoms"
            value={symptoms}
          ></textarea>
          <label htmlFor="department">Department:</label>
          <select
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
            id="department"
          >
            <option></option>
            {allDepartments.map((dept) => (
              <option key={dept.Id} value={dept.Id}>
                {dept.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2>Choose Date</h2>
          <label htmlFor="date">Date and Time below</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
          />
        </div>
      </form>
    </div>
  );
};
export default Appointment;
