import { useState } from 'react'
import { FaBell, FaUser } from "react-icons/fa";
import axios from 'axios';
import { message } from 'antd';

const BACKEND_URL = 'http://localhost:5000'; // Update this with your backend URL

const AdminNav = () => {
  const [fetchingMessage, setFetchingMessage] = useState(false);

  // Add function to fetch global message
  const handleGetGlobalMessage = async () => {
    try {
      setFetchingMessage(true);
      const response = await axios.get(`${BACKEND_URL}/api/globalmessage/message`);
      message.info(response.data.message);
    } catch (error) {
      console.error('Error fetching global message:', error);
      message.error(`Failed to fetch message: ${error.response?.data?.message || error.message}`);
    } finally {
      setFetchingMessage(false);
    }
  };

  return (
    <div className='h-[10vh] border-b border-lightBlue w-[100%] flex justify-between items-center'>
      <h1 className='text-base md:text-3xl font-semibold'>LOGO</h1>

      <div className='flex justify-between items-center gap-x-5'>
        <p>Admin</p>
        
        <button 
          className='h-[2.3rem] rounded-md px-2 bg-[#142937]'
          onClick={handleGetGlobalMessage}
          disabled={fetchingMessage}
        >
          {fetchingMessage ? 'Loading...' : 'Send Notification'}
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
