import React from 'react'

const OrderManagement = () => {
    const arr = [1, 2, 3, 4.5, 6, 7, 8, 9, 10]

    return (
        <div className='mt-[2rem]'>
            <div className='p-5 rounded-md w-[100%] mb-4 overflow-x-auto'>
                <div className='flex justify-between items-center'>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Order Id</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>User Id</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Asset</p>
                    <p className='text-[#6E7975] flex-1 min-w-[15rem] mr-1'>Order Type</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Order Size</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Order Price</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Time Of Order</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Status</p>
                </div>
                {
                    arr.map((i) => (
                        <div key={i} className='flex justify-between items-center mt-4'>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Order122</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>ID232</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>USDT/XRP</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Buy</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>0.1</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>------</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>------</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Pending</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OrderManagement