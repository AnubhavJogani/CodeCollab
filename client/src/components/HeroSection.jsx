import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const HeroSection = ({ setShowModel, showModel, type, setType }) => {
    const [roomCode, setRoomCode] = useState({ roomCode: '', displayName: '' });
    const [showLocalModel, setShowLocalModel] = useState(false);
    const navigate = useNavigate();

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (!roomCode.roomCode.trim()) {
            toast.error("Please enter a room code");
            return;
        }
        if (!roomCode.displayName.trim()) {
            toast.error("Please enter a display name");
            return;
        }
        navigate(`/room/${roomCode.roomCode}`, { state: { roomCode: roomCode.roomCode, displayName: roomCode.displayName } });
    }
    return (
        <main className='flex flex-col items-center justify-center h-screen text-primary'>
            <h1 className='text-2xl md:text-4xl xl:text-6xl font-bold mb-4'>Welcome to CodeCollab</h1>
            <p className='text-sm lg:text-md xl:text-xl mb-8 text-white'>-- Collaborate and code in real-time with your team --</p>
            <button onClick={() => { setType("StartNewSession"), setShowModel(!showModel) }} className='bg-white text-black text-sm lg:text-md px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300'>
                Start New Session
            </button>
            <div className='flex flex-col md:flex-row gap-6 items-center mt-10'>
                <div className='text-lg self-center'>Join with Room code:</div>
                <input type="text" placeholder='Enter Room Code' className='border-b border-primary px-4 py-2 focus:outline-hidden focus:border-green-600' value={roomCode.roomCode} onChange={(e) => setRoomCode({...roomCode, roomCode: e.target.value})} />
                <button className='bg-primary text-black text-md px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300' onClick={() => { setShowLocalModel(true) }}>Join</button>
            </div>
            <div className='flex flex-col md:flex-row items-center mt-10 lg:mt-30 p-4 gap-10 lg:gap-30 text-white'>
                <p>🚀 Instant Collaboration</p>
                <p>🔒 Private Links</p>
                <p>🎯 Syntex Highlighting</p>
                <p>💡 No Setup Required</p>
            </div>
            {showLocalModel && (<div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-xs" onClick={() => setShowLocalModel(false)}>
                <div className="rounded-xl shadow-lg bg-black border-2 border-green-600 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                    <div className='flex w-full justify-end text-primary text-2xl absolute p-4 cursor-pointer' onClick={() => setShowLocalModel(false)}>X</div>
                    <div className="p-7">
                        <div className="mt-5">
                            <form onSubmit={handleJoinRoom}>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label for="roomCode" className="block text-sm font-bold ml-1 mb-2 text-primary">Enter Room Code</label>
                                        <div className="relative">
                                            <input type="text" name="roomCode" className="py-3 px-4 block w-full border-b-2 border-primary text-sm shadow-sm text-green-600 focus:outline-hidden"
                                                value={roomCode.roomCode} onChange={(e) => setRoomCode({...roomCode, roomCode: e.target.value})}></input>
                                        </div>
                                    </div>
                                    <div>
                                        <label for="name" className="block text-sm font-bold ml-1 mb-2 text-primary">Enter Display Name</label>
                                        <div className="relative">
                                            <input type="text" name="name" className="py-3 px-4 block w-full border-b-2 border-primary text-sm shadow-sm text-green-600 focus:outline-hidden"
                                                value={roomCode.displayName} onChange={(e) => setRoomCode({...roomCode, displayName: e.target.value})}></input>
                                        </div>
                                    </div>
                                    <button type="submit" className="py-3 px-4 justify-center items-center rounded-md font-semibold bg-white text-black hover:bg-green-600 text-sm">Start Coding</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>)}
            <ToastContainer />
        </main>
    )
}

export default HeroSection