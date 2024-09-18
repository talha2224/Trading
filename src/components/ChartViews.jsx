import React from 'react'
import DotGraph from '../assets/dot.png'
import Area1 from '../assets/area1.png'
const ChartViews = () => {
    const arr = [1, 2, 3, 4]
    return (
        <div className='mt-[2.5rem] w-[100%]'>

            <div className='flex justify-between items-start gap-x-10 flex-wrap lg:flex-row flex-col'>

                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[#6E7975] flex-1'>Traders</p>
                        <p className='text-[#6E7975] flex-1'>Date Registered</p>
                        <p className='text-[#6E7975] flex-1'>Trades</p>
                        <p className='text-[#6E7975] flex-1'>Current Account</p>
                    </div>
                    {
                        arr.map((i) => (
                            <div key={i} className='flex justify-between items-center mt-4'>
                                <p className=' flex-1'>Cyan</p>
                                <p className=' flex-1'>20-8-202</p>
                                <p className=' flex-1'>100</p>
                                <p className=' flex-1'>$ 2000</p>
                            </div>
                        ))
                    }
                    <button className='bg-[#082425] w-[100%] h-[3rem] rounded-md mt-6'>View All</button>
                </div>

                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <h1>Trading</h1>
                    <h1 className='my-3 text-xl'>Graph Showing Trading Volume</h1>
                    <img src={DotGraph} alt="" className='h-[12rem]' />
                </div>
            </div>


            <div className='flex justify-between items-center gap-x-10 mt-20 flex-wrap pb-10 lg:flex-row flex-col'>
                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <h1>Trading</h1>
                    <h1 className='my-3 text-xl'>Graph Showing Trading Volume</h1>
                    <img src={Area1} alt="" className='' />
                </div>
                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <h1>Trading</h1>
                    <h1 className='my-3 text-xl'>Graph Showing Trading Volume</h1>
                    <img src={Area1} alt="" className='' />
                </div>
            </div>
        </div>
    )
}

export default ChartViews