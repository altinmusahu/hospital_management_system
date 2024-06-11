import { useState, useEffect } from "react";
import { Sidebar } from "./Dashboard";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [newRoom, setNewRoom] = useState({
    Emri: "",
    Kapaciteti: "",
    nurseId: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
    fetchNurses();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchNurses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/all-nurses"
      );
      setNurses(response.data);
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomData = { ...newRoom };
      if (isUpdating) {
        // Displays the confirmation form
        handleUpdateConfirmation(roomData);
      } else {
        await axios.post("http://localhost:3000/admin/room", roomData);
        fetchRooms();
        setShowForm(false);
        setNewRoom({
          Emri: "",
          Kapaciteti: "",
          nurseId: "",
        });
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleUpdate = async (roomData) => {
    try {
      await axios.put(
        `http://localhost:3000/admin/room/${selectedRoom.Id}`,
        roomData
      );
      fetchRooms();
      setShowForm(false);
      setIsUpdating(false);
      Swal.fire("Saved!", "", "success");
      setNewRoom({
        Emri: "",
        Kapaciteti: "",
        nurseId: "",
      });
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleUpdateConfirmation = (roomData) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate(roomData);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
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
        await axios.delete(`http://localhost:3000/admin/room/${id}`);
        fetchRooms();
        Swal.fire({
          title: "Deleted!",
          text: "This room has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="lg:w-3/4 mt-20">
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-4 flex mx-auto justify-center">
            Rooms
          </h1>
          <form onSubmit={handleSubmit} className="flex justify-center">
            <div className="flex mb-4">
              <input
                type="text"
                name="Emri"
                value={newRoom.Emri}
                onChange={handleChange}
                placeholder="Room Name"
                className="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="Kapaciteti"
                value={newRoom.Kapaciteti}
                onChange={handleChange}
                placeholder="Capacity"
                className="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />

              <select
                name="nurseId"
                value={newRoom.nurseId}
                onChange={handleChange}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Nurse</option>
                {nurses.map((nurse) => (
                  <option key={nurse.Id} value={nurse.Id}>
                    {nurse.Staff.Emri} {nurse.Staff.Mbiemri}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {isUpdating ? "Update Room" : "Add Room"}
              </button>
            </div>
          </form>
          <table className="w-[60%] border-collapse border border-gray-300 mx-auto mt-10 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border w-[20%] border-gray-300">
                  Room Name
                </th>
                <th className="px-4 py-2 border w-[10%] border-gray-300">
                  Capacity
                </th>
                <th className="px-4 py-2 border w-[20%] border-gray-300">
                  Nurse
                </th>
                <th className="px-4 py-2 border w-[20%] border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms &&
                rooms.map((room) => (
                  <tr key={room.Id}>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.Emri}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.Kapaciteti}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {room.Nurses &&
                      room.Nurses.length > 0 &&
                      room.Nurses[0].Staff ? (
                        <>
                          {room.Nurses[0].Staff.Emri}{" "}
                          {room.Nurses[0].Staff.Mbiemri}
                        </>
                      ) : (
                        "No Nurse"
                      )}
                    </td>
                    <td className="flex flex-row justify-center px-4 py-2  border border-gray-200">
                      <button
                        onClick={() => {
                          setSelectedRoom(room);
                          setNewRoom({
                            Emri: room.Emri,
                            Kapaciteti: room.Kapaciteti,
                            nurseId:
                              room.Nurses &&
                              room.Nurses.length > 0 &&
                              room.Nurses[0].Id
                                ? room.Nurses[0].Id
                                : "",
                          });
                          setShowForm(true);
                          setIsUpdating(true);
                        }}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg mx-1 flex items-center"
                      >
                        <FaEdit className="mr-1" /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(room.Id)}
                        className="text-white bg-red-500 hover:bg-red-900 px-3 py-1 rounded-lg mx-1 flex items-center"
                      >
                        <MdDelete className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
