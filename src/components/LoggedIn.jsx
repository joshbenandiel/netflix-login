import React from 'react'
import '../styles/LoggedIn.css'
import background from '../images/netflix-background.jpg'
import kidsImage from '../images/kids.png'
import userPic from '../images/josh.png'
import NetflixLogo from './NetflixLogo'


const userData = {
  _id: 1,
  img: userPic,
  first_name: 'Joshua',
  middle_name: 'Benandiel',
  last_name: 'Jacinto',
  email: 'joshjacinto22@gmail.com'
}
  
  

const LoggedIn = () => {
  return (
    <div className='main-container'>
      <NetflixLogo/>
      <div className="image-header">
        <img className='pe-5' src={kidsImage} alt='kids-picture' />
        <h1 className='text-white ps-5'>Hi!, {userData.first_name} {userData.last_name}!</h1>
      </div>
      <div className='d-flex w-100 justify-content-center mt-5'>
        <div className='logged-in-card'>
          <h3 className='text-white'>Registered Accounts</h3>
            <div className="user-card mt-4">
              <div className="d-flex">
                <div className="me-3">
                  <img className='user-picture' src={userData.img} alt='user-picture' />
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <p className='m-0 fs-5'>{userData.first_name} {userData.middle_name} {userData.last_name}</p>
                  <p className='m-0'>{userData.email}</p>      
                </div>
                <div className='user-id'>
                  <p className='fs-1'><span>#</span>1</p>
                </div>
              </div>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default LoggedIn
