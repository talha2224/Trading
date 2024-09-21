import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginNavbar from './LoginNavbar'
import { CiViewList } from "react-icons/ci";
import { IoIosAlert } from "react-icons/io";
import { FiBarChart2 } from "react-icons/fi";
import { MdOutlineArrowLeft } from "react-icons/md";
import Glow from '../../assets/glow.png'

const Layout = ({ setOpenNav, openNav, settradeType, tradeType }) => {
    return (

        <div className='overflow-y-auto'>
            <LoginNavbar />

            <div className='flex items-start gap-x-0 md:gap-x-[3rem] h-[88vh] w-screen overflow-y-auto z-50'>

                <div className={`${openNav ? "w-[12rem]" : "w-fit"} h-full p-5 md:block hidden`}>
                    {
                        openNav ?

                            <div className='relative md:block hidden'>
                                <div onClick={() => { settradeType("my") }} className={`flex justify-between items-center cursor-pointer ${tradeType === "my" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                                    <CiViewList className='' />
                                    <p className='flex-1 text-start ml-3 px-2'>My trades</p>
                                </div>
                                <div onClick={() => { settradeType("help") }} className={`flex justify-between items-center cursor-pointer mt-5 ${tradeType === "help" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                                    <IoIosAlert />
                                    <p className='flex-1 text-start ml-3 px-2'>Help center</p>
                                </div>
                                <div onClick={() => { settradeType("stats") }} className={`flex justify-between items-center cursor-pointer mt-5 ${tradeType === "stats" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                                    <FiBarChart2 />
                                    <p className='flex-1 text-start ml-3 px-2'>Trading Stats</p>
                                </div>

                                <div onClick={() => setOpenNav(!openNav)} className='absolute top-[10rem] right-0 w-[2rem] h-[3rem] flex justify-center items-center bg-[#040820] rounded-md cursor-pointer'>
                                    <MdOutlineArrowLeft className='text-[#01B28B]' />
                                </div>
                            </div>

                            :

                            <div className=' relative md:block hidden'>
                                <div onClick={() => { settradeType("my") }} className={`flex justify-between items-center cursor-pointer ${tradeType === "my" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                                    <CiViewList />
                                </div>
                                <div onClick={() => { settradeType("help") }} className={`flex justify-between items-center cursor-pointer mt-5 ${tradeType === "help" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                                    <IoIosAlert />
                                </div>
                                <div onClick={() => { settradeType("stats") }} className={`flex justify-between items-center cursor-pointer mt-5 ${tradeType === "stats" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                                    <FiBarChart2 />
                                </div>
                                <div onClick={() => setOpenNav(!openNav)} className='absolute top-[10rem] left-0 w-[2rem] h-[3rem] flex justify-center items-center bg-[#040820] rounded-md cursor-pointer'>
                                    <MdOutlineArrowLeft className='text-[#01B28B]' />
                                </div>
                            </div>

                    }

                </div>


                <div className={`w-fit h-full p-5 md:hidden block`}>
                    <div className='relative block md:hidden'>
                        <div onClick={() => { settradeType("my") }} className={`flex justify-between items-center cursor-pointer ${tradeType === "my" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                            <CiViewList />
                        </div>
                        <div onClick={() => { settradeType("help") }} className={`flex justify-between items-center cursor-pointer mt-5 ${tradeType === "help" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                            <IoIosAlert />
                        </div>
                        <div onClick={() => { settradeType("stats") }} className={`flex justify-between items-center cursor-pointer mt-5 ${tradeType === "stats" ? "text-[#FFAE34]" : "text-[#C4C4C4]"}`}>
                            <FiBarChart2 />
                        </div>
                    </div>

                </div>

                <div className='flex-1 h-full overflow-y-auto p-5 rounded-xl overflow-x-auto'>
                    <Outlet />
                </div>


            </div>

            <img src={Glow} alt="" className='fixed top-0 left-0 -z-50' />

        </div>


    )
}

export default Layout