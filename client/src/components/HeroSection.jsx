import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const HeroSection = ({ setShowModel , showModel}) => {
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = () => {
        if (!roomCode.trim()) { 
            toast.error("Please enter a room code");
            return;
        }
        else {
            navigate(`/room/${roomCode}`, { state: { roomCode } });
        }
    }
    return (
        <main className='flex flex-col items-center justify-center h-screen text-primary'>
            <h1 className='text-2xl md:text-4xl xl:text-6xl font-bold mb-4'>Welcome to CodeCollab</h1>
            <p className='text-sm lg:text-md xl:text-xl mb-8 text-white'>-- Collaborate and code in real-time with your team --</p>
            <button onClick ={() => {setShowModel(!showModel)}} className='bg-white text-black text-sm lg:text-md px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300'>
                Start New Session 
            </button>
            <div className='flex flex-col md:flex-row gap-6 items-center mt-10'>
                <div className='text-lg self-center'>Join with Room code:</div>
                <input type="text" placeholder='Enter Room Code' className='border-b border-primary px-4 py-2 focus:outline-hidden focus:border-green-600' value={roomCode} onChange={(e) => setRoomCode(e.target.value)}/>
                <button className='bg-primary text-black text-md px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300' onClick={handleJoinRoom}>Join</button>
            </div>
            <div className='flex flex-col md:flex-row items-center mt-10 lg:mt-30 p-4 gap-10 lg:gap-30 text-white'>
                <p>🚀 Instant Collaboration</p>
                <p>🔒 Private Links</p>
                <p>🎯 Syntex Highlighting</p>
                <p>💡 No Setup Required</p>
            </div>
            <div>
            </div>
            <ToastContainer />
        </main>
    )
}

export default HeroSection