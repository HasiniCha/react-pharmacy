import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='main-btn-container'>
        <p>Please select a mode to continue</p>
        <Link className='main-btn' to="/manual">
            <div>manual mode</div>
        </Link>
        <Link className='main-btn' to="/auto">
            <div >auto mode</div>
        </Link>
    </div>
  )
}

export default Home