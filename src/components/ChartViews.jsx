import React from 'react'
import DotGraph from '../assets/chart1.png'
import Area1 from '../assets/area1.png'
import Chart from "react-apexcharts";


const options = {
    chart: {
        type: "scatter",
        height: 350,
        toolbar: {
            show: false,
        },
        background: "transparent", // Matches your theme
    },
    xaxis: {
        type: "numeric",
        labels: { show: false }, // Removes X-axis labels
        axisTicks: { show: false }, // Removes X-axis ticks
        axisBorder: { show: false }, // Removes X-axis border
    },
    yaxis: {
        labels: { show: false }, // Removes Y-axis labels
        axisTicks: { show: false }, // Removes Y-axis ticks
        axisBorder: { show: false }, // Removes Y-axis border
    },
    grid: {
        borderColor: "#ccc",
        strokeDashArray: 4,
    },
    markers: {
        size: 5,
        colors: ["#FF3D00"], // Red points
    },
};
const series = [
    {
        name: "Volume",
        data: Array.from({ length: 40 }, () => [
            Math.floor(Math.random() * 50), // Random X-axis values
            Math.floor(Math.random() * 100), // Random Y-axis values
        ]),
    },
];

const options2 = {
    chart: {
        type: "area",
        height: 350,
        background: "transparent",
        toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
        categories: [
            2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015
        ],
        labels: { style: { colors: "#fff" } },
    },
    yaxis: {
        labels: { style: { colors: "#fff" } },
        title: { text: "Number of Mentions", style: { color: "#fff" } },
    },
    grid: { borderColor: "#555" },
    legend: { labels: { colors: "#fff" } },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
        },
    },
    tooltip: {
        theme: "dark",
    },
};

const series2 = [
    { name: "iPhone", data: [1.8, 1.2, 1.4, 1.1, 2.0, 1.7, 1.4, 1.6, 1.5] },
    { name: "Samsung", data: [0.8, 0.6, 0.7, 0.6, 1.1, 0.9, 0.8, 0.9, 0.7] },
];


const ChartViews = () => {
    const arr = [1, 2, 3, 4,5,6]
    return (
        <div className='mt-[2.5rem] w-[100%]'>

            <div className='flex justify-between items-start gap-x-10 flex-wrap lg:flex-row flex-col'>

                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[#6E7975] flex-1'>Traders</p>
                        <p className='text-[#6E7975] flex-1'>Date Registered</p>
                        <p className='text-[#6E7975] flex-1'>Trades</p>
                        <p className='text-[#6E7975] flex-1'>Current Account</p>
                    </div>
                    {
                        arr.map((i) => (
                            <div key={i} className='flex justify-between items-center mt-4'>
                                <p className=' flex-1'>Cyan</p>
                                <p className=' flex-1'>20-8-202</p>
                                <p className=' flex-1'>100</p>
                                <p className=' flex-1'>$ 2000</p>
                            </div>
                        ))
                    }
                    <button className='bg-[#082425] w-[100%] h-[3rem] rounded-md mt-6'>View All</button>
                </div>

                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <h1>Trading</h1>
                    <h1 className='my-3 text-xl'>Graph Showing Trading Volume</h1>
                    <Chart options={options} series={series} type="scatter" height={250} width="100%" />
                </div>
            </div>


            <div className='flex justify-between items-center gap-x-10 mt-20 flex-wrap pb-10 lg:flex-row flex-col'>
                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <h1>Trading</h1>
                    <h1 className='my-3 text-xl'>Graph Showing Trading Volume</h1>
                    <Chart options={options2} series={series2} type="area" height={350} width="100%" />

                </div>
                <div className='flex-1 p-5 bg-[#0E262E] rounded-md w-[100%] mb-4'>
                    <h1>Trading</h1>
                    <h1 className='my-3 text-xl'>Graph Showing Trading Volume</h1>
                    <Chart options={options2} series={series2} type="area" height={350} width="100%" />
                </div>
            </div>
        </div>
    )
}

export default ChartViews