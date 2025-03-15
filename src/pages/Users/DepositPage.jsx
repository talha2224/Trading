import React, { useState } from 'react'
import LoginNavbar from '../../components/Users/LoginNavbar'
import { FaBtc, FaCopy, FaEthereum, FaRegCreditCard } from "react-icons/fa";
import { BiDownArrow, BiSolidDownArrow } from 'react-icons/bi';
import { IoLogoUsd } from "react-icons/io5";
import { SiSolana } from "react-icons/si";
import { RiBnbFill } from "react-icons/ri";

const DepositPage = () => {

    const [type, setType] = useState("deposit")
    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <div className='px-5'>




            <div className='border-b border-[#103147]'>
                <LoginNavbar />
            </div>




            <div className='mt-[2rem] flex items-start gap-x-[2.5rem]'>

                <div>
                    <p className='text-xs text-[#c4c4c4]'>Payment Option</p>

                    <div className='bg-[#0A1A23] border border-[#103147] mt-8 w-[20rem] h-[10rem] rounded-lg px-3 py-5 flex justify-center items-center flex-col'>

                        <div onClick={() => { setType("deposit") }} className={`w-[90%] h-[3.4rem] rounded-md px-3 flex items-center gap-x-5 justify-start cursor-pointer ${type === "deposit" && "bg-[#010410] border-l-8 border-[#3391F6]"}`}>
                            <FaRegCreditCard />
                            <p>Deposit</p>
                        </div>

                        <div onClick={() => { setType("withdraw") }} className={`w-[90%] h-[3.4rem] rounded-md px-3 flex items-center gap-x-5  justify-start cursor-pointer mt-4 ${type === "withdraw" && "bg-[#010410] border-l-8 border-[#3391F6]"}`}>
                            <FaRegCreditCard />
                            <p>Withdraw</p>
                        </div>


                    </div>


                </div>

                {
                    type == "deposit" ?
                        <div className='flex-1'>
                            <h1 className='text-lg text-[#c4c4c4]'>Deposit</h1>

                            <div className='border-b border-[#103147] flex gap-x-5 items-center overflow-x-auto mt-4'>

                                <div onClick={() => setCurrentIndex(0)} className={`${currentIndex == 0 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                                    <p className={`${currentIndex != 0 && "text-[#6E7975]"} text-nowrap`}>Bank Cards</p>
                                </div>
                                <div onClick={() => setCurrentIndex(1)} className={`${currentIndex == 1 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                                    <p className={`${currentIndex != 1 && "text-[#6E7975]"} text-nowrap`}>Crypto Currencies</p>
                                </div>

                            </div>

                            {
                                currentIndex === 0 ?

                                    <div className='flex justify-between items-start mt-10'>

                                        <div className='border-r border-[#103147] pr-10 '>
                                            <div className='mt-4'>
                                                <p className='text-[#c4c4c4] mb-2 text-xs'>Select Funding Method</p>
                                                <div className='w-[15rem] h-[2.5rem] rounded-md px-3 bg-[#0B3639]  outline-none flex justify-between items-center'>
                                                    <p>Changelly</p>
                                                    <BiSolidDownArrow className='text-xs' />
                                                </div>
                                            </div>
                                            <div className='mt-4'>
                                                <p className='text-[#c4c4c4] mb-2 text-xs'>Enter Deposit Amount</p>
                                                <div className='w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-between items-center'>
                                                    <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                                </div>
                                            </div>
                                            <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                                <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                            </div>
                                            <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                                <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                            </div>
                                            <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                                <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                            </div>
                                            <p className='text-xs text-[#c4c4c4] mt-4'>Minimum transfer amount: 10 USD</p>
                                            <p className='text-xs text-[#c4c4c4] mt-2'>Maximum transfer amount: 50000 USD</p>
                                        </div>

                                        <div className='border-r border-[#103147] px-10 flex-1'>
                                            <p className='text-xs text-[#c4c4c4] text-center'>Simply use your bank card to purchase Bitcoin through the most <br /> well-known cryptocurrency, changelly.com, to fund your trading <br /> account.</p>
                                            <div className='flex justify-center items-center mt-10'>
                                                <img className='h-[12rem]' src={`https://img.freepik.com/premium-vector/vector-qr-code-sample-smartphone-scanning-isolated-white-background_661675-2003.jpg`} alt="" />
                                            </div>

                                            <div className='mt-4 flex items-center gap-x-4'>
                                                <p className='text-[#c4c4c4] text-xs'>Bitcoin (BTC) Address:</p>
                                                <div className='w-[15rem] h-[2.3rem] rounded-md bg-[#061016] px-3 flex justify-between items-center'>
                                                    <p className='text-sm text-[#c4c4c4]'>dhdy7ecegc7tecge</p>
                                                    <FaCopy className=' cursor-pointer' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='border- border-[#103147] flex-1 pl-10'>
                                            <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#0b3639] outline-none rounded-md px-3 text-white placeholder:text-white'>
                                                <p className='text-sm'>1.     Go to the Changelly.com/buy</p>
                                                <BiDownArrow />
                                            </div>
                                            <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#0b3639] outline-none rounded-md px-3 text-white placeholder:text-white'>
                                                <p className='text-sm'>2. Choose the amount you would like to deposit</p>
                                                <BiDownArrow />
                                            </div>
                                            <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#0b3639] outline-none rounded-md px-3 text-white placeholder:text-white'>
                                                <p className='text-sm'>3. Choose the most suitable payment provider</p>
                                                <BiDownArrow />
                                            </div>
                                            <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#0b3639] outline-none rounded-md px-3 text-white placeholder:text-white'>
                                                <p className='text-sm'>4. Paste previously copied bitcoin address</p>
                                                <BiDownArrow />
                                            </div>
                                            <div className='w-[23rem] h-[2.3rem] mt-3 gap-x-3 flex justify-between items-center bg-[#0b3639] outline-none rounded-md px-3 text-white placeholder:text-white'>
                                                <p className='text-sm truncate'>5. Enter the required information and follow the further instructions</p>
                                                <BiDownArrow />
                                            </div>
                                        </div>


                                    </div>
                                    :

                                    <div className='flex justify-between items-start mt-10'>


                                        <div className='border-r border-[#103147] flex-1'>
                                            <p className='mb-2 text-xs text-[#c4c4c4]'>Select Funding Method</p>
                                            <div className='w-[18.5rem] h-[3rem] mt-3 flex justify-between items-center bg-[#0b3639] outline-none rounded-md px-3 text-white placeholder:text-white'>
                                                <input type="text" name="" placeholder='Search For Crypto' className=' bg-transparent flex-1 outline-none' id="" />
                                            </div>

                                            <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                                <FaBtc className=' text-orange-600' />
                                                <p className='text-sm text-[#c4c4c4]'>Bitcoin</p>
                                            </div>


                                            <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                                <FaEthereum className=' text-[#88aaf1]' />
                                                <p className='text-sm text-[#c4c4c4]'>Ethereum</p>
                                            </div>

                                            <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                                <IoLogoUsd className=' text-green-200' />
                                                <p className='text-sm text-[#c4c4c4]'>Thether USDT</p>
                                            </div>

                                            <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                                <SiSolana className=' text-purple-600' />
                                                <p className='text-sm text-[#c4c4c4]'>Solana</p>
                                            </div>

                                            <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                                <RiBnbFill className=' text-yellow-600' />
                                                <p className='text-sm text-[#c4c4c4]'>BNB</p>
                                            </div>


                                        </div>

                                        <div className='border-r border-[#103147] px-10'>
                                            <div className='mt-4'>
                                                <p className='text-[#c4c4c4] mb-2 text-xs'>Select Funding Method</p>
                                                <div className='w-[15rem] h-[2.5rem] rounded-md px-3 bg-[#0B3639]  outline-none flex justify-between items-center'>
                                                    <p>Changelly</p>
                                                    <BiSolidDownArrow className='text-xs' />
                                                </div>
                                            </div>
                                            <div className='mt-4'>
                                                <p className='text-[#c4c4c4] mb-2 text-xs'>Enter Deposit Amount</p>
                                                <div className='w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-between items-center'>
                                                    <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                                </div>
                                            </div>
                                            <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                                <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                            </div>
                                            <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                                <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                            </div>
                                            <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                                <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                            </div>
                                            <p className='text-xs text-[#c4c4c4] mt-4'>Minimum transfer amount: 10 USD</p>
                                            <p className='text-xs text-[#c4c4c4] mt-2'>Maximum transfer amount: 50000 USD</p>
                                        </div>

                                        <div className='pl-10 flex-1'>
                                            <p className='text-xs text-[#c4c4c4] text-center'>Simply use your bank card to purchase Bitcoin through the most <br /> well-known cryptocurrency, changelly.com, to fund your trading <br /> account.</p>
                                            <div className='flex justify-center items-center mt-10'>
                                                <img className='h-[12rem]' src={`https://img.freepik.com/premium-vector/vector-qr-code-sample-smartphone-scanning-isolated-white-background_661675-2003.jpg`} alt="" />
                                            </div>

                                            <div className='mt-4 flex items-center gap-x-4'>
                                                <p className='text-[#c4c4c4] text-xs'>Bitcoin (BTC) Address:</p>
                                                <div className='w-[15rem] h-[2.3rem] rounded-md bg-[#061016] px-3 flex justify-between items-center'>
                                                    <p className='text-sm text-[#c4c4c4]'>dhdy7ecegc7tecge</p>
                                                    <FaCopy className=' cursor-pointer' />
                                                </div>
                                            </div>
                                        </div>





                                    </div>

                            }

                        </div>
                        :
                        <div className='flex-1'>

                            <div className='flex items-center gap-x-5'>
                                <h1 className='text-lg text-[#c4c4c4]'>Current Balance</h1>
                                <button className='bg-[#071E1F] w-[10rem] h-[2.3rem] rounded-md'>1000 USDT</button>
                            </div>

                            <div className='flex justify-between items-start mt-10'>


                                <div className='border-r border-[#103147] flex-1'>
                                    <p className='mb-2 text-xs text-[#c4c4c4]'>Withdraw Your Funds</p>
                                    <div className='w-[18.5rem] h-[3rem] mt-3 flex justify-between items-center bg-[#0b3639] outline-none rounded-md px-3 text-white placeholder:text-white'>
                                        <input type="text" name="" placeholder='Search For Crypto' className=' bg-transparent flex-1 outline-none' id="" />
                                    </div>

                                    <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                        <FaBtc className=' text-orange-600' />
                                        <p className='text-sm text-[#c4c4c4]'>Bitcoin</p>
                                    </div>


                                    <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                        <FaEthereum className=' text-[#88aaf1]' />
                                        <p className='text-sm text-[#c4c4c4]'>Ethereum</p>
                                    </div>

                                    <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                        <IoLogoUsd className=' text-green-200' />
                                        <p className='text-sm text-[#c4c4c4]'>Thether USDT</p>
                                    </div>

                                    <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                        <SiSolana className=' text-purple-600' />
                                        <p className='text-sm text-[#c4c4c4]'>Solana</p>
                                    </div>

                                    <div className='w-[18.5rem] h-[2.5rem] rounded-md bg-[#061016] px-3 flex items-center gap-x-3 mt-3'>
                                        <RiBnbFill className=' text-yellow-600' />
                                        <p className='text-sm text-[#c4c4c4]'>BNB</p>
                                    </div>


                                </div>

                                <div className=' px-10'>
                                    <div className='mt-4'>
                                        <p className='text-[#c4c4c4] mb-2 text-xs'>Select Funding Method</p>
                                        <div className='w-[15rem] h-[2.5rem] rounded-md px-3 bg-[#0B3639]  outline-none flex justify-between items-center'>
                                            <p>Changelly</p>
                                            <BiSolidDownArrow className='text-xs' />
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <p className='text-[#c4c4c4] mb-2 text-xs'>Enter Deposit Amount</p>
                                        <div className='w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-between items-center'>
                                            <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                        </div>
                                    </div>
                                    <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                        <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                    </div>
                                    <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                        <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                    </div>
                                    <div className='mt-4 w-[15rem] h-[2.5rem] rounded-md px-3  bg-[#0B3639] outline-none flex justify-center items-center'>
                                        <input type="number" name="" id="" className='w-[100%] px-3 bg-transparent outline-none border-none' />
                                    </div>
                                    <p className='text-xs text-[#c4c4c4] mt-4'>Minimum transfer amount: 10 USD</p>
                                    <p className='text-xs text-[#c4c4c4] mt-2'>Maximum transfer amount: 50000 USD</p>
                                </div>

                                <div className='border-l border-[#103147] pl-10 flex-1'>
                                    <p className='text-[#c4c4c4] text-center'>Provide your details below</p>
                                    <p className='mb-2 text-xs text-[#c4c4c4]'>Amount</p>
                                    <input type='text' placeholder='80' className='w-[18.5rem] h-[3rem] mt-3 flex justify-between items-center bg-[#071E1F] outline-none rounded-md px-3 text-white placeholder:text-white' />
                                    <p className='mb-2 text-xs text-[#c4c4c4] mt-4'>Withdraw Crypto</p>
                                    <input type='text' placeholder='80' className='w-[18.5rem] h-[3rem] mt-3 flex justify-between items-center bg-[#071E1F] outline-none rounded-md px-3 text-white placeholder:text-white' />
                                    <p className='mb-2 text-xs text-[#c4c4c4] mt-4'>Select Network</p>
                                    <div className='w-[18.5rem] h-[3rem] mt-3 flex justify-between items-center bg-[#071E1F] outline-none rounded-md px-3 text-white placeholder:text-white'>
                                        <input placeholder='Tether (USDT) BEP - 20' type="text" name="" id="" className='flex-1 pr-3 bg-transparent outline-none border-none' />

                                        <BiDownArrow />
                                    </div>
                                    <p className='text-xs text-[#ffae34] mt-2'>Note: Only Tether (USDT) TRC-20 transactions selected. If something goes wrong, we won't be able to locate your transaction.</p>
                                    <p className='mb-2 text-xs text-[#c4c4c4] mt-4'>Enter wallet address</p>
                                    <input type='text' placeholder='3CCVnxZCsB7ZYuXCznAhpZSEwuFKYdZj7F' className='w-[18.5rem] h-[3rem] mt-3 flex justify-between items-center bg-[#071E1F] outline-none rounded-md px-3 text-white placeholder:text-white' />

                                    <button className='mt-6 h-[3.5rem] bg-[#135960] w-[80%] rounded-md'>Withdraw</button>
                                </div>





                            </div>
                        </div>

                }



            </div>




        </div>
    )
}

export default DepositPage