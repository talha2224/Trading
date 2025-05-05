import React, { useState } from 'react'
import { FaBell, FaUser } from "react-icons/fa";
import axios from 'axios';
import { message } from 'antd';

const BACKEND_URL = 'http://localhost:5000'; // Update this with your backend URL

const AdminNav = () => {
  const [sending, setSending] = useState(false);

  const handleSendNotification = async () => {
    try {
      setSending(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Not authenticated');
        return;
      }
      
      await axios.post(`${BACKEND_URL}/api/notifications/send`, 
        { message: "Notification has been send by admin" },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      message.success('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      message.error('Failed to send notification');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className='h-[10vh] border-b border-lightBlue w-[100%] flex justify-between items-center'>
      <h1 className='text-base md:text-3xl font-semibold'>LOGO</h1>

      <div className='flex justify-between items-center gap-x-5'>
        <p>Admin</p>
        <button 
          className='h-[2.3rem] rounded-md px-2 bg-[#142937]'
          onClick={handleSendNotification}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send Notification'}
        </button>

        <div className='flex justify-center items-center h-[2.3rem] w-[2.3rem] bg-[#142937] rounded-md px-2 cursor-pointer'>
          <FaBell />
        </div>
        <div className='flex justify-center items-center h-[2.3rem] w-[2.3rem] bg-[#142937] rounded-md px-2 cursor-pointer'>
          <FaUser />
        </div>
      </div>
    </div>
  )
}

export default AdminNav