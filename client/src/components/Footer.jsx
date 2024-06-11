import { IoLocationOutline } from "react-icons/io5";
import footer from "../assets/footer.png";

const Footer = () => {
  return (
    <>
      <footer
        className="text-white py-12 relative "
        style={{
          backgroundImage: `url(${footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="overlay"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>

        <hr className="bg-[#62d2a2] h-1" />
        <div className="p-8">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="footer-info">
              <h1 className="text-lg font-semibold mb-3 text-[#62d2a2] ml-6">
                Informations
              </h1>

              <p className="location flex items-center mb-2">
                <IoLocationOutline className="" /> Zija Shemsiu,Prishtine.
              </p>
              <p>
                <span className="font-light">+123456789</span>
              </p>
            </div>
            <div className="footer-about">
              <h3 className="text-lg font-semibold text-[#62d2a2] ml-6">
                About Us
              </h3>
              <p>
                Welcome to Orthoc – your trusted healthcare partner. Our
                dedicated team is committed to providing exceptional care
                tailored to your needs. Together, lets achieve better health and
                wellness.
              </p>
            </div>
            <div className="footer-links">
              <h3 className="text-lg font-semibold text-[#62d2a2]">Links</h3>
              <ul className="d-flex">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/departments"
                    className="text-gray-300 hover:text-white"
                  >
                    Departments
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h3 className="text-lg font-montserrat text-[#62d2a2]">
                Subscribe
              </h3>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your e-mail:"
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="text-white hover:bg-blue-600 bg-[#62a2] px-4 py-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
      <div className="bottom-footer h-9 bg-[#178066]">
        <p className="text-center font-mono text-white flex justify-center pt-1">
          © 2024 Orthoc. All rights reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
