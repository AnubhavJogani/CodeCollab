import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 border-b border-primary'>
        <div className='flex items-center gap-2'>
            <img src={logo} alt="Logo" className='w-24 h-20' />
        </div>
        <div className='text-lg font-semibold'>
              <a href="https://github.com/AnubhavJogani" className='text-primary hover:text-white hover:text-2xl transition duration-300' target='_blank'>[ GitHub ]</a>
        </div>
    </nav>
  )
}

export default Navbar