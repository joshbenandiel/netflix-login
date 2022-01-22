import React from 'react'
import Netflix from '../images/Netflix-Logo.png'
import '../styles/Login.css'
import { Link } from 'react-router-dom'

const NetflixLogo = () => {
  return (
    <Link to='/'>
      <img className='netflix-logo' src={Netflix} alt='netflix-logo' />
    </Link> 
  )
}

export default NetflixLogo
