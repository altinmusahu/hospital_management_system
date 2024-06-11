import d2 from "../../assets/d2.jpg";

import DoctorCard from "../../components/DoctorCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/all-doctors"
      );
      setDoctors(response.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="doctors_container bg-[#178066] py-10">
      <div className="justify-center items-center">
        <div className="heading_container pt-10 md:pt-20">
          <h2 className="mb-4 text-2xl md:text-3xl uppercase text-center font-medium font-sans tracking-wide text-white">
            OUR DOCTORS
          </h2>
          <p className="text-sm md:text-base text-center text-white mb-6 md:mb-24 w-[70%] mx-auto">
            Incilint sapiente illo quo praesentium officiis laudantium nostrum,
            ad adipisci cupiditate sit, quisquam aliquid. Officiis laudantium
            fuga ad voluptas aspernatur error fugiat quos facilis saepe quas
            fugit, beatae id quisquam.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {doctors.map((doctor) => (
            <div key={doctor.Id} className="mb-8 md:mb-0">
              <DoctorCard
                picture={d2}
                name={`${doctor.Staff.Emri} ${doctor.Staff.Mbiemri}`}
              />
            </div>
          ))}
        </div>
        <Link to="doctors" className="flex justify-center">
          <button className="btn-box mt-8 md:mt-12 border text-[#62d2a2] bg-white w-36 md:w-40 h-10 md:h-12 hover:bg-[#62d2a2] hover:text-white hover:border-[#62d2a2] transition-all rounded">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
}
