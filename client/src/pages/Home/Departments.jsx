import { Link } from "react-router-dom";
import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";
import s3 from "../../assets/s3.png";
import s4 from "../../assets/s4.png";

export default function Departments() {
  return (
    <div className="department_container mt-20 flex justify-center">
      <div className="container">
        <div className="heading_container">
          <h2 className="mb-4 text-3xl uppercase text-center font-semibold font-sans tracking-wider text-black">
            OUR DEPARTMENTS
          </h2>
          <p className="text-center text-black mb-14">
            Asperiores sunt consectetur impedit nulla molestiae delectus
            repellat laborum dolores doloremque accusantium
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="box flex flex-col items-center w-full md:w-72">
            <div className="bg-[#62d2a2] w-20 h-20 rounded-full flex justify-center items-center">
              <img className="w-[75%] m-3" src={s1} alt="pic1" />
            </div>
            <div className="detail-box">
              <h5 className="text-xl text-center mb-2 mt-2 font-semibold">
                CARDIOLOGY
              </h5>
              <p className="text-center">
                fact that a reader will be distracted by the readable page when
                looking at its layout.
              </p>
            </div>
          </div>

          <div className="box flex flex-col items-center w-full md:w-72">
            <div className="bg-[#62d2a2] w-20 h-20 rounded-full flex justify-center items-center">
              <img className="w-[55%] m-4" src={s2} alt="pic2" />
            </div>
            <div className="detail-box">
              <h5 className="text-xl text-center mb-2 mt-2 font-semibold">
                DIAGNOSIS
              </h5>
              <p className="text-center">
                fact that a reader will be distracted by the readable page when
                looking at its layout.
              </p>
            </div>
          </div>

          <div className="box flex flex-col items-center w-full md:w-72">
            <div className="bg-[#62d2a2] w-20 h-20 rounded-full flex justify-center items-center">
              <img className="w-[70%] m-2" src={s3} alt="pic3" />
            </div>
            <div className="detail-box">
              <h5 className="text-xl text-center mb-2 mt-2 font-semibold">
                SURGERY
              </h5>
              <p className="text-center">
                fact that a reader will be distracted by the readable page when
                looking at its layout.
              </p>
            </div>
          </div>

          <div className="box flex flex-col items-center w-full md:w-72">
            <div className="bg-[#62d2a2] w-20 h-20 rounded-full flex justify-center items-center">
              <img className="w-[70%] m-2" src={s4} alt="pic4" />
            </div>
            <div className="detail-box">
              <h5 className="text-xl text-center mb-2 mt-2 font-semibold">
                FIRST AID
              </h5>
              <p className="text-center">
                fact that a reader will be distracted by the readable page when
                looking at its layout.
              </p>
            </div>
          </div>
        </div>

        <Link to="departaments">
          <button className="btn-box flex justify-center items-center mt-20 border text-white bg-[#62d2a2] w-40 h-12 mx-auto hover:bg-white hover:text-[#62d2a2] hover:border-[#62d2a2] transition-all rounded">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
}
