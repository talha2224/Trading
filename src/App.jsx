
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Admin/LoginPage'
import RegisterPage from './pages/Admin/RegisterPage'
import HomePage from './pages/Admin/HomePage'
import UserRegisterPage from './pages/Users/RegisterPage'
import UserLoginPage from './pages/Users/LoginPage'
import ForgotPage from './pages/Users/ForgotPage'
import UserHome from './pages/Users/UserHome'
import Layout from './components/Users/Layout'
import { useState } from 'react'
import DepositPage from './pages/Users/DepositPage'
import Settings from './pages/Users/Settings'
import TradingSignal from './pages/Users/TradingSignal'
import Community from './pages/Users/Community'
import Calendar from './pages/Users/Calendar'
import Ibo from './pages/Users/Ibo'
import Membership from './pages/Users/Membership'
import Calculate from './pages/Users/Calculate'
import Video from './pages/Users/Video'

function App() {

  const [openNav, setOpenNav] = useState(true)
  const [tradeType, settradeType] = useState(null)
  return (
    <Routes>

      <Route path='/' element={<UserLoginPage />} />
      <Route path='/register' element={<UserRegisterPage />} />
      <Route path='/forgot' element={<ForgotPage />} />
      <Route path='/user/' element={<Layout setOpenNav={setOpenNav} openNav={openNav} tradeType={tradeType} settradeType={settradeType}/>} >
        <Route path='home' element={<UserHome tradeType={tradeType} settradeType={settradeType}/>} />
        <Route path='trading/signal' element={<TradingSignal/>}/>
        <Route path='community' element={<Community/>}/>
        <Route path='calendar' element={<Calendar/>}/>
        <Route path='ibo' element={<Ibo/>}/>
        <Route path='calendar' element={<Calendar/>}/>
        <Route path='membership' element={<Membership/>}/>
        <Route path='membership/calculate' element={<Calculate/>}/>
        <Route path='membership/video' element={<Video/>}/>
      </Route>
      <Route path='/deposit' element={<DepositPage />} />
      <Route path='/setting' element={<Settings/>} />


      <Route path='/admin/login' element={<LoginPage />} />
      <Route path='/admim/register' element={<RegisterPage />} />
      <Route path='/admin/home' element={<HomePage />} />
    </Routes>
  )
}

export default App
