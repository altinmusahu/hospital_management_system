import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart02 = () => {
  const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  return (
    <ResponsiveContainer width={400} height={400}>
      <h2 className='text-xl font-semibold ml-8'>Appointments Per Month</h2>

      <BarChart data={data} margin={{ top:20, right:0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#555" />
        <YAxis stroke="#555" />
        <Tooltip contentStyle={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc' }} />
        <Legend />
        <Bar dataKey="value" fill="#00bcd4" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart02;
