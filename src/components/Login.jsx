import React, { useState, useEffect , useContext } from 'react'
import '../styles/Login.css'
import  { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import NetflixLogo from './NetflixLogo'
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie'


const Login = ({
  setUser, 
  setUpdateIsClick, 
  setChangeIsClick,
  setIsUpdated,
}) => {


  const axios = require('axios').default;
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  const [errorMsg, setErrorMsg] = useState('')
  const { setAuth } = useContext(AuthContext)



  const handleChange = (e) => {
    const {value, name} = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleResult = (result) => {
    setUser(result.data.result.user)
    setErrorMsg('')
    setIsLoading(false)
    Cookies.set('user', 'loginTrue')
    setAuth(true)
    navigate('/user')
    
  }


  useEffect(() => {
    return () => {};
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const path = 'https://netflixapinodejs.herokuapp.com/api/auth/login'
      const result = await axios.post(path, formValues)
      if(result.data.result.status === 'success'){
        handleResult(result)
      } else {
        setErrorMsg(result.data.result.msg)  
        setIsLoading(false)
      }

    } catch(err) {
      console.log(err)
    }
  }
  return (
    <>
    <div className='login-container'>
    <NetflixLogo/>
      <div className='w-100 d-flex justify-content-center align-items-center h-100'>
        <div className='sign-in-container text-white w-25'>
          {isLoading &&<LinearProgress className='mb-2'/>}
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input onChange={handleChange} value={formValues.email} name='email' type="email" className="form-control" id="email-address" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input onChange={handleChange} value={formValues.password} name='password' type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <p className='m-1' style={{color: 'red'}}>{errorMsg}</p>
            <button onClick={() => {
              setUpdateIsClick(false)
              setIsUpdated(false)
            }}className='btn btn-submit text-white btn-danger w-100 mt-5' type='submit'>     
                {isLoading ? <CircularProgress color="inherit" size='1em'/> : 'Sign in' }      
            </button>          
          </form>
          <Link onClick={() => {
            setUpdateIsClick(false)
            setChangeIsClick(false)
            }} to='/signup'>
            <button type='button' className='mt-5 btn btn-outline-danger'>Sign Up Now</button>
          </Link>
        </div>
      </div>
    </div>
    </>

  )
}

export default Login
