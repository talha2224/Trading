import React, { useState } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminViews from '../../components/AdminViews'
import Card from '../../components/Card'
import ChartViews from '../../components/ChartViews'
import UserListing from '../../components/UserListing'
import TradersManagement from '../../components/TradersManagement'
import Assest from '../../components/Assest'

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (

    <div className='w-screen h-screen px-5'>
        <AdminNav/>
        <AdminViews setCurrentIndex={setCurrentIndex} currentIndex={currentIndex}/>
        {currentIndex == 0 && <Card/>}
        {currentIndex == 0 && <ChartViews/>}
        {currentIndex == 1 && <UserListing/>}
        {currentIndex===2 && <TradersManagement/>}
        {currentIndex===3 && <Assest/>}
    </div>
  )
}

export default HomePage