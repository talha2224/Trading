import React from 'react'

const SettingViews = ({ currentIndex, setCurrentIndex }) => {
    return (
        <div className='mt-[1.5rem] border-b border-lightBlue w-[100%] flex gap-x-5 items-center overflow-x-auto'>

            <div onClick={() => setCurrentIndex(0)} className={`${currentIndex == 0 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 0 && "text-[#6E7975]"} text-nowrap`}>General Setting</p>
            </div>
            <div onClick={() => setCurrentIndex(1)} className={`${currentIndex == 1 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 1 && "text-[#6E7975]"} text-nowrap`}>Trading Parameters</p>
            </div>
            <div onClick={() => setCurrentIndex(2)} className={`${currentIndex == 2 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 2 && "text-[#6E7975]"} text-nowrap`}>Risk Management</p>
            </div>
            <div onClick={() => setCurrentIndex(3)} className={`${currentIndex == 3 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 3 && "text-[#6E7975]"} text-nowrap`}>Integration Setting</p>
            </div>
            <div onClick={() => setCurrentIndex(4)} className={`${currentIndex == 4 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 4 && "text-[#6E7975]"} text-nowrap`}>User Management</p>
            </div>

            <div onClick={() => setCurrentIndex(5)} className={`${currentIndex == 5 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 5 && "text-[#6E7975]"} text-nowrap`}>Compaliance & Security</p>
            </div>
            <div onClick={() => setCurrentIndex(6)} className={`${currentIndex == 6 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 6 && "text-[#6E7975]"} text-nowrap`}>Notification Setting</p>
            </div>
            <div onClick={() => setCurrentIndex(7)} className={`${currentIndex == 7 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 7 && "text-[#6E7975]"} text-nowrap`}>Backup & Recovery</p>
            </div>

        </div>
    )
}

export default SettingViews