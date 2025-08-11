import React from 'react'
import { ToastContainer, toast } from 'react-toastify' 

const Footer = () => {
    return (
        <footer className='flex flex-col md:flex-row  items-center justify-around gap-10 md:gap-0 p-4 border-t text-white border-primary'>
            <p className='text-sm'>© 2025 CodeCollab. All rights reserved.</p>
            <p className='text-sm'>Made with ❤️ by Anubhav Jogani</p>

            <div className='flex flex-row gap-4'>
                <button className='bg-primary text-black text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300'
                onClick={() => toast.info("Feedback form coming soon!")}>
                    Feedback </button>
                <button className='bg-primary text-black text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300'
                onClick={() => toast.info("Contact form coming soon!")}>
                    Contact me </button>
            </div>
        </footer>
    )
}

export default Footer