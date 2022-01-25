import React , { useState, useEffect }from 'react'
import '../styles/LoggedIn.css'
import kidsImage from '../images/kids.png'
import NetflixLogo from './NetflixLogo'
import { useNavigate } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';




  
  

const LoggedIn = ({user}) => {

  const [deleteIsClick, setDeleteIsCLick] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setContacts] = useState([])
  console.log(contacts)

  const axios = require('axios').default;

  const navigate = useNavigate()

  const deleteUser = async() => {
    setIsLoading(true)
    try {
      const path = `http://localhost:8080/api/contacts/${user._id}/delete`
      const result = await axios.delete(path)
      if(result) {
        setDeleteIsCLick(false)
        setIsDeleted(true)
        setIsLoading(false)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const getContactsData = async() => {
    try {
      const path = 'http://localhost:8080/api/contacts/list'
      const result = await axios.get(path)
      if(result.data.status === 'success'){
        console.log(result.data.contacts)
        setContacts(result.data.contacts)
        console.log(result.data.contacts)
      }
    } catch(err){
      console.log(err)
    }
  }

  

  
  return (
    <div className='main-container'>
      <NetflixLogo/>
      <div className='profile-container'>
        <div className='profile-wrapper'>
          <img className='user-picture-profile' src={`http://localhost:8080${user.avatar}`}  alt='profile'/>
          <div className="arrow-up"></div>
        </div>
        <div className='profile-drop-down-menu'>
          <button>
            <p>Update Account</p>
          </button>
          <button onClick={() => setDeleteIsCLick(true)}>
            <p>Delete Account</p>
          </button>
        </div>
      </div>
      <div className="image-header">
        <img className='pe-5' src={kidsImage} alt='kids-picture' />
        <h1 className='text-white ps-5'>Hi!, {user.first_name} {user.last_name}!</h1>
      </div>
      <div className='d-flex w-100 justify-content-center mt-5'>
        <div className='logged-in-card'>
          <h3 className='text-white'>Registered Accounts</h3>
            <div className="user-card mt-4">
              <div className="d-flex">
                <div className="me-3">
                  <img className='user-picture' src={`http://localhost:8080${user.avatar}`} alt='user-picture' />
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <p className='m-0 fs-5'>{user.first_name} {user.middle_name} {user.last_name}</p>
                  <p className='m-0'>{user.email}</p>      
                </div>
                <div className='user-id'>
                  <p className='fs-1'><span>#</span>1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {deleteIsClick && 
          (
          <>
            <div className='delete-container'/>
              <div className='delete-account-popup'>
                {isLoading && <LinearProgress className='mt-1'></LinearProgress>}
                <i onClick={() => setDeleteIsCLick(false)}className="fas fa-times fa-2x button-x"></i>
                <h3 className='p-4'>Do you want to delete this account?</h3>
                <div className='w-100 d-flex justify-content-end mb-3'>
                  <button onClick={() => setDeleteIsCLick(false)} className='btn btn-outline-info w-25 me-5' type='button'>NO</button>
                  <button onClick={deleteUser} className='btn btn-info text-white w-25 me-5' type='button'>YES</button>
                </div>
            </div>  
          </>
         )
        }
        {isDeleted &&
        (
          <div>
            <div className='delete-container'/>
            <div className='delete-is-success p-4'>
              <h3 className='p-3'>Successfully Deleted.</h3>
              <div className='d-flex button-container-delete'>
                <button onClick={() => {navigate('/signup')}}className='btn btn-outline-success'>REGISTER</button>
                <button onClick={() => {navigate('/')}}className='btn btn-success'>OK</button>
              </div>
            </div>
          </div>
        )
        }
       </div>
  )
}

export default LoggedIn
