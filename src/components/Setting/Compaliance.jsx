import React from 'react'

const Compaliance = () => {
  return (
    <div className='mt-[2rem]'>

      <h1 className='text-xl'>Regulatory Compliance:</h1>

      <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Compliance Checklist</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' placeholder='Must have ---' />
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' placeholder='Must have ---' />
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' placeholder='Must have ---' />
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' placeholder='Must have ---' />
        </div>
        <div>
          <p>Regulatory Reporting Requirements</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' placeholder='Must have ---' />
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' placeholder='Must have ---' />
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' placeholder='Must have ---' />
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' placeholder='Must have ---' />
          </div>

      </div>


      <h1 className='text-xl mt-5'>Security Measures:</h1>

      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Encryption Settings</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Allow' />
        </div>
        <div>
          <p>Firewall Configuration</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Allow' />
        </div>

        <div>
          <p>Security Auditing and Logging</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Allow' />
        </div>

      </div>





      <button className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960] mb-6'>Save</button>
    </div>
  )
}

export default Compaliance