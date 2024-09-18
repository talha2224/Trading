import React from 'react'

const RegisterPage = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col px-5'>

            <h1 className='text-3xl'>Create Admin Account</h1>


            <form action="" className='mt-[2rem] w-[100%] flex justify-center items-center flex-col'>
                <div className='w-[100%] sm:w-fit'>
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
                <button className='mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block'>Sign Up</button>
            </form>
        </div>
    )
}

export default RegisterPage