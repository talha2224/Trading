import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Reports = () => {
    const arr = [1, 2, 3, 4.5, 6, 7, 8, 9, 10]

    return (
        <div className='mt-[2rem] pb-4'>
            {/* #279d9d */}
            <h1 className='text-xl'>Trading Performance Report</h1>
            <h1 className='text-lg mt-3'>Executive Summary</h1>
            <div className='flex justify-between items-start gap-x-10 flex-wrap lg:flex-row flex-col mt-10'>

                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4 h-[20rem]'>
                    <h1 className='text-lg text-[#ABB2B4]'>Key Hightlight</h1>
                </div>

                <div className='flex-1 px-5 py-7 bg-[#0E262E] rounded-md w-[100%] mb-4 h-[20rem]'>
                    <h1 className='text-lg text-[#ABB2B4]'>Performance Overview</h1>
                </div>
            </div>

            <h1 className='text-xl mb-6 mt-6'>Trading Metrics</h1>
            <div className='p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                <h1 className='text-xl px-5 '>Performance Metrics Table</h1>
                <div className='p-5 rounded-md w-[100%] mb-4 overflow-x-auto'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Firstname</p>
                        <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Lastname</p>
                        <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Email</p>
                        <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Date Registered</p>
                        <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Last seen</p>
                        <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Status</p>
                        <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Trades</p>

                        <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Action</p>
                    </div>
                    {
                        arr.map((i) => (
                            <div key={i} className='flex justify-between items-center mt-4'>
                                <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Talha</p>
                                <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Haider</p>
                                <p className=' flex-1 min-w-[10rem] mr-1 truncate'>@mail.cm</p>
                                <p className=' flex-1 min-w-[10rem] mr-1 truncate'>2-09-2002</p>
                                <p className=' flex-1 min-w-[10rem] mr-1 truncate'>2-09-2002 12:00 am</p>
                                <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Verified</p>
                                <p className=' flex-1 min-w-[10rem] mr-1 truncate'>100</p>
                                <p className=' flex-1 min-w-[10rem] mr-1 truncate'><BsThreeDotsVertical /></p>
                            </div>
                        ))
                    }
                </div>
            </div>



        </div>
    )
}

export default Reports