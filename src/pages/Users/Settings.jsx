import React, { useState } from 'react'
import LoginNavbar from '../../components/Users/LoginNavbar'
import { FaAngleDown, FaRegCreditCard } from 'react-icons/fa'

const Settings = () => {

    const [type, setType] = useState("deposit")
    const [currentIndex, setCurrentIndex] = useState(0)

    return (


        <div className='px-5'>

            <div className='border-b border-[#103147]'>
                <LoginNavbar />
            </div>


            <div className='mt-[2rem] flex items-start gap-x-[2.5rem]'>

                <div>
                    <p className='text-xs text-[#c4c4c4]'>Settings Option</p>

                    <div className='bg-[#0A1A23] border border-[#103147] mt-8 w-[20rem] h-[10rem] rounded-lg px-3 py-5 flex justify-center items-center flex-col'>

                        <div  className={`w-[90%] h-[3.4rem] rounded-md px-3 flex items-center gap-x-5 justify-start cursor-pointer ${type === "deposit" && "bg-[#010410] border-l-8 border-[#3391F6]"}`}>
                            <p>Personal Deatils</p>
                            {/* <FaAngleDown /> */}
                        </div>

                    </div>


                </div>

                <div className='flex-1'></div>

            </div>


        </div>
    )
}

export default Settings