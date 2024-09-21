
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
      </Route>


      <Route path='/admin/login' element={<LoginPage />} />
      <Route path='/admim/register' element={<RegisterPage />} />
      <Route path='/admin/home' element={<HomePage />} />
    </Routes>
  )
}

export default App
