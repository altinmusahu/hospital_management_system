import { LuUser } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { CiUnlock, CiTrash } from "react-icons/ci";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useRouteLoaderData, redirect } from "react-router-dom";

export default function Sidebar() {
  const token = useRouteLoaderData("root");

  const disableAccount = async () => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmed.isConfirmed) {
        if (!token) {
          return redirect("/login");
        }

        const request = await axios.delete(
          "http://localhost:3000/delete-my-profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (request.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
          });
          localStorage.clear();
          window.location.href("/");
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting your account.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting account: ", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <section className="w-96">
        <div className="sm:flex flex-col gap-4 py-20 mx-14 sticky top-0">
          <div className="px-14 py-2 rounded-lg justify-center items-center gap-4 inline-flex">
            <div className="relative">
              <LuUser size={20} />
            </div>
            {localStorage.getItem("role") == 1 && (
              <Link
                to="/my-profile"
                className="grow shrink basis-0 text-blue-500 text-base font-medium"
              >
                My Profile
              </Link>
            )}
            {localStorage.getItem("role") == 3 && (
              <Link
                to="/doctor"
                className="grow shrink basis-0 text-blue-500 text-base font-medium"
              >
                My Profile
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4 px-14 py-2 rounded-lg">
            <LuPencil size={20} />
            {localStorage.getItem("role") == 1 && (
              <Link
                to="/patient-appointments"
                className="text-blue-500 text-base font-medium"
              >
                Appointments
              </Link>
            )}
            {localStorage.getItem("role") == 3 && (
              <Link
                to="/doctor-appointments"
                className="text-blue-500 text-base font-medium"
              >
                Appointments
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4 px-14 py-2 rounded-lg">
            {localStorage.getItem("role") == 1 && (
              <>
                <CiUnlock size={20} />
                <Link
                  to="/changepassword"
                  className="text-blue-500 text-base font-medium"
                >
                  Change Password
                </Link>
              </>
            )}
          </div>

          {/* Line */}
          <div className="px-16 rounded-lg justify-center items-center gap-4">
            <div className="relative w-36 h-0.5 bg-gray-500 rounded-full ml-15 border-b" />
          </div>

          {/* Delete Account */}
          <div className="flex items-center gap-4 px-14 py-2 rounded-lg">
            <CiTrash size={20} />

            <button
              onClick={disableAccount}
              className="text-red-500 text-base font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
