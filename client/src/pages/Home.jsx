import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Models from '../components/Models'

const Home = () => {
const [showModel, setShowModel] = useState(false);
const navigate = useNavigate();

const handleCreateRoom = (displayName) => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`, { state: { displayName } });
}
  return (
    <div>
        <Navbar />
        <HeroSection setShowModel={setShowModel} showModel={showModel}/>
        <Footer />
        {showModel && <Models showModel = {setShowModel} setShowModel = {setShowModel} handleCreateRoom = {handleCreateRoom}/>}
    </div>
  )
}

export default Home