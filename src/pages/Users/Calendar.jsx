import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { GoAlertFill } from "react-icons/go";

const Calendar = () => {
    const calendarEvents = [
        { date: 'mm/dd/yyyy', event: 'GBP Imports', impact: 'Low', speech: '54.3' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'High', speech: '-0.3' },
        { date: 'mm/dd/yyyy', event: 'GBP CPI', impact: 'High', speech: '-0.3' },
        { date: 'mm/dd/yyyy', event: 'GBP Monthly CPI', impact: 'High', speech: '-0.3' },
        { date: 'mm/dd/yyyy', event: 'GBP Retail Sales', impact: 'High', speech: '0.3' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'High', speech: '-0.3' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'Medium', speech: '23' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'Medium', speech: '23' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'Medium', speech: '23' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'Medium', speech: '23' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'Medium', speech: '23' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'Medium', speech: '23' },
    ];

    return (
        <div className='flex justify-between items-start gap-x-3 flex-wrap p-5 rounded-md bg-[#04080F] z-50'>
            <div className='flex-1'>
                <p className='text-white font-bold text-xl'>Calendar</p> {/* Added some basic styling */}

                <div className='mt-10 bg-[#229FAA0D] p-5 rounded-md overflow-x-auto'> {/* Added overflow for horizontal scrolling */}
                    <table className='w-full table-auto border-collapse'>
                        <thead>
                            <tr className='text-white'> {/* Header text color */}
                                <th className='text-left px-4 py-2'>Date</th>
                                <th className='text-left px-4 py-2'>Event</th>
                                <th className='text-left px-4 py-2'>Impact</th>
                                <th className='text-left px-4 py-2'>Speech</th>
                                <th className='text-left px-4 py-2'>Action</th> {/* Added Action column */}
                            </tr>
                        </thead>
                        <tbody>
                            {calendarEvents.map((event, index) => (
                                <tr key={index} > {/* Alternate row backgrounds */}
                                    <td className='px-4 py-2 text-white'>{event.date}</td>
                                    <td className='px-4 py-2 text-white'>{event.event}</td>
                                    <td className={`px-4 py-2 ${event.impact === 'High' ? 'text-red-500' : event.impact === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{event.impact}</td>
                                    <td className='px-4 py-2 text-white'>{event.speech}</td>
                                    <td className='px-4 py-2 text-white flex items-center gap-x-3'>
                                        <GoAlertFill />
                                        <p>Alert Me</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-[35rem] min-w-[35rem] bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md mt-[4.2rem]'>
                <p>My Posts</p>
                {
                    [1, 2,].map((i, index) => (
                        <div key={index} className='bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md mt-5'>
                            <div className='flex gap-x-5 items-start mt-5 lg:flex-nowrap flex-wrap'>
                                <div>
                                    <img className='min-h-[5rem] min-w-[5rem] rounded-md' src="https://media.istockphoto.com/id/1465618017/photo/businessmen-investor-think-before-buying-stock-market-investment-using-smartphone-to-analyze.jpg?s=612x612&w=0&k=20&c=YNEkfoME1jbz6FUJImxCQtaGZZntrf7u-Byxmgk4pOY=" alt="" />
                                </div>
                                <div className=''>
                                    <p>Forex Trading</p>
                                    <p className='mt-1 text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quam incidunt hic vero dicta excepturi.</p>
                                </div>
                                {/* <button className='bg-[#135960] px-4 py-3 rounded-md mt-2'>Post</button> */}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Calendar;