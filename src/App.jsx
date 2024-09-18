
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Admin/LoginPage'
import RegisterPage from './pages/Admin/RegisterPage'
import HomePage from './pages/Admin/HomePage'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/admin/home' element={<HomePage/>}/>
    </Routes>
  )
}

export default App
