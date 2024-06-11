import { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Appointment({ showAlert }) {
    

    const [selectedDate, setSelectedDate] = useState();
    const [appointments, setAppointments] = useState([]);

    console.log(appointments);

    const [Pershkrimi, setPershkrimi] = useState("");
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [highlightedEvent, setHighlightedEvent] = useState(null);


    useEffect(() => {
        fetchDepartments();
        fetchAppointments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/departments'); 
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/appointments');
            setAppointments(response.data.rows.map(appointment => ({
                id: appointment.Id,
                start: new Date(appointment.Date).toISOString(), 
                end: new Date(appointment.Date).toISOString(),
                backgroundColor: 'blue', 
                textColor: 'white'
            })));
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleDateClick = (info) => {
        const selected = new Date(info.startStr);
        const today = new Date();

        if (selected < today) {
            toast.error("Appointment cannot be in the past!");
        } else {
            setSelectedDate(info.startStr);
            setHighlightedEvent({
                start: info.startStr,
                end: info.endStr,
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                textColor: 'white',

            });
        }

        console.log(selected);
        console.log(appointments);
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You cannot make an appointment without logging in");
            return;
        }

        if (!selectedDate || !Pershkrimi || !selectedDepartment) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/appointment', {
                Date: selectedDate,
                Pershkrimi: Pershkrimi,
                DepartmentId: selectedDepartment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                showAlert("Appointment created successfully!");
                setPershkrimi("");
                setSelectedDepartment("");
                setSelectedDate();
            }

        } catch (err) {
            console.error('Appointment creation error:', err);
            toast.error("An error occurred during appointment creation. Please try again.");
        }
        window.location.reload();
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> 

            <section className="bg-emerald-700 h-full relative">
                <div className="relative p-36">
                    <h1 className="text-white tracking-wider text-2xl">Book Appointment</h1>
                    <div className="h-0 w-36 mt-2 mx-4 border border-pink-700" />

                    <div className="mt-12">
                    <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek"
                            slotMinTime="08:00:00"
                            slotMaxTime="18:00:00"
                            height="60vh"
                            eventBackgroundColor='white'
                            selectable={true}
                            select={handleDateClick}
                            events={appointments.concat(
                                highlightedEvent ? [highlightedEvent] : []
                            )}
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-full">
                    <div className="w-2/4 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="bg-white p-6 rounded-md shadow-lg">
                                    <p className="text-center font-semibold">Selected Date: {selectedDate}</p>
                                </div>
                            </div>

                            <div>
                                <div className="bg-white p-4 rounded-md shadow-lg">
                                    <label htmlFor="department" className="block text-sm font-bold text-gray-900">Department Name</label>
                                    <select value={selectedDepartment} onChange={handleDepartmentChange} className="bg-gray-50 border text-sm w-full py-2.5 focus:outline-none">
                                        <option value="" disabled>Select Department</option>
                                        {departments.map((department) => (
                                            <option key={department.Id} value={department.Id}>{department.Name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="bg-white p-4 rounded-md shadow-lg">
                                <label htmlFor="pershkrimi" className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                                <textarea id="pershkrimi" value={Pershkrimi} onChange={(e) => setPershkrimi(e.target.value)} className="bg-gray-50 border text-sm w-full py-2.5 px-3 focus:outline-none resize-none" rows="4"></textarea>
                            </div>
                        </div>

                        <div className="mt-6 mb-6">
                            <button type="submit" className="text-base py-3 px-12 rounded-md bg-teal-900 hover:bg-teal-800 text-white focus:outline-none">Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}

Appointment.propTypes = {
    showAlert: PropTypes.func.isRequired,
};
