import React from 'react';
import { Link } from 'react-router-dom';

const Membership = () => {
  const tableData = [
    { initialDeposit: '$0,000', additionalDeposit: '$0,000', regularity: '-----', expectedReturn: '%10', duration: '-/-/- to -/-/-' },
    { initialDeposit: '$0,000', additionalDeposit: '$0,000', regularity: '-----', expectedReturn: '%10', duration: '401 x 511 - to -/-/-' },
    { initialDeposit: '$0,000', additionalDeposit: '$0,000', regularity: '-----', expectedReturn: '%10', duration: '-/-/- to -/-/-' },
    { initialDeposit: '$0,000', additionalDeposit: '$0,000', regularity: '-----', expectedReturn: '%10', duration: '-/-/- to -/-/-' },
    { initialDeposit: '$0,000', additionalDeposit: '$0,000', regularity: '-----', expectedReturn: '%10', duration: '-/-/- to -/-/-' },
    { initialDeposit: '$0,000', additionalDeposit: '$0,000', regularity: '-----', expectedReturn: '%10', duration: '-/-/- to -/-/-' },
    { initialDeposit: '$0,000', additionalDeposit: '$0,000', regularity: '-----', expectedReturn: '%10', duration: '-/-/- to -/-/-' },
    { initialDeposit: '$0,000', additionalDeposit: '$0,000', regularity: '-----', expectedReturn: '%10', duration: '-/-/- to -/-/-' },
  ];

  return (
    <div className='bg-[#04080F] rounded-md p-5 w-full border border-[#229FAA0D]'>
      <div className='flex justify-between flex-wrap items-center'>
        <div className='flex items-center gap-x-3'>
          <Link to={"/user/membership"}>
            <button className='bg-[#135960] px-4 py-2 rounded-md text-white'>Go Back</button> {/* Added text color */}
          </Link>
          <p className='text-white text-xl'>Calculator</p>
        </div>
        <Link to={"/user/membership/video"}>
          <button className='bg-[#135960] px-4 py-2 rounded-md text-white'>Watch Video</button> {/* Added text color */}
        </Link>
      </div>

      <div className='bg-[#229FAA0D] rounded-md p-5 mt-10 overflow-x-auto'> {/* Added overflow for horizontal scrolling */}
        <table className='w-full table-auto border-collapse text-white'> {/* Added text color to table */}
          <thead>
            <tr className=''> {/* Added header background color */}
              <th className='text-left px-4 py-2'>Initial Deposit</th>
              <th className='text-left px-4 py-2'>Additional Deposit</th>
              <th className='text-left px-4 py-2'>Regularity of Deposits</th>
              <th className='text-left px-4 py-2'>% Expected to Earn</th>
              <th className='text-left px-4 py-2'>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}> {/* Conditional row background */}
                <td className='px-4 py-2'>{row.initialDeposit}</td>
                <td className='px-4 py-2'>{row.additionalDeposit}</td>
                <td className='px-4 py-2'>{row.regularity}</td>
                <td className='px-4 py-2'>{row.expectedReturn}</td>
                <td className='px-4 py-2'>{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Membership;