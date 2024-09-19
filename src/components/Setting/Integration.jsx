import React from 'react'

const Integration = () => {
  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl'>API Integration:</h1>
      <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Third-Party API Configuration</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Yes' />
        </div>
        <div>
          <p>API Key Management</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
        </div>

      </div>
      <h1 className='text-xl mt-10'>Market Data Providers:</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Data Feed Configuration</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='-----/----' />
        </div>
        <div>
          <p>Market Data Subscription Management</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='----/----' />
        </div>

      </div>


      <h1 className='text-xl mt-10'>Trading Platform Plugins:</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Integration with External Trading Platforms</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Yes' />
        </div>
      </div>

      <button className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960] mb-6'>Save</button>
    </div>
  )
}

export default Integration