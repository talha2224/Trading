import React from 'react'

export const Risk = () => {
  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl'>Position Limits:</h1>
      <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Minimum Position Size</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
        </div>
        <div>
          <p>Maximum Position Sizee</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
        </div>

      </div>
      <h1 className='text-xl mt-10'>Stop-Loss/Take-Profit Settings:</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Default Stop Loss</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='-----/----' />
        </div>
        <div>
          <p>Default Take Profit</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='----/----' />
        </div>

      </div>


      <h1 className='text-xl mt-10'>Risk Controls:</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Risk Percentage per Trade</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='-----/----' />
        </div>
        <div>
          <p>Maximum Daily Loss Limit</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='----/----' />
        </div>

        <div>
          <p>Risk Exposure Monitoring</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='----/----' />
        </div>

      </div>

      <button className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960] mb-6'>Save</button>
    </div>
  )
}
