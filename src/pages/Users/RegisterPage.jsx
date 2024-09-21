import React from 'react'
import Navbar from '../../components/Users/Navbar'
import Candle from '../../assets/candle.png'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const nav = useNavigate()
  return (
    <div>
      <Navbar title={"Log in"} link={"/"} />

      <div className='flex min-h-[90vh] justify-center items-center flex-col px-5'>
        <h1 className='text-3xl'>Register Your Account</h1>

        <div className='w-[100%] sm:w-fit mt-[3rem]'>
          <p className='mb-2'>Full Name</p>
          <input type="text" name="email" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>
        <div className='w-[100%] sm:w-fit mt-4'>
          <p className='mb-2'>Email Address</p>
          <input type="email" name="email" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>
        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Password</p>
          <input type="password" name="password" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>
        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Confirm Password</p>
          <input type="password" name="password" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>
        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>DOB</p>
          <input type="text" name="dob" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>

        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Phone Number</p>
          <input type="text" name="password" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>

        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Residence</p>
          <input type="text" name="password" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>

        <button onClick={() => nav("/user/home")} className='mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block mb-5'>Sign Up</button>
      </div>

      <img src={Candle} alt="" className='fixed bottom-[30%] left-0 -z-50' />
      <img src={Candle} alt="" className='fixed bottom-[30%] right-0 -z-50' />
    </div>
  )
}

export default RegisterPage