import React from 'react'

export const Parameters = () => {
  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl'>Trade Size Limits:</h1>
      <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Minimum Trade Size</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
        </div>
        <div>
          <p>Maximum Trade Size</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
        </div>

      </div>
      <h1 className='text-xl mt-10'>Leverage/Margin Settings:</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Min Leverage</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='-----/----' />
        </div>
        <div>
          <p>Max Leverage</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='----/----' />
        </div>

        <div>
          <p>Margin Requirement</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='----/----' />
        </div>

      </div>


      <h1 className='text-xl mt-10'>Trading Hours:</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Regular Trading Hours</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='-----/----' />
        </div>
        <div>
          <p>Extended Trading Hours</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='----/----' />
        </div>

        <div>
          <p>Markit Holidays</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='----/----' />
        </div>

      </div>

      <button className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960] mb-6'>Save</button>
    </div>
  )
}
