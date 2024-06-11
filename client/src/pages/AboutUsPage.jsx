import { useState, useEffect } from "react";
import aboutus from "../assets/aboutus.png";
import circle from "../assets/circle.svg";
import appointment from "../assets/appointment.svg";
import diagnosis from "../assets/diagnosis.svg";
import PropTypes from "prop-types";
import DoctorCard from "../components/DoctorCard";
import d4 from "../assets/d4.jpg";
import d7 from "../assets/d7.jpg";
import d8 from "../assets/d8.jpg";
import { Link } from "react-router-dom";
import brand1 from "../assets/brand1.svg";
import brand2 from "../assets/brand2.svg";
import brand3 from "../assets/brand3.svg";
import brand4 from "../assets/brand4.svg";
import brand5 from "../assets/brand5.svg";
import brand6 from "../assets/brand6.svg";
import aboutdoc from "../assets/aboutdoc.png";
import aboutbackground from "../assets/aboutbackground.svg";

export function FeatureItem({ imageSrc, text }) {
  return (
    <div className="flex row gap-2 mt-4">
      <img className="w-6" src={imageSrc} alt="circle" />
      <div className="text-[#424a6b] font-semibold">{text}</div>
    </div>
  );
}

FeatureItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export function FeatureItem2({ imageSrc, text }) {
  return (
    <div className="flex flex-row mt-6 gap-4">
      <div className="border w-12 h-12 rounded-full bg-[#f3f0ff] flex justify-center items-center">
        <img className="w-6 " src={imageSrc} alt="" />
      </div>
      <div
        className="text-[#0e132d] font-bold"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
FeatureItem2.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export function ClientLogos() {
  return (
    <div className="flex items-center justify-center h-28 overflow-hidden w-[80%] mx-auto">
      <div className="h-full flex animate-marquee gap-24">
        <img src={brand1} alt="Logo 1" className="h-full mx-4" />
        <img src={brand2} alt="Logo 2" className="h-full mx-4" />
        <img src={brand3} alt="Logo 3" className="h-full mx-4" />
        <img src={brand4} alt="Logo 4" className="h-full mx-4" />
        <img src={brand5} alt="Logo 5" className="h-full mx-4" />
        <img src={brand6} alt="Logo 6" className="h-full mx-4" />
        <img src={brand1} alt="Logo 1" className="h-full mx-4" />
        <img src={brand2} alt="Logo 2" className="h-full mx-4" />
        <img src={brand3} alt="Logo 3" className="h-full mx-4" />
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title:
        "“ Impressed with the skill and care of the surgical team at Orthoc. Recovery was smooth thanks to their expertise. Top-notch hospital! “",
      description: "Leart Gashi",
    },
    {
      id: 2,
      title:
        "“ Orthoc's doctors are knowledgeable and approachable. Admin staff made booking appointments easy. Highly confident in their care. “",
      description: "Altin Lutfiu",
    },
    {
      id: 3,
      title:
        "“ Clean facilities and friendly staff at Orthoc. Slight scheduling delays, but overall positive experience. Would recommend. “",
      description: "Lirake Jashari",
    },
    {
      id: 4,
      title:
        "“ Exceptional care from Orthoc's team. Doctors listened attentively and provided effective treatment. Grateful for their compassion and expertise. “",
      description: "Filan Fisteku",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prevAnimate) => !prevAnimate);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-row w-[80%] items-center mx-auto">
          <div
            className={`w-1/2 mt-10`}
            style={{
              transition: "transform 4s ease-in-out",
              transform: animate ? "translateY(-10px)" : "translateY(10px)",
            }}
          >
            <img src={aboutus} alt="aboutus" />
          </div>

          <div className="w-1/2 mt-40 leading-9 ">
            <h2 className="font-semibold text-5xl w-[85%] text-[#0b0f21]">
              <span className="uppercase font-semibold">Orthoc</span> have
              expert doctors and provide the best medical solutions.
            </h2>
            <p className="w-[80%] mt-6 text-gray-500">
              At Orthoc, we are dedicated to providing exceptional medical
              services to our patients. With our state-of-the-art web
              application, we aim to revolutionize the way medical care is
              delivered across all departments. Our platform offers a seamless
              experience for patients, healthcare providers, and administrators
              alike. Whether you are seeking specialized treatment, scheduling
              appointments, or managing medical records, Orthoc is your one-stop
              solution.
            </p>
            <FeatureItem
              imageSrc={circle}
              text="Access medical records securely from anywhere,at any time."
            />
            <FeatureItem
              imageSrc={circle}
              text=" Receive personalized care plans tailored to your unique needs."
            />
            <FeatureItem
              imageSrc={circle}
              text="Connect with top-notch medical professionals across various
            specialties."
            />

            <div className="flex gap-6">
              <FeatureItem2
                imageSrc={appointment}
                text="Easy Appointment <br /> System."
              />

              <FeatureItem2
                imageSrc={diagnosis}
                text="Best Diagnosis <br/> Technology."
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="flex text-center justify-center text-4xl font-semibold mt-20 tracking-wider">
            Meet Our <br />
            Experienced Staff
          </h2>
          <p className="text-center mt-6 text-gray-500">
            The dedicated staff that will provide exceptional care to all our
            patients.
          </p>
          <div className="flex flex-row gap-8 mt-10 justify-center ">
            <DoctorCard
              picture={d4}
              name="Leart Musahu"
              description="Gynecologist"
            />
            <DoctorCard
              picture={d7}
              name="Lirake Hasani"
              description="Stomatologist"
            />
            <DoctorCard
              picture={d8}
              name="Altin Musahu"
              description="Neurologist"
            />
          </div>
          <Link to="/doctors">
            <button className="btn-box flex  justify-center items-center mt-12 border border-[#9d94c1] bg-[#fff] font-semibold text-[#9d94c1] w-40 h-12 mx-auto hover:bg-[#9d94c1] hover:text-black  transition-all rounded">
              View All
            </button>
          </Link>
        </div>
        <div className="bg-[#d4ccf0] w-full h-40 mt-20 pt-6">
          <ClientLogos />
        </div>
        <div className="mt-40 mb-10">
          <h2 className="text-center text-4xl font-semibold">
            Feedback From <br></br>Happy Patients of Orthoc
          </h2>
          <div className="flex flex-row w-[60%] mx-auto mt-20">
            <div className="w-1/2 flex justify-center">
              <img src={aboutdoc} alt="doc" />
            </div>
            <div className="relative w-1/2 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full flex flex-col justify-center items-center">
                <img src={aboutbackground} alt="." />
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute w-full transition-transform duration-1000 transform ${
                      index === currentSlide
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
                  >
                    <h1 className="text-3xl tracking-wider mb-8 text-left leading-snug text-[#0b0f21]">
                      {slide.title}
                    </h1>
                    <p className="text-[#0b0f21] text-2xl font-bold font-mono  leading-6 mt-14">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
