import { Link } from "react-router-dom";
import aboutimg from "../../assets/about-img.jpg";

export default function About() {
  return (
    <div className="aboutus-container max-w-[80%] mx-auto flex flex-col md:flex-row gap-4 mt-10 md:mt-20 justify-center mb-10">
      <div className="w-full md:w-1/2">
        <div className="img-box">
          <img
            className="border rounded-2xl w-full"
            src={aboutimg}
            alt="Doctor"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="detail-box mt-8 md:mt-0 md:ml-6">
          <div className="heading_container">
            <h2 className="mb-4 text-3xl uppercase font-semibold font-sans tracking-wide text-black">
              About Us
            </h2>
          </div>
          <p className="text-base">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which dont look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isnt anything embarrassing hidden in the
            middle of text. All
          </p>
          <Link to="about" className="flex justify-center md:justify-start">
            <button className="btn-box mt-6 border text-white bg-[#62d2a2] w-40 h-10 hover:bg-white hover:text-[#62d2a2] hover:border-[#62d2a2] transition-all rounded">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
