import React from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

const Ibo = () => {
  const data = [
    { name: 'Memberships', value: 33 },
    { name: 'Coded Bonuses', value: 14 },
    { name: 'Trade Copier', value: 53 },
  ];

  const COLORS = ['#114C8A', '#B04E4E', '#0C5B4A']; // Example colors - customize as needed

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${data[index].value + "%"}`}
      </text>
    );
  };

  return (
    <div className='bg-[#04080F] rounded-md p-5 w-full border border-[#229FAA0D]'>

      <div className='flex justify-between flex-wrap items-center'>
        <p className='text-white font-bold text-xl'>IBO PORTAL</p>
        <div className='flex justify-center items-enter gap-x-3 flex-wrap'>
          <button className={`w-[16rem] h-[2.5rem] mt-2 bg-[#229FAA0D] bg-opacity-20 rounded-md text-white`}>
            Your Current IBO Earning:
          </button>
          <button className={`w-[16rem] h-[2.5rem] mt-2 bg-[#229FAA0D] bg-opacity-20 rounded-md text-white`}>
            $500.50
          </button>
        </div>
      </div>

      <div className='flex mt-10 items-start flex-wrap'>
        <div className='w-1/2 pr-6'>
          <p className='text-white font-bold mb-4'>IBO Earnings Downline</p>
          <div className='bg-[#229FAA0D] rounded-md p-4'>
             <p className='text-white font-bold mb-2'>IBO Earnings</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value" >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  wrapperStyle={{ color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='w-1/2 pl-6'>
          <div className=''>
            <p className='text-white'>
              Use calculator to learn about compounding growth potential adding your IBO earnings to your
              trading/investment accounts on a regular basis!
            </p>

            <div className='mt-4'>
              <p className='text-white'>Amount in your trading account:</p>
              <input type="text" className='bg-[#229FAA33] rounded-md p-2 w-full mt-2 text-white' defaultValue={3000} />
            </div>

            <div className='mt-4'>
              <p className='text-white'>Amount you Add Monthly:</p>
              <input type="text" className='bg-[#229FAA33] rounded-md p-2 w-full mt-2 text-white' defaultValue={500} />
            </div>

            <div className='mt-4'>
              <p className='text-white'>Expected Percentage earned monthly:</p>
              <input type="text" className='bg-[#229FAA33] rounded-md p-2 w-full mt-2 text-white' defaultValue={12} />
            </div>

            <div className='mt-4'>
              <p className='text-white'>Duration Years:</p>
              <input type="text" className='bg-[#229FAA33] rounded-md p-2 w-full mt-2 text-white' defaultValue={5} />
            </div>

            <button className='bg-[#229FAA33] hover:bg-[#229FAA59] text-white font-bold py-2 px-4 rounded mt-4'>
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ibo;