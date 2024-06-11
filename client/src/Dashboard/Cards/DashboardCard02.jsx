import axios from "axios";
import { useEffect, useState } from "react";
function DashboardCard02() {

  const [total, setTotal] = useState([]);

  console.log(total);

  const fetchTotalAppointments = async() => {
    try{
      const response = await axios.get(`http://localhost:3000/admin/appointments`);
      setTotal(response.data.count);

    }catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    fetchTotalAppointments();
  }, []);


  return (
    <div className="flex bg-white dark:bg-slate-800 shadow-lg rounded-2xl border border-slate-200 dark:border-slate-700 ">
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Total Appointments</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">submited</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-4">{total}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;