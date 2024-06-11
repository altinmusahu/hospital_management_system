import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


export default function DepartamentCard({ picture, IconComponent, bgColor  }) {
    return(
        <>
        <div className="relative w-80 h-60 rounded-xl overflow-hidden group">
            <img
              src={picture}
              className="w-full h-full object-cover rounded-xl"
              alt="Nurses"
            />
            <div className={`absolute inset-0 flex justify-center items-center ${bgColor} transition-all duration-700 opacity-50 group-hover:opacity-100`}>
              <NavLink to="#">
                  <IconComponent size={48} />
              </NavLink>
            </div>
        </div>
        </>
    );
}

DepartamentCard.propTypes = {
    picture: PropTypes.string.isRequired,
    IconComponent: PropTypes.elementType.isRequired, 
    bgColor: PropTypes.string.isRequired, 
};
