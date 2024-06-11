import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Result = ({ hideModal, id }) => {
  const [result, setResult] = useState("Room");

  const [medicament, setMedicaments] = useState({
    Pershkrimi: "",
    Doza: 0.1,
    Data: undefined,
    Kohezgjatja: 1,
    MedicamentId: undefined,
    completed: false,
  });

  const [room, setRoom] = useState({
    DataHyrjes: undefined,
    RoomId: undefined,
  });

  const [allMedicaments, setAllMedicaments] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/medicaments")
      .then((response) => setAllMedicaments(response.data))
      .catch((err) => console.error(err));
    axios
      .get("http://localhost:3000/admin/rooms")
      .then((response) => setAllRooms(response.data))
      .catch((err) => console.error(err));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    let requestUrl;
    let body;
    if (result === "Room") {
      requestUrl = "/assign-room";
      body = room;
    } else {
      requestUrl = "/prescription";
      body = medicament;
    }
    const request = await axios.post(
      `http://localhost:3000/doctor/${requestUrl}/${id}`,
      body,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (request.status === 201) {
      hideModal();
    } else {
      return;
    }
  };

  const clickToHide = (e) => {
    const classes = e.target.classList;
    if (classes[0] === "fixed" && classes[1] === "inset-0") {
      hideModal();
    }
  };

  return (
    <div
      onClick={clickToHide}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Results</h2>
        <fieldset className="mb-4">
          <legend className="text-gray-700">Choose results:</legend>
          <div className="mt-2">
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option key={0} value=""></option>
              <option key={1} value="Room">
                Room Staying
              </option>
              <option key={2} value="Medicament">
                Medicament
              </option>
            </select>
          </div>
        </fieldset>
        <form onSubmit={submitHandler}>
          {result === "Medicament" ? (
            <>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  value={medicament.MedicamentId}
                  onChange={(e) =>
                    setMedicaments((prev) => ({
                      ...prev,
                      MedicamentId: e.target.value,
                    }))
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value=""></option>
                  {allMedicaments.map((med) => (
                    <option key={med.Id} value={med.Id}>
                      {med.Emri}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label className="block text-sm font-medium text-gray-700">
                  Pershkrimi
                </label>
                <textarea
                  value={medicament.Pershkrimi}
                  onChange={(e) =>
                    setMedicaments((prev) => ({
                      ...prev,
                      Pershkrimi: e.target.value,
                    }))
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="doza"
                  className="block text-sm font-medium text-gray-700"
                >
                  Doza/Dite
                </label>
                <input
                  type="number"
                  id="doza"
                  value={medicament.Doza}
                  min={0.1}
                  step={0.01}
                  onChange={(e) =>
                    setMedicaments((prev) => ({
                      ...prev,
                      Doza: e.target.value,
                    }))
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="data"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data e Fillimit
                </label>
                <input
                  type="date"
                  id="data"
                  value={medicament.Data}
                  onChange={(e) =>
                    setMedicaments((prev) => ({
                      ...prev,
                      Data: e.target.value,
                    }))
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="kohezgjatja"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kohezgjatja
                </label>
                <input
                  type="number"
                  id="kohezgjatja"
                  min={1}
                  step={1}
                  value={medicament.Kohezgjatja}
                  onChange={(e) =>
                    setMedicaments((prev) => ({
                      ...prev,
                      Kohezgjatja: e.target.value,
                    }))
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="checkbox"
                  value={medicament.completed}
                  onChange={(e) =>
                    setMedicaments((prev) => ({
                      ...prev,
                      completed: e.target.checked,
                    }))
                  }
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Completed?
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="dataHyrjes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Entry Date
                </label>
                <input
                  type="date"
                  id="dataHyrjes"
                  value={room.DataHyrjes}
                  onChange={(e) =>
                    setRoom((prev) => ({
                      ...prev,
                      DataHyrjes: e.target.value,
                    }))
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="roomId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dhoma
                </label>
                <select
                  id="roomId"
                  value={room.RoomId}
                  onChange={(e) =>
                    setRoom((prev) => ({ ...prev, RoomId: e.target.value }))
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value=""></option>
                  {allRooms.map((r) => (
                    <option key={r.Id} value={r.Id}>
                      {r.Emri}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={hideModal}
              className="flex-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Result.propTypes = {
  hideModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Result;
