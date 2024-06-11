import { useState, useEffect } from "react";
import background from "../assets/background.png";
import Departments from "../components/Departments";
import About from "../components/About";
import Doctors from "../components/pages/Doctors";
import Appointment from "../components/Appointment.jsx";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "WE PROVIDE BEST HEALTHCARE",
      description:
        "Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.",
    },
    {
      id: 2,
      title: "WE PROVIDE BEST HEALTHCARE",
      description:
        "Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  return (
    <>
      <div className="relative">
        <img
          src={background}
          className="bg-cover bg-center h-screen"
          alt="Background"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start w-full md:w-2/4 mx-6 md:mx-36 mb-16 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute left-0 w-full transition-transform duration-1000 transform ${
                index === currentSlide ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <h1 className="text-white text-5xl font-bold mb-8 text-left leading-snug">
                {slide.title}
              </h1>
              <p className="text-white text-sm leading-6">
                {slide.description}
              </p>
              <button className="bg-white text-green-600 border py-2 px-6 rounded hover:bg-green-600 hover:text-white transition duration-300 mt-8">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <Appointment /> <Departments /> <About /> <Doctors />
    </>
  );
}
