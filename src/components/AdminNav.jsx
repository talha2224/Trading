import React from 'react'
import { FaBell, FaUser } from "react-icons/fa";

const AdminNav = () => {
  return (
    <div className='h-[10vh] border-b border-lightBlue w-[100%] flex justify-between items-center'>
      <h1 className='text-base md:text-3xl font-semibold'>LOGO</h1>

      <div className='flex justify-between items-center gap-x-5'>
        <p>Admin</p>
        <button className='h-[2.3rem] rounded-md px-2 bg-[#142937]'>Send Notification</button>

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