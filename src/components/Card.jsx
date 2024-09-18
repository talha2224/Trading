import React from 'react'

const Card = () => {
  return (
    <div className='mt-[2.5rem]  w-[100%] flex gap-x-5 items-center overflow-x-auto'>
        <div className='bg-[#0E262E] min-w-[16rem] h-[8rem] px-6 py-3 rounded-md'>
            <p>Total User</p>
            <p className='text-center mt-6'>----</p>
        </div>
        <div className='bg-[#0E262E] min-w-[16rem] h-[8rem] px-6 py-3 rounded-md'>
            <p>Total Trades</p>
            <p className='text-center mt-6'>----</p>
        </div>
        <div className='bg-[#0E262E] min-w-[16rem] h-[8rem] px-6 py-3 rounded-md'>
            <p>Win Rate</p>
            <p className='text-center mt-6'>----</p>
        </div>
        <div className='bg-[#0E262E] min-w-[16rem] h-[8rem] px-6 py-3 rounded-md'>
            <p>Total Traders</p>
            <p className='text-center mt-6'>----</p>
        </div>
        <div className='bg-[#0E262E] min-w-[16rem] h-[8rem] px-6 py-3 rounded-md'>
            <p>Total Assessts Management</p>
            <p className='text-center mt-6'>----</p>
        </div>

    </div>
  )
}

export default Card