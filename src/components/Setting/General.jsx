import React from 'react'

const General = () => {
    return (
        <div className='mt-[2rem]'>
            <h1 className='text-xl'>Platform Configuration</h1>
            <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
                <div>
                    <p>Platform Name</p>
                    <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' />
                </div>
                <div>
                    <p>Platform Logo</p>
                    <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Upload' />
                </div>

            </div>
            <h1 className='text-xl mt-10'>Localization</h1>
            <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
                <div>
                    <p>Language Settings</p>
                    <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='Language Settings' />
                </div>
                <div>
                    <p>Time Zone Configuration</p>
                    <input type="text" name="" id="" className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' placeholder='All Time Zone' />
                </div>

            </div>

            <button className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960]'>Save</button>
        </div>
    )
}

export default General