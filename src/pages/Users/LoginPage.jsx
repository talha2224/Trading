import React from 'react'
import Navbar from '../../components/Users/Navbar'
import Candle from '../../assets/candle.png'
import { useNavigate } from 'react-router-dom'
const LoginPage = () => {
  const nav = useNavigate()

  return (
    <div>
      <Navbar title={"Sign up"} link={"/register"} />

      <div className='flex h-[90vh] justify-center items-center flex-col px-5'>
        <h1 className='text-3xl'>Login Your Account</h1>

        <div className='w-[100%] sm:w-fit mt-[3rem]'>
          <p className='mb-2'>Email Address</p>
          <input type="email" name="email" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>
        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Password</p>
          <input type="password" name="password" id="" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' />
        </div>
        <p onClick={()=>nav("/forgot")} className='mt-3 w-[100%] sm:w-[25rem] text-end cursor-pointer'>Forgot Password</p>
        <button onClick={() => nav("/user/home")} className='mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block'>Sign In</button>
      </div>

      <img src={Candle} alt="" className='fixed bottom-[30%] left-0 -z-50' />
      <img src={Candle} alt="" className='fixed bottom-[30%] right-0 -z-50' />

    </div>
  )
}

export default LoginPage