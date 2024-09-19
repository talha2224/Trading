import React, { useState } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminViews from '../../components/AdminViews'
import Card from '../../components/Card'
import ChartViews from '../../components/ChartViews'
import UserListing from '../../components/UserListing'
import TradersManagement from '../../components/TradersManagement'
import Assest from '../../components/Assest'
import TradeViews from '../../components/TradeViews'
import OrderManagement from '../../components/OrderManagement'
import Tools from '../../components/Tools'
import Reports from '../../components/Reports'
import SettingViews from '../../components/SettingViews'
import General from '../../components/Setting/General'
import { Parameters } from '../../components/Setting/Parameters'
import { Risk } from '../../components/Setting/Risk'
import Integration from '../../components/Setting/Integration'
import User from '../../components/Setting/User'
import Compaliance from '../../components/Setting/Compaliance'
import Notification from '../../components/Setting/Notification'
import Backup from '../../components/Setting/Backup'

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTrade, setcurrentTrade] = useState(0)
  const [currentSettings, setCurrentSettings] = useState(0)

  return (

    <div className='w-screen h-screen px-5'>
      <AdminNav />
      <AdminViews setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
      {currentIndex == 4 && <TradeViews setCurrentIndex={setcurrentTrade} currentIndex={currentTrade} />}
      {currentIndex == 6 && <SettingViews setCurrentIndex={setCurrentSettings} currentIndex={currentSettings} />}
      {currentIndex == 0 && <Card />}
      {currentIndex == 0 && <ChartViews />}
      {currentIndex == 1 && <UserListing />}
      {currentIndex === 2 && <TradersManagement />}
      {currentIndex === 3 && <Assest />}
      {currentIndex === 4 && currentTrade !== 4 && <OrderManagement />}
      {currentIndex === 4 && currentTrade === 4 && <Tools />}
      {currentIndex === 5 && <Reports />}
      {currentIndex == 6 && currentSettings === 0 && <General/>}
      {currentIndex == 6 && currentSettings === 1 && <Parameters/>}
      {currentIndex == 6 && currentSettings === 2 && <Risk/>}
      {currentIndex == 6 && currentSettings === 3 && <Integration/>}
      {currentIndex == 6 && currentSettings === 4 && <User/>}
      {currentIndex == 6 && currentSettings === 5 && <Compaliance/>}
      {currentIndex == 6 && currentSettings === 6 && <Notification/>}
      {currentIndex == 6 && currentSettings === 7 && <Backup/>}


    </div>
  )
}

export default HomePage