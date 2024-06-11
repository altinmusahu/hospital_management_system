import PropTypes from "prop-types";
import { Link } from "react-router-dom";


export default function DoctorCard({ picture, name, description }) {




  return (
    <div className="group">
      <div className="flex flex-col items-start relative w-96 h-96">
            <img
            src={picture}
            className="w-full h-full object-cover rounded-2xl"
            alt="Doctor"
            />
            <div className="absolute bottom-0 left-0 w-full transition-all group-hover:backdrop-blur-md duration-700 opacity-0 group-hover:opacity-100 ">
            <div className="p-4">
              <h3 className="text-md font-semibold">{name}</h3>
              <p className="text-sm mt-2">{description}</p>
              <Link to='appointment'>
                <button className="mt-4 px-3 py-2 bg-green-700 hover:bg-green-900 text-white rounded-lg text-sm">
                  Book Appointment
                </button>
              </Link>

            </div>
            </div>
    

      </div>
    </div>
  );
}

DoctorCard.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
