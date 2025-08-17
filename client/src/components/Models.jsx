import React from 'react'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Models = ({ showModel, setShowModel, handleCreateRoom, type = "StartNewSession", setType }) => {
    const [displayName, setDisplayName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        window.scrollTo({ top: 0, behavior: "smooth" });
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleCreateNewRoom = (e) => {
        e.preventDefault();
        if (!displayName.trim()) {
            toast.error("Please enter a display name");
            return;
        }
        handleCreateRoom(displayName);
        setShowModel(false);
    }

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (!roomCode.trim()) {
            toast.error("Please enter a room code");
            return;
        }
        if (!displayName.trim()) {
            toast.error("Please enter a display name");
            return;
        }
        else {
            navigate(`/room/${roomCode}`, { state: { roomCode, displayName} });
            setShowModel(false);
        }
    }

    const changeModelType = (newType) => {
        if (newType === "JoinRoom") {
            setDisplayName('');
        } else {
            setRoomCode('');
        }
        setType(newType);
    }

    return (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-xs" onClick={() => setShowModel(false)}>
            <div className="rounded-xl shadow-lg bg-black border-2 border-green-600 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <div className='flex w-full justify-end text-primary text-2xl absolute p-4 cursor-pointer' onClick={() => setShowModel(false)}>X</div>
                {type === "JoinRoom" ? (<div className="p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-primary">Join Room</h1>
                        <div className='flex flex-row gap-2 items-center center justify-center mt-2'>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have a room link?
                            </p>
                            <p className="text-green-600 decoration-2 hover:underline font-medium cursor-pointer" onClick={() => changeModelType("StartNewSession")}>
                                Create Room
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleJoinRoom}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label for="name" className="block text-sm font-bold ml-1 mb-2 text-primary">Enter Room Code</label>
                                    <div className="relative">
                                        <input type="text" name="name" className="py-3 px-4 block w-full border-b-2 border-primary text-sm shadow-sm text-green-600 focus:outline-hidden"
                                            value={roomCode} onChange={(e) => setRoomCode(e.target.value)}></input>
                                    </div>
                                </div>
                                <div>
                                    <label for="name" className="block text-sm font-bold ml-1 mb-2 text-primary">Enter Display Name</label>
                                    <div className="relative">
                                        <input type="text" name="name" className="py-3 px-4 block w-full border-b-2 border-primary text-sm shadow-sm text-green-600 focus:outline-hidden"
                                            value={displayName} onChange={(e) => setDisplayName(e.target.value)}></input>
                                    </div>
                                </div>
                                <button type="submit" className="py-3 px-4 justify-center items-center rounded-md font-semibold bg-white text-black hover:bg-green-600 text-sm">Start Coding</button>
                            </div>
                        </form>
                    </div>
                </div>) : (<div className="p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-primary">Create Room</h1>
                        <div className='flex flex-row gap-2 items-center center justify-center mt-2'>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Have a room link?
                            </p>
                            <p className="text-green-600 decoration-2 hover:underline font-medium cursor-pointer" onClick={() => changeModelType("JoinRoom")}>
                                Join here
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleCreateNewRoom}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label for="name" className="block text-sm font-bold ml-1 mb-2 text-primary">Enter Display Name</label>
                                    <div className="relative">
                                        <input type="text" name="name" className="py-3 px-4 block w-full border-b-2 border-primary text-sm shadow-sm text-green-600 focus:outline-hidden"
                                            value={displayName} onChange={(e) => setDisplayName(e.target.value)}></input>
                                    </div>
                                </div>
                                <button type="submit" className="py-3 px-4 justify-center items-center rounded-md font-semibold bg-white text-black hover:bg-green-600 text-sm">Start Coding</button>
                            </div>
                        </form>
                    </div>
                </div>)}
            </div>
            <ToastContainer />
        </div>
    )
}

export default Models