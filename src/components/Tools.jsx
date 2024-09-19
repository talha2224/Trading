import React from 'react'
import DotGraph from '../assets/chart1.png'
import Area1 from '../assets/area1.png'
const Tools = () => {
    const arr = [1, 2, 3, 4, 5]

    return (
        <div className='mt-[2rem] pb-4'>
            {/* #279d9d */}
            <div className='flex justify-between items-start gap-x-10 flex-wrap lg:flex-row flex-col'>

                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <h1 className='text-lg'>Charting Tool</h1>
                    <p className='mt-4'>Tools</p>
                    <div className="flex items-center gap-x-5 mt-2 overflow-x-auto">
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md overflow-x-auto'>
                            <p className='text-nowrap'>Candle Sticks</p>
                        </div>
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md overflow-x-auto'>
                            <p className='text-nowrap'>Bar Chart</p>
                        </div>
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md overflow-x-auto'>
                            <p className='text-nowrap'>Line Chart</p>
                        </div>
                    </div>
                    <p className='mt-4'>Technical Indicators</p>
                    <div className="flex items-center gap-x-5 mt-2 overflow-x-auto">
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md overflow-x-auto'>
                            <p className='text-nowrap'>Moving Avg</p>
                        </div>
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md overflow-x-auto'>
                            <p className='text-nowrap'>RSI</p>
                        </div>
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md overflow-x-auto'>
                            <p className='text-nowrap'>MACD</p>
                        </div>
                    </div>
                    <p className='mt-4'>Drawing Tools</p>
                    <div className="flex items-center gap-x-5 mt-2 overflow-x-auto">
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md'>
                            <p className='text-nowrap'>Candle Sticks</p>
                        </div>
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md overflow-x-auto'>
                            <p className='text-nowrap'>Bar Chart</p>
                        </div>
                        <div className='bg-[#0c2f31] min-w-[5rem] h-[3rem] px-6 py-3 rounded-md overflow-x-auto'>
                            <p className='text-nowrap'>Line Chart</p>
                        </div>
                    </div>
                </div>

                <div className='flex-1 px-5 py-7 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <h1 className='px-5'>Order Book</h1>
                    <div className='p-5 rounded-md w-[100%] mb-4 overflow-x-auto'>
                        <div className='flex justify-between items-center'>
                            <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Price</p>
                            <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Quantity</p>
                            <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Total</p>
                            <p className='text-[#6E7975] flex-1 min-w-[15rem] mr-1'>Type</p>
                        </div>
                        {
                            arr.map((i) => (
                                <div key={i} className='flex justify-between items-center mt-4'>
                                    <p className='flex-1 min-w-[10rem] mr-1 truncate text-start'>2344</p>
                                    <p className='flex-1 min-w-[10rem] mr-1 truncate text-start'>1</p>
                                    <p className='flex-1 min-w-[10rem] mr-1 truncate text-start'>----</p>
                                    <p className='flex-1 min-w-[10rem] mr-1 truncate text-start'>Buy</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


            <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] pb-4'>
                <h1>News Feed</h1>
                <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
                    <div>
                        <p>Filter</p>
                        <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Forex' />
                    </div>
                    <div>
                        <p>Filter</p>
                        <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Assest' />
                    </div>

                </div>

                <h1 className='mt-10'>April 1 20-24</h1>
                <h1 className='mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, a reprehenderit</h1>
                <h1 className='mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus dolorem iure corrupti. Odio delectus voluptatem molestiae error unde, voluptate dolor, eveniet porro pariatur quidem itaque cupiditate minus quis eius dolorum.</h1>
                <h1 className='mt-10'>April 1 20-24</h1>
                <h1 className='mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, a reprehenderit</h1>
                <h1 className='mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus dolorem iure corrupti. Odio delectus voluptatem molestiae error unde, voluptate dolor, eveniet porro pariatur quidem itaque cupiditate minus quis eius dolorum.</h1>
            </div>
        </div>
    )
}

export default Tools