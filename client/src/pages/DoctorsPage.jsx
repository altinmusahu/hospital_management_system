import herobg from "../assets/herobg.png";
import d2 from "../assets/d2.jpg";
import d4 from "../assets/d4.jpg";
import d6 from "../assets/d6.jpg";

import DoctorCard from "../components/DoctorCard";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function DoctorsPage() {


  const [dentistryDoctors, setDentistryDoctors] = useState([]);
  const [neurologyDoctors, setNeurologyDoctors] = useState([]);
  const [pediactricDoctors, setPediactricDoctors] = useState([]);
  const [cardiologyDoctors, setCardiologyDoctors] = useState([]);


  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/all-doctors");
      const allDoctors = response.data;
      const stomatologji = allDoctors.filter(doctor => doctor.Department.Name === "Stomatologji");
      const neurology = allDoctors.filter(doctor => doctor.Department.Name === "Neurology");
      const pediactric = allDoctors.filter(doctor => doctor.Department.Name === "Pediactric");
      const cardiology = allDoctors.filter(doctor => doctor.Department.Name === "Cardiology");



      setDentistryDoctors(stomatologji);
      setNeurologyDoctors(neurology);
      setPediactricDoctors(pediactric);
      setCardiologyDoctors(cardiology);


      // setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, [])

  return (
    <>
      <div className="">
        <div className="relative">
          <img
            src={herobg}
            className="bg-cover bg-center h-screen brightness-50"
            alt="Background"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start w-full md:w-2/4 mx-6 md:mx-36 mb-16 overflow-hidden">
            <div
              className="doctorspage"
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              <h3 className="uppercase text-white text-xl leading-snug">
                Meet our experienced team
              </h3>
              <p className="text-[#178056] text-3xl leading-snug font-bold">
                Our Dedicated Doctors Team
              </p>
              <p className="leading-snug">
                We offer extensive medical procedures to outbound and inbound
                patients. We are proud of the achievements of our staff.
                <br></br> We work together to help our patients recover.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cardiology section */}
      <div className="container">
        <div className="heading_container pt-20 ml-36">
          <h2 className="mb-4 text-3xl uppercase text-left font-medium font-sans tracking-wide text-[#178066]">
            Dental
          </h2>
          <p className="text-left text-black mb-14">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa illo
            dolore tenetur tempore eaque, ut quos optio ducimus asperiores eius
            eligendi amet! Aut, hic dolorem ipsum vitae perferendis sit iure.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            ipsam aliquam rerum corporis quam laborum illum ipsum aperiam
            voluptatibus fugiat. Quisquam odio maxime laudantium, minima
            asperiores aliquam in voluptate doloribus?
          </p>
        </div>
        <div className="flex flex-wrap gap-12 ml-36 w-full">
          {dentistryDoctors.map((doctor) => (
            <div key={doctor.Id} className="group">
              <div className="flex flex-col items-center relative w-96 h-96">
                <img
                  src={d2}
                  className="w-full h-full object-cover rounded-2xl"
                  alt="Doctor"
                />
                <div className="absolute bottom-0 left-0 w-full border bg-white transition-all duration-700 opacity-0 group-hover:opacity-100">
                  <div className="p-4">
                    <h3 className="text-md font-semibold">{`${doctor.Staff.Emri} ${doctor.Staff.Mbiemri}`}</h3>
                    <button className="mt-4 px-3 py-2 bg-green-700 hover:bg-green-900 text-white rounded-lg text-sm">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neurology section */}
      <div className="container">
        <div className="heading_container pt-20 ml-36">
          <h2 className="mb-4 text-3xl uppercase text-left font-medium font-sans tracking-wide text-[#178066]">
            Neurology
          </h2>
          <p className="text-left text-black mb-14">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa illo
            dolore tenetur tempore eaque, ut quos optio ducimus asperiores eius
            eligendi amet! Aut, hic dolorem ipsum vitae perferendis sit iure.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            ipsam aliquam rerum corporis quam laborum illum ipsum aperiam
            voluptatibus fugiat. Quisquam odio maxime laudantium, minima
            asperiores aliquam in voluptate doloribus?
          </p>
        </div>
        <div className="flex flex-wrap gap-12 ml-36 w-full">
          {neurologyDoctors.map((doctor) => (
            <DoctorCard key={doctor.Id} picture={d4} name={`${doctor.Staff.Emri} ${doctor.Staff.Mbiemri}`} />
          ))}
        </div>
      </div>

      {/* Dental section */}
      <div className="container mb-10">
        <div className="heading_container pt-20 ml-36">
          <h2 className="mb-4 text-3xl uppercase text-left font-medium font-sans tracking-wide text-[#178066]">
            Pediactric
          </h2>
          <p className="text-left text-black mb-14">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa illo
            dolore tenetur tempore eaque, ut quos optio ducimus asperiores eius
            eligendi amet! Aut, hic dolorem ipsum vitae perferendis sit iure.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            ipsam aliquam rerum corporis quam laborum illum ipsum aperiam
            voluptatibus fugiat. Quisquam odio maxime laudantium, minima
            asperiores aliquam in voluptate doloribus?
          </p>
        </div>
        <div className="flex flex-wrap gap-12 ml-36 w-full">
          {pediactricDoctors.map((doctor) => (
            <DoctorCard picture={d6} key={doctor.Id} name={`${doctor.Staff.Emri} ${doctor.Staff.Mbiemri}`}/>

          ))}
        </div>
      </div>

      {/* Pediatric section */}
      <div className="container mb-10">
        <div className="heading_container pt-20 ml-36">
          <h2 className="mb-4 text-3xl uppercase text-left font-medium font-sans tracking-wide text-[#178066]">
            Cardiology
          </h2>
          <p className="text-left text-black mb-14">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa illo
            dolore tenetur tempore eaque, ut quos optio ducimus asperiores eius
            eligendi amet! Aut, hic dolorem ipsum vitae perferendis sit iure.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            ipsam aliquam rerum corporis quam laborum illum ipsum aperiam
            voluptatibus fugiat. Quisquam odio maxime laudantium, minima
            asperiores aliquam in voluptate doloribus?
          </p>
        </div>
        <div className="flex flex-wrap gap-12 ml-36 w-full">
          {cardiologyDoctors.map((doctor) => (
            <DoctorCard key={doctor.Id} picture={d6} name={`${doctor.Staff.Emri} ${doctor.Staff.Mbiemri}`}/>

          ))}

        </div>
      </div>
    </>
  );
}
