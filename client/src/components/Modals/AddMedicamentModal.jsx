import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

const AddMedicamentModal = ({ isUpdating, hideModal, oldData }) => {
  const token = useRouteLoaderData("root");

  const [values, setValues] = useState({
    Emri: isUpdating ? oldData.Emri : null,
    Prodhuesi: isUpdating ? oldData.Prodhuesi : "",
    Masa: isUpdating ? oldData["Masa(mg)"] : 1,
    paRecete: isUpdating ? oldData.JepetPaRecete : false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let request;
      if (isUpdating) {
        request = await axios.put(
          `http://localhost:3000/admin/medicament/${oldData.Id}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        request = await axios.post(
          "http://localhost:3000/admin/medicament",
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      if (request.status === 201 || request.status === 200) {
        console.log(request.data.message);
        resetValues();
        hideModal();
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clickToHide = (e) => {
    const classes = e.target.classList;
    if (classes[0] === "fixed" && classes[1] === "inset-0") {
      hideModal();
    }
  };

  const resetValues = () =>
    setValues({
      Emri: "",
      Prodhuesi: "",
      Masa: 1,
      paRecete: null,
    });

  return (
    <div
      onClick={clickToHide}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {isUpdating ? "Update Medicament" : "Add New Medicament"}
        </h2>
        <form onSubmit={submitHandler}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={values.Emri}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, Emri: e.target.value }))
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Emri
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={values.Prodhuesi}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, Prodhuesi: e.target.value }))
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prodhuesi
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              min={1}
              step={1}
              value={values.Masa}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, Masa: e.target.value }))
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Masa(mg)
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="checkbox"
              value={values.paRecete}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, paRecete: e.target.checked }))
              }
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pa Recete?
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {isUpdating ? "Update Medicament" : "Add Medicament"}
          </button>
          <button
            onClick={hideModal}
            className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

AddMedicamentModal.propTypes = {
  isUpdating: PropTypes.bool,
  oldData: PropTypes.object,
  hideModal: PropTypes.func,
};

export default AddMedicamentModal;
