import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/appointments-per-month');
        console.log('API Response:', response.data);

        const formattedData = response.data.data.map(item => ({
          name: `${getMonthName(item.month)} ${item.year}`,
          count: item.count,
        }));

        console.log('Formatted Data:', formattedData);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    };

    fetchData();
  }, []);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <div style={{ width: 400, height: 400 }}>
      <h2 className='text-xl font-semibold ml-12'>Appointments Per Month</h2>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip contentStyle={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc' }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', stroke: '#8884d8', strokeWidth: 2, r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
