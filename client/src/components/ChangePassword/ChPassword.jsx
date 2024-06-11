import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../pages/Profile/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function ChPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:3000/update-password',
        {
          currentPassword,
          newPassword,
          confirmedPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'An error occurred while changing the password'
      );
    }

    window.location.reload();
  };

  return (
    <section className='flex min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 p-14'>
        <button
          className="flex items-center mb-6 text-blue-600 hover:text-blue-800"
          onClick={() => navigate("/")}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back Home
        </button>
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword} className='border rounded-lg w-1/2 p-6 bg-white shadow-lg'>
          <div className='p-2'>
            <label htmlFor="currentPassword" className='block mb-2 text-sm font-medium text-gray-700'>Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              className='w-full p-2 border border-gray-300 rounded-lg'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className='p-2'>
            <label htmlFor="newPassword" className='block mb-2 text-sm font-medium text-gray-700'>New Password:</label>
            <input
              type="password"
              id="newPassword"
              className='w-full p-2 border border-gray-300 rounded-lg'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className='p-2'>
            <label htmlFor="confirmPassword" className='block mb-2 text-sm font-medium text-gray-700'>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className='w-full p-2 border border-gray-300 rounded-lg'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className='bg-emerald-700 text-white rounded-lg px-4 py-2 mt-4' type="submit">Change Password</button>
        </form>
        {message && <p className='mt-4 text-green-800'>{message}</p>}
      </div>
    </section>
  );
}
