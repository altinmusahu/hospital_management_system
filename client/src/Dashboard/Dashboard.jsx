import PropTypes from "prop-types";
import { Form, Link } from "react-router-dom";
import Chart from "./Cards/Chart01";
import Chart02 from "./Cards/Chart02";
import DashboardCard01 from "./Cards/DashboardCard01";
import DashboardCard02 from "./Cards/DashboardCard02";

function Sidebar() {
  return (
    <div className="lg:w-1/4 bg-[#38956d] text-white p-4 h-[100vh] sticky top-0">
      <ul className="mt-14">
        <li className="p-4">
          <Link to="/admin/">
            <button className="hover:text-gray-300 flex flex-row">
              Dashboard
            </button>
          </Link>

          <div className="border-b border-gray-600"></div>
        </li>

        <li className="p-4">
          <Link
            to="/admin/patient"
            className="hover:text-gray-300 flex flex-row"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            Patients
          </Link>
          <div className="border-b border-gray-600"></div>
        </li>

        <li className="p-4">
          <Link to="/admin/staff" className="hover:text-gray-300 flex flex-row">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
              />
            </svg>
            <span>Staff</span>
          </Link>
          <div className="border-b border-gray-600"></div>
        </li>

        <li className="p-4">
          <Link to="/admin/rooms">
            <button className="hover:text-gray-300 flex flex-row">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4.00012H18M6 4.00012V20.0001M6 4.00012H5M18 4.00012V20.0001M18 4.00012H19M18 20.0001H6M18 20.0001H19M6 20.0001H5M9 7.00012H10V8.00012H9V7.00012ZM14 7.00012H15V8.00012H14V7.00012ZM9 11.0001H10V12.0001H9V11.0001ZM14 11.0001H15V12.0001H14V11.0001ZM11 15.0001H13C13.2652 15.0001 13.5196 15.1055 13.7071 15.293C13.8946 15.4806 14 15.7349 14 16.0001V20.0001H10V16.0001C10 15.7349 10.1054 15.4806 10.2929 15.293C10.4804 15.1055 10.7348 15.0001 11 15.0001Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Rooms
            </button>
          </Link>
          <div className="border-b border-gray-600"></div>
        </li>

        <li className="p-4">
          <Link to="/admin/medicament">
            <button className="hover:text-gray-300 flex flex-row">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
                />
              </svg>
              Medicaments
            </button>
            <div className="border-b border-gray-600"></div>
          </Link>
        </li>

        <li className="p-4">
          <Link to="/admin/appointment">
            <button className="hover:text-gray-300 flex flex-row">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"
                />
              </svg>
              Appointments
            </button>
          </Link>
          <div className="border-b border-gray-600"></div>
        </li>

        <li className="p-4 mt-16 flex items-center">
          <Form action="/logout" method="post">
            <button className="border w-40 h-10 rounded-xl hover:text-[#62d2a2] hover:border-[#62d2a2] text-white border-white transition duration-300 mt-8">
              Log Out
            </button>
          </Form>
          <div className="border-b border-gray-600"></div>
        </li>
      </ul>
    </div>
  );
}
export { Sidebar };

export default function Dashboard() {
  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="flex-grow p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <DashboardCard01 />
          <DashboardCard02 />
          <DashboardCard01 />

          <Chart />
          <Chart02 className="m-24" />

          {/* <div className="absolute bottom-8 right-14">
            <Chat />

          </div> */}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  toggleAddUserModal: PropTypes.any,
};
