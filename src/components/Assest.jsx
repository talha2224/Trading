import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Assest = () => {
    const arr = [1, 2, 3, 4.5, 6, 7, 8, 9, 10]

    return (
        <div className='mt-[2rem]'>

            <div className='mb-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
                <div>
                    <p>Tradeable Assest</p>
                    <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
                </div>

            </div>


            <div className='p-5 rounded-md w-[100%] mb-4 overflow-x-auto'>
                <div className='flex justify-between items-center'>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Asset Name</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Symbol</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Class</p>
                    <p className='text-[#6E7975] flex-1 min-w-[15rem] mr-1'>Current Exchange Rate</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Bid-Ask-Spread</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Leverage</p>
                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Total Trades</p>

                    <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Action</p>
                </div>
                {
                    arr.map((i) => (
                        <div key={i} className='flex justify-between items-center mt-4'>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>XRP</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>USDT/XRP</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>Binance</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>1XRP = 0.5 USDT</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>------</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>1:400</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'>1000</p>
                            <p className=' flex-1 min-w-[10rem] mr-1 truncate'><BsThreeDotsVertical /></p>



                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Assest