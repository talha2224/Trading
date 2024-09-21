import React, { useState } from 'react'
import { FaAngleUp, FaCalendarAlt, FaCamera, FaStopwatch } from "react-icons/fa";
import { BiDownArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
import { RiFocus3Fill } from "react-icons/ri";
import { LuExpand } from "react-icons/lu";
import Icon1 from '../../assets/icon1.svg'
import Icon2 from '../../assets/icon2.png'
import Icon3 from '../../assets/icon3.png'
import Icon4 from '../../assets/icon4.png'
import Icon5 from '../../assets/icon5.png'
import Icon6 from '../../assets/icon6.png'
import Icon7 from '../../assets/icon7.png'
import Icon8 from '../../assets/icon8.png'
import Icon9 from '../../assets/icon9.png'
import Icon10 from '../../assets/icon10.png'
import Icon11 from '../../assets/icon11.png'
import Icon12 from '../../assets/icon12.png'
import Icon13 from '../../assets/icon13.png'
import chartType from '../../assets/chartType.png'
import Candle from '../../assets/candle2.png'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { ImCross } from "react-icons/im";
import { LuTimerReset } from "react-icons/lu";




const UserHome = ({ settradeType, tradeType }) => {
  const [type, setType] = useState("buy")
  const [showOpne, setshowOpne] = useState(false)
  const [showClose, setshowClose] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const arr = [1]

  return (

    <div className='block lg:flex justify-between items-start gap-x-4 h-[100%]'>


      <div className='bg-[#051617] flex-1 h-full p-5 rounded-xl flex flex-col '>
        <div className='flex items-center gap-x-8 overflow-x-auto w-[100%]'>
          <button className='bg-[#229FAA] px-2 h-[2.3rem] rounded-md text-nowrap'>EUR/USD <span className='text-[#FFAE34] ml-4'>95%</span></button>
          <div className='flex justify-between items-center h-[2.3rem] rounded-md text-nowrap px-2 gap-x-4 bg-[#240847] cursor-pointer'>
            <FaStopwatch className='text-[#C4C4C4]' />
            <p>07:16:22</p>
          </div>
          <div className='flex justify-between items-center h-[2.3rem] rounded-md text-nowrap px-2 gap-x-4 bg-[#229FAA] cursor-pointer'>
            <p>1H</p>
            <BiSolidDownArrow className='text-sm' />
          </div>
          <FaMagnifyingGlassPlus className=' cursor-pointer' />
          <FaMagnifyingGlassMinus className=' cursor-pointer' />
          <RiFocus3Fill className='text-[#FFAE34] text-lg' />
          <p>Fx</p>
          <p className='text-[#c4c4c4] cursor-pointer'>Indicators</p>
          <LuExpand className=' cursor-pointer' />
          <FaCamera className='text-xl cursor-pointer' />
        </div>
        <div className='flex-1 mt-3 flex items-start gap-x-4 border border-[#212121] rounded-xl p-2 overflow-y-auto'>

          <div className='overflow-y-auto'>

            <div className='mb-2 cursor-pointer'>
              <img src={Icon1} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon2} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon3} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon4} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon5} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon6} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon7} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon8} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon9} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon10} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon11} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon12} alt="" />
            </div>
            <div className='mb-2 cursor-pointer'>
              <img src={Icon13} alt="" />
            </div>

          </div>

          <div className='flex-1 flex flex-col h-[100%] w-[100%]'>
            <div className='flex gap-x-4 items-center overflow-x-auto'>
              <p className='text-[#c4c4c4] cursor-pointer'>1m</p>
              <p className='text-[#c4c4c4] cursor-pointer'>30m</p>
              <p className='text-[#c4c4c4] cursor-pointer'>1h</p>
              <img src={chartType} alt="" />
              <p className='text-[#27AE60]'><span className='text-[#c4c4c4] mr-2'>O</span>0.0.682</p>
              <p className='text-[#FF5757]'><span className='text-[#c4c4c4] mr-2'>H</span>0.0.682</p>
              <p className='text-[#FF5757]'><span className='text-[#c4c4c4] mr-2'>L</span>0.0.682</p>
              <p className='text-[#FF5757]'><span className='text-[#c4c4c4] mr-2'>C</span>0.0.682</p>

            </div>

            <div className='flex-1 flex flex-col'>

              <div className='flex-1 w-[100%] h-[100%] flex justify-between items-start'>
                <div className='flex justify-center items-center flex-1 mt-5'>
                  <img src={Candle} alt="" className='' />
                </div>
                <div>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>
                  <p className='text-[#C4C4C4] mb-1'>$0.6452</p>

                </div>
              </div>

              <div className='flex justify-between items-center gap-x-4'>
                <p className='text-[#C4C4C4] mb-1'>8:00</p>
                <p className='text-[#C4C4C4] mb-1'>9:00</p>
                <p className='text-[#C4C4C4] mb-1'>10:00</p>
                <p className='text-[#C4C4C4] mb-1'>11:00</p>
                <p className='text-[#C4C4C4] mb-1'>12:00</p>
                <p className='text-[#C4C4C4] mb-1'>13:00</p>
                <p className='text-[#C4C4C4] mb-1'>14:00</p>
                <p className='text-[#C4C4C4] mb-1'>15:00</p>
                <p className='text-[#C4C4C4] mb-1'>16:00</p>

              </div>

            </div>

          </div>


        </div>
      </div>



      <div className='w-full lg:mt-0 mt-5 lg:w-[20rem] h-full'>
        <div className='flex items-center'>
          <button onClick={() => { setType("buy") }} className={`w-[8rem] h-[2.5rem] rounded-md ${type === "buy" && "bg-[#01B28B]"}`}>Buy</button>
          <button onClick={() => { setType("sell") }} className={`w-[8rem] h-[2.5rem] rounded-md text-[#c4c4c4] ${type === "sell" && "bg-[#FF5757]"} `}>Sell</button>
        </div>


        <div className='mt-4'>
          <p className='text-[#c4c4c4] mb-2'>Order Type</p>
          <div className='w-[15rem] h-[2.5rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none flex justify-between items-center'>
            <p>Market</p>
            <BiSolidDownArrow />
          </div>
        </div>

        <div className='mt-2'>
          <p className='text-[#c4c4c4] mb-2'>Amount</p>
          <div className='w-[15rem] h-[2.5rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none flex justify-between items-center'>
            <CiCirclePlus className="text-[#FFAE34]" />
            <p>1.00</p>
            <CiCircleMinus className="text-[#FFAE34]" />
          </div>
        </div>

        <div className='mt-2'>
          <p className='text-[#c4c4c4] mb-2'>Leverage</p>
          <div className='w-[15rem] h-[2.5rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none flex justify-center items-center'>
            <p>1.00</p>
          </div>
        </div>


        <div className='mt-2'>
          <p className='text-[#c4c4c4] mb-2'>Margin Requirement</p>
          <div className='w-[15rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none flex justify-center items-center'>
            <p>1.00</p>
          </div>
        </div>


        <div className='mt-2'>
          <p className='text-[#c4c4c4] mb-2'>Take Profit</p>
          <div className='w-[15rem] h-[2.5rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none flex justify-center items-center'>
            <p>1.00</p>
          </div>
        </div>


        <div className='mt-2'>
          <p className='text-[#c4c4c4] mb-2'>Stop Loss</p>
          <div className='w-[15rem] h-[2.5rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none flex justify-center items-center'>
            <p>1.00</p>
          </div>
        </div>
        <button className={`w-[15rem] h-[2.5rem] rounded-md ${type === "buy" ? "bg-[#01B28B]" : "bg-[#FF5757]"} mt-4`}>Place {type === "buy" ? "Buy" : " Sell"}</button>
      </div>


      {
        tradeType == "my" && (

          <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
            <div className='w-[100%] h-10 absolute bottom-56 flex justify-center items-center'>
              <div className='w-[67%] bg-gradient-to-b from-[#051617] to-[#135960] rounded-lg p-5 '>

                <div className='flex justify-end items-end'><ImCross onClick={() => settradeType(null)} className='text-[#C4C4C4] cursor-pointer' /></div>

                <div className='flex items-center gap-x-6'>
                  <p>My Trades</p>
                  <p className='h-[2.3rem] bg-[#229FAA] rounded-md px-2 flex justify-center items-center'>Quick Links</p>
                  <p className='h-[2.3rem] bg-[#FFAE34] rounded-md px-2 flex justify-center items-center'>Forex & CFD</p>
                  <FaCalendarAlt className='text-xl cursor-pointer' />
                </div>

                <div className='mt-4 rounded-md bg-[#229faa] flex justify-between items-center px-3 py-2'>
                  <div className='flex items-center gap-x-6'>
                    <LuTimerReset />
                    <p>Open Orders</p>
                  </div>
                  <FaAngleUp onClick={() => setshowOpne(!showOpne)} />

                </div>
                {
                  showOpne && (
                    <div className='mt-4'>
                      <div className='p-5 rounded-md w-[100%] mb-4 overflow-x-auto'>
                        <div className='flex justify-between items-center'>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Entry</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Balance</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Equity</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Margin</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>TP</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>SL</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Clode Trade</p>
                        </div>
                        {
                          arr.map((i) => (
                            <div key={i} className='flex justify-between items-center mt-4'>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate'>0.82651</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#3391F6]'>$12</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#3391F6]'>$18</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#3391F6]'>$18</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#01B28B]'>0.64121</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#F22727]'>0.81</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate'>Pending</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }


                <div className='mt-4 rounded-md bg-[#229faa] flex justify-between items-center px-3 py-2'>
                  <div className='flex items-center gap-x-6'>
                    <LuTimerReset />
                    <p>Close Orders</p>
                  </div>
                  <FaAngleUp onClick={() => setshowClose(!showClose)} />

                </div>
                {
                  showClose && (
                    <div className='mt-4'>
                      <div className='p-5 rounded-md w-[100%] mb-4 overflow-x-auto'>
                        <div className='flex justify-between items-center'>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Entry</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Balance</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Equity</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Margin</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>TP</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>SL</p>
                          <p className='text-[#6E7975] flex-1 min-w-[5rem] mr-1'>Clode Trade</p>
                        </div>
                        {
                          arr.map((i) => (
                            <div key={i} className='flex justify-between items-center mt-4'>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate'>0.82651</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#3391F6]'>$12</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#3391F6]'>$18</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#3391F6]'>$18</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#01B28B]'>0.64121</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate text-[#F22727]'>0.81</p>
                              <p className=' flex-1 min-w-[5rem] mr-1 truncate'>Pending</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        )
      }


      {
        tradeType == "help" && (

          <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
            <div className='w-[100%] h-10 absolute bottom-[12rem] flex justify-center items-center'>
              <div className='w-[67%] bg-gradient-to-b from-[#051617] to-[#135960] rounded-lg p-5 '>

                <div className='flex justify-end items-end'><ImCross onClick={() => settradeType(null)} className='text-[#C4C4C4] cursor-pointer' /></div>

                <div className='flex items-start gap-x-[2rem] mt-4'>

                  <div>
                    <h1>Help Center</h1>
                    <p className='mt-8 text-sm w-[40%]'>Quick-Track to Trading Success: Find concise responses to frequently asked questions on security, account management, and trading. Learn insightful things to help you succeed on our platform and accelerate your trading career.</p>
                  </div>

                  <div>
                    <input type="text" name="" id="" placeholder='Search' className='w-[23rem] h-[2.3rem] bg-[#229FAA] outline-none rounded-md px-3 text-white placeholder:text-white' />
                    <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#229FAA] outline-none rounded-md px-3 text-white placeholder:text-white'>
                      <p className='text-sm'>How to start trading?</p>
                      <BiDownArrow />
                    </div>
                    <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#229FAA] outline-none rounded-md px-3 text-white placeholder:text-white'>
                      <p className='text-sm'>What is Verification process?</p>
                      <BiDownArrow />
                    </div>
                    <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#229FAA] outline-none rounded-md px-3 text-white placeholder:text-white'>
                      <p className='text-sm'>How to change my password?</p>
                      <BiDownArrow />
                    </div>
                    <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#229FAA] outline-none rounded-md px-3 text-white placeholder:text-white'>
                      <p className='text-sm'>How can I verify my account?</p>
                      <BiDownArrow />
                    </div>
                    <div className='w-[23rem] h-[2.3rem] mt-3 flex justify-between items-center bg-[#229FAA] outline-none rounded-md px-3 text-white placeholder:text-white'>
                      <p className='text-sm'>How to setup Two-factor authorization?</p>
                      <BiDownArrow />
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )
      }


      {
        tradeType == "stats" && (

          <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
            <div className='w-[100%] h-10 absolute bottom-[8rem] flex justify-center items-center'>
              <div className=' bg-gradient-to-b from-[#051617] to-[#135960] rounded-lg p-5 '>

                <div className='flex justify-end items-end'>
                  <ImCross onClick={() => settradeType(null)} className='text-[#C4C4C4] cursor-pointer' />
                </div>

                <div className='flex justify-start items-start gap-x-[10rem] mt-4 '>

                  <div className=''>
                    <h1>Trading Stat</h1>
                    <p className='mt-8 text-sm w-[20rem] leading-7'>Use a visually appealing dashboard to keep tabs on your trading activity. Analyze your previous transactions and apply the learnings to enhance the performance of your subsequent trades.</p>
                  </div>


                  <div className=''>
                    <div className='border-b border-[#113D53] flex gap-x-5 items-center overflow-x-auto'>

                      <div onClick={() => setCurrentIndex(0)} className={`${currentIndex == 0 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                        <p className={`${currentIndex != 0 && "text-[#6E7975]"} text-nowrap`}>Today</p>
                      </div>
                      <div onClick={() => setCurrentIndex(1)} className={`${currentIndex == 1 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                        <p className={`${currentIndex != 1 && "text-[#6E7975]"} text-nowrap`}>Yesterday</p>
                      </div>
                      <div onClick={() => setCurrentIndex(2)} className={`${currentIndex == 2 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                        <p className={`${currentIndex != 2 && "text-[#6E7975]"} text-nowrap`}>This Month</p>
                      </div>
                      <div onClick={() => setCurrentIndex(3)} className={`${currentIndex == 3 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                        <p className={`${currentIndex != 3 && "text-[#6E7975]"} text-nowrap`}>All Time</p>
                      </div>
                      <div onClick={() => setCurrentIndex(4)} className={`${currentIndex == 4 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                        <p className={`${currentIndex != 4 && "text-[#6E7975]"} text-nowrap`}>Choose Period</p>
                      </div>

                    </div>
                    <p className='my-3'>Account Summary</p>

                    <div className='flex items-start gap-x-6 mt-7'>
                      <div className='w-[14rem] h-[6rem] rounded-md bg-[#0B3639] p-2'>
                        <p className='text-[#c4c4c4] text-center'>Total Trade</p>
                        <p className='mt-3 text-center'>-----</p>
                      </div>
                      <div className='w-[14rem] h-[6rem] rounded-md bg-[#0B3639] p-2'>
                        <p className='text-[#c4c4c4] text-center'>Total Turn Over</p>
                        <p className='mt-3 text-center'>-----</p>
                      </div>
                      <div className='w-[14rem] h-[6rem] rounded-md bg-[#0B3639] p-2'>
                        <p className='text-[#c4c4c4] text-center'>Total Profit</p>
                        <p className='mt-3 text-center'>-----</p>
                      </div>
                      <div className='w-[14rem] h-[6rem] rounded-md bg-[#0B3639] p-2'>
                        <p className='text-[#c4c4c4] text-center'>Win Rate</p>
                        <p className='mt-3 text-center'>-----</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )
      }


    </div>
  )
}

export default UserHome