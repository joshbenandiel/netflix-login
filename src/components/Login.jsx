import React, { useState } from 'react'
import background from '../images/netflix-background.jpg'
import '../styles/Login.css'
import  { Link } from 'react-router-dom'
import NetflixLogo from './NetflixLogo'


const Login = ({contacts}) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    const {value, name} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  return (
    <>
    <div className='login-container'>
    <NetflixLogo/>
      <div className='w-100 d-flex justify-content-center align-items-center h-100'>
        <div className='sign-in-container text-white w-25'>
          <h1>Sign In</h1>
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input onChange={handleChange} value={formData.email} name='email' type="email" className="form-control" id="email-address" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input onChange={handleChange} value={formData.password} name='password' type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <Link to='/user'>
              <button className='btn btn-submit text-white btn-danger w-100 mt-5'>Sign In</button>
            </Link>
          </form>
          <Link to='/signup'>
            <button type='button' className='mt-5'>Sign Up Now</button>
          </Link>
        </div>
      </div>
    </div>
    </>

  )
}

export default Login
