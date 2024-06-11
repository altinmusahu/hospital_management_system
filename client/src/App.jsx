import Alert from "@mui/material/Alert";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Appointment, { loader as appointments } from "./Dashboard/Appointment";
import Dashboard from "./Dashboard/Dashboard";
import Medicament, { loader as medLoader } from "./Dashboard/Medicament";
import Patients from "./Dashboard/Patients";
import Rooms from "./Dashboard/Rooms";
import StaffTable from "./Dashboard/StaffTable";
import Root from "./Routes/Root";
import LoginPage from "./authentication/LoginPage";
import RegisterPage from "./authentication/RegisterPage";
import Appointments from "./components/Appointment";
import Email from "./components/EmailVerify/Email";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUs from "./pages/ContactUs";
import Departments from "./pages/Departaments";
import MyAppointments, {
  loader as doctorLoader,
} from "./pages/DoctorProfile/MyAppointments";
import DoctorsPage from "./pages/DoctorsPage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home/Home";
import { action as logout } from "./pages/Logout";

import ChPassword from "./components/ChangePassword/ChPassword";
import DoctorProfile, {
  loader as oneStaffLoader,
} from "./pages/DoctorProfile/DoctorProfile";
import NotAuthorized from "./pages/NotAuthorized";
import MyAppointmentsP, {
  loader as myAppointmentsLoader,
} from "./pages/Profile/MyAppointmentsP";
import MyProfile, {
  loader as myProfileLoader,
} from "./pages/Profile/MyProfile";
import {
  checkAuthLoader,
  isAdminLoader,
  isDoctorLoader,
  tokenLoader,
} from "./util/auth";

function App() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      id: "root",
      loader: tokenLoader,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage showAlert={showAlert} /> },
        { path: "/doctors", element: <DoctorsPage /> },
        { path: "/about", element: <AboutUsPage /> },
        { path: "/departaments", element: <Departments /> },
        { path: "/changepassword", element: <ChPassword /> },

        { path: "/contact", element: <ContactUs /> },
        {
          path: "/appointment",
          element: <Appointments showAlert={showAlert} />,
          loader: checkAuthLoader,
        },
        {
          path: "/my-profile",
          element: <MyProfile />,
          loader: myProfileLoader,
        },
        {
          path: "/patient-appointments",
          element: <MyAppointmentsP />,
          loader: myAppointmentsLoader,
        },

        {
          path: "/admin",
          loader: isAdminLoader,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "staff",
              element: <StaffTable />,
            },
            {
              path: "medicament",
              element: <Medicament />,
              loader: medLoader,
            },
            {
              path: "patient",
              element: <Patients />,
              loader: medLoader,
            },
            {
              path: "appointment",
              element: <Appointment />,
              loader: appointments,
            },
            {
              path: "rooms",
              element: <Rooms />,
            },
          ],
        },
        {
          path: "/doctor",
          loader: isDoctorLoader,
          children: [
            { index: true, element: <DoctorProfile />, loader: oneStaffLoader },
          ],
        },
        {
          path: "/doctor-appointments",
          loader: isDoctorLoader,
          children: [
            { index: true, element: <MyAppointments />, loader: doctorLoader },
          ],
        },
        {
          path: "/not-authorized",
          element: <NotAuthorized />,
        },
        { path: "/logout", action: logout },
      ],
    },
    { path: "/users/:id/verify/:token", element: <Email /> },
  ]);

  return (
    <>
      {alertVisible && <Alert severity="success">{alertMessage}</Alert>}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
