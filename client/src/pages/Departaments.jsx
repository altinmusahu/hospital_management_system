import background1 from "../assets/background1.jpeg";
import nurses from "../assets/nurses.jpg";
import cardiology from "../assets/cardiology.jpg";
import neurologist from "../assets/neurologist.jpg"
import pediactric from "../assets/pediactric.jpg";

import { TbDental } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBrain } from "react-icons/fa";
import { FaBaby } from "react-icons/fa";

import DepartamentCard from "../components/DepartamentCard";

export default function Departments() {
  return (
    <>
      <div className="relative mb-52">
        <div className="relative">
          <img
            src={background1}
            className="w-full rounded-2xl shadow-2xl"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
        </div>

        <div className="absolute top-0 left-64 tracking-widest flex justify-center items-center h-full">
          <h1 className="text-white text-4xl z-10 tracking-widest font-thin">
            Departments
          </h1>
        </div>

        <div className="absolute transform -translate-y-1/2 flex justify-center items-center w-full gap-4 z-10">
          <DepartamentCard picture={nurses} IconComponent={TbDental} bgColor="bg-emerald-500" />
          <DepartamentCard picture={cardiology} IconComponent={FaUserDoctor} bgColor="bg-blue-600"/>
          <DepartamentCard picture={pediactric} IconComponent={FaBaby} bgColor="bg-teal-700"/>
          <DepartamentCard picture={neurologist} IconComponent={FaBrain} bgColor="bg-sky-500"/>

        </div>
      </div>
    </>
  );
}
