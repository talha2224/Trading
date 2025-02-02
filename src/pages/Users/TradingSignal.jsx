import React, { useEffect, useRef, useState } from 'react'
import { BsCopy } from 'react-icons/bs';
import Chart from 'chart.js/auto'; // Import Chart.js

const trades = [
    { entry: 'John Deo', asset: 'GBP/YEN', action: 'Buy', price: '0.61327', tp1: '0.61327', tp2: '0.61327', tp4: '0.61327', sl: '0.61327' },
    { entry: 'Lim sam', asset: 'GBP/YEN', action: 'Sell', price: '0.61327', tp1: '0.61327', tp2: '0.61327', tp4: '0.61327', sl: '0.61327' },
    { entry: 'Jane Cooper', asset: 'GBP/YEN', action: 'Buy', price: '0.61327', tp1: '0.61327', tp2: '0.61327', tp4: '0.61327', sl: '0.61327' },
    { entry: 'Marvin McKinney', asset: 'GBP/YEN', action: 'Buy', price: '0.61327', tp1: '0.61327', tp2: '0.61327', tp4: '0.61327', sl: '0.61327' },
    { entry: 'Wade Warren', asset: 'GBP/YEN', action: 'Buy', price: '0.61327', tp1: '0.61327', tp2: '0.61327', tp4: '0.61327', sl: '0.61327' },
    { entry: 'Cody Fisher', asset: 'GBP/YEN', action: 'Buy', price: '0.61327', tp1: '0.61327', tp2: '0.61327', tp4: '0.61327', sl: '0.61327' },
];
const buttons = ["Current Trade Alert", "Closed Trade Alert", "Alert Settings"]
const time = ["Day", "Week", "Month", "Year"]
const TradingSignal = () => {
    const [alertType, setalertType] = useState(buttons[0])
    const [selectedTime, setselectedTime] = useState(time[0])
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const data = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                data: [350, 900, 400, 300, 450, 80, 750], // Example data - replace with your actual data
                borderColor: '#229FAA', // Line color
                backgroundColor: 'rgba(34, 159, 170, 0.25)', // Fill color with opacity
                borderWidth: 2, // Line width
                tension: 0.4, // Adjust line smoothness (0 = straight lines)
                pointRadius: 0, // Hide data points
                fill: true, // Fill under the line
            }]
        };

        const options = {
            scales: {
                x: {
                    grid: {
                        display: false, // Hide X grid lines
                    },
                    ticks: {
                        color: 'white', // X-axis label color
                    },
                },
                y: {
                    beginAtZero: true, // Start Y-axis at 0
                    max: 1000,       // Set your desired max Y-axis value
                    ticks: {
                        stepSize: 100, // Y-axis step size
                        color: 'white', // Y-axis label color
                        callback: function (value, index, values) {
                            return value; // Remove the 'k' or other suffixes
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)', // Customize grid line color and opacity
                        lineWidth: 1, // Adjust grid line width
                        borderDash: [3, 3], // Make grid lines dashed (optional)
                    },
                },
            },
            plugins: {
                legend: {
                    display: false, // Hide the legend
                },
            },
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false, // Allow chart aspect ratio to be changed
        };


        const myChart = new Chart(ctx, {
            type: 'line', // Line chart
            data: data,
            options: options,
        });

        return () => {
            myChart.destroy(); // Destroy the chart instance on unmount to prevent memory leaks
        };
    }, []);
    return (
        <div className="container mx-auto p-4">

            <div className='bg-[#04080F] p-5 rounded-md'>
                <div className='flex items-center gap-x-3 flex-wrap mb-4'>
                    {
                        buttons?.map((i) => (
                            <button onClick={() => { setalertType(i) }} className={`w-[14rem] h-[2.5rem] mt-2 ${alertType === i && "bg-[#229FAA0D] bg-opacity-20 rounded-md"}`}>{i}</button>
                        ))
                    }
                </div>
                <table className="min-w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-transparent">
                            <th className="px-4 py-2 text-left">Entry</th>
                            <th className="px-4 py-2 text-left">Asset</th>
                            <th className="px-4 py-2 text-left">Action</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">TP 1</th>
                            <th className="px-4 py-2 text-left">TP 2</th>
                            <th className="px-4 py-2 text-left">TP 4</th>
                            <th className="px-4 py-2 text-left">SL</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((trade, index) => (
                            <tr key={index} className={'bg-transparent'}> {/* Alternate row colors */}
                                <td className="px-4 py-2">{trade.entry}</td>
                                <td className="px-4 py-2">{trade.asset}</td>
                                <td className={`px-4 py-2 ${trade.action === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{trade.action}</td>
                                <td className="px-4 py-2">{trade.price}</td>
                                <td className="px-4 py-2">{trade.tp1}</td>
                                <td className="px-4 py-2">{trade.tp2}</td>
                                <td className="px-4 py-2">{trade.tp4}</td>
                                <td className="px-4 py-2">{trade.sl}</td>
                                <td className="px-4 py-2 flex items-center gap-x-2">
                                    <button className="text-blue-500 hover:text-blue-700" onClick={() => { console.log('Copy clicked for:', trade.entry); }}><BsCopy className="inline-block h-5 w-5" /></button>
                                    <p>Copy</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='mt-10'>
                <div className='flex items-center gap-x-3 flex-wrap mb-4'>
                    <p>🟢 Performance</p>
                    {
                        time?.map((i) => (
                            <button onClick={() => { setselectedTime(i) }} className={`w-[10rem] h-[2.5rem] mt-2 ${selectedTime === i && "bg-[#229FAA0D] bg-opacity-20 rounded-md"}`}>{i}</button>
                        ))
                    }
                </div>

                <div className='mt-10 bg-[#229FAA0D] bg-opacity-25 rounded-md p-5 md:w-[70%] flex justify-center items-center flex-col'>

                    <h1>Pips Gained</h1>

                    <div className='mt-10 w-full'>
                        {/* Add Chart Here  */}
                        <canvas ref={chartRef}></canvas>
                    </div>

                    <div className='flex justify-center items-enter gap-x-3 flex-wrap mt-6'>
                        <button className={`w-[16rem] h-[2.5rem] mt-2 bg-[#229FAA0D] bg-opacity-20 rounded-md`}>Total Pips Gained this week</button>
                        <button className={`w-[16rem] h-[2.5rem] mt-2 bg-[#229FAA0D] bg-opacity-20 rounded-md`}>2000 Pips</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TradingSignal