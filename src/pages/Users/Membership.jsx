import React from 'react';
import { Link } from 'react-router-dom';

const Membership = () => {

    return (
        <div className='bg-[#04080F] rounded-md p-5 w-full border border-[#229FAA0D]'>

            <div className='flex justify-between flex-wrap items-center'>
                <p className='text-white font-bold text-xl'>Membership</p>
                <button className={`w-[16rem] h-[2.5rem] mt-2 bg-[#229FAA0D] bg-opacity-20 rounded-md text-white`}>View earning Calculator</button>
            </div>


            <div className='flex items-start gap-x-5 justify-center flex-wrap mt-10'>

                <div className='min-w-[20rem] p-5 rounded-md mt-2 bg-[#229FAA0D] bg-opacity-25 flex justify-center items-center flex-col'>
                    <p>Current Membership Plan</p>
                    <p className='mt-2 text-sm text-center'>Become a member of the Nexus community and activate <br /> the trading platform and receive full signal package</p>
                    <p className='mt-2'>Cost - $29.99 per month will be deducted from your wallet</p>
                    <Link to={"/user/membership/calculate"}><button className='bg-[#135960] px-4 py-2 rounded-md mt-5'>Join Membership</button></Link>
                </div>

                <div className='min-w-[20rem] p-5 rounded-md mt-2 bg-[#229FAA0D] bg-opacity-25 flex justify-center items-center flex-col'>
                    <p>IBO Program</p>
                    <p className='mt-2 text-sm text-center'>IBO is an independent business owner which alllows users to share <br /> NEXUS90 System with others and earn rewards that may be used <br /> for funding trading account </p>
                    <p className='mt-2'>Cost - $29.99 per month will be deducted from your wallet</p>
                    <button className='bg-[#135960] px-4 py-2 rounded-md mt-5'>Share To Earn</button>
                </div>

            </div>

        </div>
    );
};

export default Membership;