import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

const UserListing = () => {
    const arr = [1, 2, 3, 4]

    return (
        <div className='mt-[2rem]'>

            <div className='mb-10 flex justify-between items-center overflow-x-auto'>
                <div className='flex justify-between items-center gap-x-7'>
                    <div>
                        <p>Search User</p>
                        <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
                    </div>
                    <div>
                        <p>Filter</p>
                        <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
                    </div>
                    <div>
                        <p>From</p>
                        <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='---/---' />
                    </div>
                    <div>
                        <p>To</p>
                        <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='---/---' />
                    </div>

                </div>
                <div>
                    <button className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2'>Add User</button>
                </div>
            </div>


            <div className='p-5 rounded-md w-[100%] mb-4 overflow-x-auto'>
                <div className='flex justify-between items-center'>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Firstname</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Lastname</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Email</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Date Registered</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Last seen date</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Last seen time</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Role</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Action</p>
                </div>
                {
                    arr.map((i) => (
                        <div key={i} className='flex justify-between items-center mt-4'>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Talha</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Haider</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>@mail.cm</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>2-09-2002</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>2-09-2002</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>12:00 am</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>1</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'><BsThreeDotsVertical /></p>



                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UserListing