import React, { useState } from 'react'
import { FaBell, FaPlus, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const LoginNavbar = () => {

    const [showTypes, setshowTypes] = useState(false)
    const nav = useNavigate()
    return (

        <div className='px-5 flex justify-between items-center h-[10vh] w-[100%] overflow-x-auto gap-x-2 z-50'>

            <div className='flex items-center gap-x-5'>

                <h1 className='text-base md:text-3xl font-semibold cursor-pointer' onClick={()=>nav("/user/home")}>LOGO</h1>

                <div className='relative'>

                    <div onClick={() => setshowTypes(!showTypes)} className='min-w-[8rem] h-[2rem] rounded-md flex justify-center items-center bg-[#229FAA] cursor-pointer'>
                        <p className=''>Forex & CFD </p>
                    </div>
                    {
                        showTypes && (
                            <div className='bg-[#051718] w-[8rem] fixed left-[7.7rem] right-0 top-[3.8rem] p-2 z-50'>
                                <div className='flex justify-between items-center cursor-pointer'>
                                    <p className='text-xs'>EUR/USDT</p>
                                    <p className='text-xs'>$0.0</p>
                                </div>
                                <div className='flex justify-between items-center mt-1 cursor-pointer'>
                                    <p className='text-xs'>Add</p>
                                    <FaPlus className='text-xs' />
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>

            <div className='flex justify-between items-center gap-x-5'>

                <div className='h-[2.3rem] rounded-md px-2 bg-[#142937] flex justify-between items-center gap-x-3 cursor-pointer'>
                    <p className='text-nowrap'>10000 USDT</p>
                    <p className='text-[#FFAE34] text-nowrap'>Real</p>
                </div>
                <div className='flex justify-center items-center h-[2.3rem] min-w-[2.3rem] bg-[#142937] rounded-md px-2 cursor-pointer'>
                    <FaBell />
                </div>
                <div onClick={()=>nav("/setting")} className='flex justify-center items-center h-[2.3rem] min-w-[2.3rem] bg-[#142937] rounded-md px-2 cursor-pointer'>
                    <FaUser />
                </div>
                <button onClick={()=>nav("/deposit")} className='h-[2.3rem] rounded-md px-2 bg-[#142937] flex justify-between items-center cursor-pointer'>Deposit</button>
            </div>

        </div>

    )
}

export default LoginNavbar