import React from 'react'

const TradeViews = ({currentIndex,setCurrentIndex}) => {
    return (
        <div className='mt-[1.5rem] border-b border-lightBlue w-[100%] flex gap-x-5 items-center overflow-x-auto'>

            <div onClick={() => setCurrentIndex(0)} className={`${currentIndex == 0 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 0 && "text-[#6E7975]"} text-nowrap`}>Order Management</p>
            </div>
            <div onClick={() => setCurrentIndex(1)} className={`${currentIndex == 1 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 1 && "text-[#6E7975]"} text-nowrap`}>Order Details Panel</p>
            </div>
            <div onClick={() => setCurrentIndex(2)} className={`${currentIndex == 2 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 2 && "text-[#6E7975]"} text-nowrap`}>Trade History</p>
            </div>
            <div onClick={() => setCurrentIndex(3)} className={`${currentIndex == 3 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 3 && "text-[#6E7975]"} text-nowrap`}>Trade Details Panel</p>
            </div>
            <div onClick={() => setCurrentIndex(4)} className={`${currentIndex == 4 && "border-b border-[#3391f6] "} pb-2 cursor-pointer`}>
                <p className={`${currentIndex != 4 && "text-[#6E7975]"} text-nowrap`}>Trading Tools</p>
            </div>

        </div>
    )
}

export default TradeViews