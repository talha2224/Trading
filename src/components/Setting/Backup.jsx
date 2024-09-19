import React from 'react'

const Backup = () => {
  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl mt-5'>Data Backup:</h1>

      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Backup Storage Location</p>
          <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
          <div>
            <p>Scheduled Backup Configuration</p>
            <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
          </div>
        </div>

      </div>

      <h1 className='text-xl mt-5'>Disaster Recovery Plan:</h1>

      <div className=' mt-5'>
        <p>Disaster Recovery Plan</p>
        <textarea type="text" name="" id="" className='h-[15rem] rounded-md min-w-[100%] sm:min-w-[30rem] py-5 outline-none px-3 bg-[#081F22] mt-2 resize-none' placeholder='-----' />
      </div>


      <button className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960] mb-6'>Save</button>


    </div>
  )
}

export default Backup