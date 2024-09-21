import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({title,link}) => {
  const nav = useNavigate()
  return (
    <div className='flex justify-between items-center h-[10vh] px-5'>
      <h1 className='text-base md:text-3xl font-semibold'>LOGO</h1>
      <button onClick={()=>nav(link)} className='bg-[#135960] h-[2.5rem] w-[8rem] rounded-md'>{title}</button>
    </div>
  )
}

export default Navbar