import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='header'>
        <i className="fa-solid fa-house" onClick={() => {navigate('/')}}></i>
        <h1>Dynamic DnD Form</h1>
    </div>
  )
}

export default Header