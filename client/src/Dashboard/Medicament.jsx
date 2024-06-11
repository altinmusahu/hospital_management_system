import axios from "axios";
import { useState } from "react";
import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import AddMedicamentModal from "../components/Modals/AddMedicamentModal";
import { Sidebar } from "./Dashboard";

const Medicament = () => {
  const token = useRouteLoaderData("root");
  const [medicaments, setMedicaments] = useState(useLoaderData());
  const [modalAppear, setModalAppear] = useState(false);
  const [file, setFile] = useState();

  const [isUpdating, setIsUpdating] = useState(false);
  const [oldData, setOldData] = useState(null);

  const showModal = () => setModalAppear(true);
  const hideModal = () => {
    setModalAppear(false);
    setIsUpdating(false);
    setOldData(null);
  };

  const uploadMedicaments = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const request = await axios.post(
        "http://localhost:3000/upload/medicament",
        formData
      );
      if (request.status === 201) console.log("Inserted");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
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
        const request = await axios.delete(
          `http://localhost:3000/admin/medicament/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (request.status === 200) {
          const filteredData = medicaments.filter((med) => med.Id !== id);
          setMedicaments(filteredData);
          Swal.fire({
            title: "Deleted!",
            text: "Medicament has been deleted.",
            icon: "success",
          });
        } else {
          return;
        }
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="lg:w-3/4 mt-20">
        <div className="w-full">
          <div className="w-[90%] h-96">
            <table className="w-[90%] bg-stone-50 rounded-lg mt-8 ml-10">
              <thead>
                <tr>
                  <th className="px-4 py-2">Emri</th>
                  <th className="px-4 py-2">Prodhuesi</th>
                  <th className="px-4 py-2">Masa[mg]</th>
                  <th className="px-4 py-2">Pa Recete</th>
                  <th className="px-9 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicaments.map((med) => (
                  <tr key={med.Id} className="text-center">
                    <td>{med.Emri}</td>
                    <td>{med.Prodhuesi}</td>
                    <td>{med["Masa(mg)"]}</td>
                    <td>{med.JepetPaRecete ? "Yes" : "No"}</td>
                    <td>
                      <button
                        onClick={() => {
                          setIsUpdating(true);
                          setOldData(med);
                          showModal();
                        }}
                        className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(med.Id)}
                        className="text-white bg-red-500 hover:bg-red-900 px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="font-bold pl-16 pt-4 w-full justify-center items-center">
              Upload file with medicaments
            </p>
            <form
              onSubmit={uploadMedicaments}
              className="flex mx-auto p-2 w-[90%]"
            >
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400"
              />
              <button
                className="bg-blue-500 text-white px-4 rounded-lg"
                type="submit"
              >
                Upload
              </button>
            </form>
            <button
              onClick={showModal}
              className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add Medicament
            </button>
            {modalAppear && (
              <AddMedicamentModal
                hideModal={hideModal}
                isUpdating={isUpdating}
                oldData={oldData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicament;

export const loader = async () => {
  const response = await axios.get("http://localhost:3000/admin/medicaments");
  if (response.status !== 200) {
    return json({ message: "Something went wrong" }, { status: 500 });
  }
  return response.data;
};
