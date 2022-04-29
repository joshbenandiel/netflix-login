import React, { useState, useEffect, useCallback } from 'react'
import '../styles/SignUp.css'
import axios from 'axios'
import NetflixLogo from './NetflixLogo'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useLocation } from "react-router-dom"
import _ from 'lodash'


const Signup = ({
  updateStatus, 
  setUpdate, 
  selectedUser, 
  changeIsClick,
  setChangeIsClick,
  setIsUpdated
}) => {

  const [formData, setFormData] = useState({
    _id: '',
    first_name: _.capitalize(''),
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    contact_number: '',
    avatar: ''
  })



  const location = useLocation()



  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [isExists, setIsExists] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [value, setValue] = useState()
  
  const reset = () => {
    setValue('')
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formData))
    setIsSubmit(true)
  }

  const createUser =  useCallback(async() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
      setIsLoading(true)
      try {
        if (location.pathname === '/user') {
          const path = `https://netflixapinodejs.herokuapp.com/api/contacts/${selectedUser._id}/update`
          const result = await axios.put(path, formData)
          if(result.data.status === 'success'){
            setIsExists('')
            setIsLoading(false)
            setImage('')
            setFormData({
              first_name: '',
              middle_name: '',
              last_name: '',
              email: '',
              password: '',
              contact_number: '',
              avatar: ''
            })
            reset()
            setIsSubmit(false)
            setIsUpdated(true)
            console.log('successfully updated')
          }
        } else {
          const path = 'https://netflixapinodejs.herokuapp.com/api/contacts/create'  
          const result = await axios.post(path, formData)
          if(result.data.status === 'success'){
            setIsExists('')
            setIsRegistered(true)
            setIsLoading(false)
            setImage('')
            setFormData({
              first_name: '',
              middle_name: '',
              last_name: '',
              email: '',
              password: '',
              contact_number: '',
              avatar: ''
            })
            reset()
          } 
        }
      } catch(error){
        console.log(error)
        setIsExists(error.response.data.msg)
        setIsLoading(false)
        setIsSubmit(false)
      }
    } else {
      setIsSubmit(false)
    } 
  },[isSubmit, formData, formErrors, location.pathname, selectedUser._id, setIsUpdated])

  useEffect(() => {
    createUser()
  },[createUser])

  useEffect(() => {
    if(updateStatus === true) {
      setFormData(selectedUser)
      return;
    }
  }, [updateStatus, selectedUser])


  const validate = (values) => {
    const errors = {}
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!values.first_name){
      errors.first_name = '*First Name is Required'
    } 
    if(!values.middle_name){
      errors.middle_name = '*Middle Name is Required'
    } 
    if(!values.last_name){
      errors.last_name = '*Last Name is Required'
    } 
    if(!values.email){
      errors.email = '*Email is Required'
    } else if (!values.email.match(mailFormat)){
      errors.email = '*Not Valid Email Address'
    }
    if(!values.password){
      errors.password = '*Password is Required'
    } else if (values.password.length < 4){
      errors.password = '*Password must have 4 characters'
    } else if(values.password !== confirmPass) {
      errors.password = '*Password does not match'
    }
    if(!values.contact_number){
      errors.contact_number = '*Contact Number is Required'
    } else if (values.contact_number.length < 11) {
      errors.contact_number = '*Invalid Contact Number'
    } 
    if(!values.avatar) {
      errors.avatar = "*Choose a Picture"
    }
    return errors;
  }

 

  
  const handleChange = (e) => {
      const {value, name} = e.target
      setFormData({
        ...formData,
        [name]: value
      })
  }

  const handleConfirmPass = (e) => {
    setConfirmPass(e.target.value)
  }

  const getImagePath = async(e) => {
    let file = e.target.files[0]
    setImage(URL.createObjectURL(file))

    try {
      const path = 'https://netflixapinodejs.herokuapp.com/api/file/upload'
      const data = new FormData()
      data.append('image', e.target.files[0])
      const result = await axios.post(path, data)
      if(result.data.status === 'success'){
        setFormData({ ...formData, avatar: result.data.result.path})
      }
    } catch(err){
      console.log(err)
    } 
  }


  const handleFileImage = (e) => {
    getImagePath(e)
  }



  return (
    <div className={updateStatus ? 'login-containers-update-active' : 'login-containers'}>
      {updateStatus ? null : <NetflixLogo/>}
      <div className='w-100 d-flex justify-content-center align-items-center'>
        <div className='sign-in-container text-white'>
          {isLoading &&<LinearProgress className='mb-2'/>}
          {updateStatus && <i onClick={() => setUpdate(false)}className="fas fa-times fa-2x button-x"></i>}
          <h1>{updateStatus ? 'Update Account' : 'Sign Up'}</h1>
          <form onSubmit={handleSubmit}>
            <div className='details-wrapper'>
              <div className="form-group mt-3">
                <label className='mb-1'>First Name</label>
                <input 
                  onChange={handleChange} 
                  value={formData.first_name} 
                  name='first_name'type='text' 
                  className="form-control" 
                  placeholder='First Name'
                
                />
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.first_name}</p>
                <label className='mb-1'>Middle Name</label>
                <input 
                  onChange={handleChange} 
                  value={formData.middle_name}
                  name='middle_name'type='text' 
                  className="form-control" 
                  placeholder='Middle Name'
               
                />
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.middle_name}</p>
                <label className='mb-1'>Last Name</label>
                <input 
                  onChange={handleChange} 
                  value={formData.last_name} 
                  name='last_name'
                  type='text' 
                  className="form-control" placeholder='Last Name'
                
                />
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.last_name}</p>
                <label className='mb-1'>Email</label>
                <input 
                  onChange={handleChange} 
                  value={formData.email} 
                  name='email'
                  type='text' 
                  className="form-control"
                  placeholder='Email'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.email}</p>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{isExists}</p>
                <label className='mb-1'>Password</label>
                <input 
                  onChange={handleChange} 
                  value={formData.password} 
                  name='password'
                  type='password' 
                  className="form-control" 
                  placeholder='Password'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.password}</p>
                <label className='mb-1'>Confirm Password</label>
                <input 
                  onChange={handleConfirmPass} 
                  value={confirmPass} 
                  type='password' 
                  className="form-control" 
                  placeholder='Confirm Password'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.password}</p>
                <label className='mb-1'>Contact Number</label>
                <input 
                  onChange={handleChange} 
                  value={formData.contact_number} 
                  name='contact_number'type='text' 
                  className="form-control" 
                  placeholder='Contact Number'
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                  }}}
                />
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.contact_number}</p>
              </div>
              <div className='d-flex flex-column'>
                <label className='mt-3 mb-1'>Profile Picture</label>
                {formData.avatar &&  changeIsClick === true && <img className='profile-sign-up-image'src={`https://netflixapinodejs.herokuapp.com${formData.avatar}`} alt="profile" />}
                {image && changeIsClick === false && <img className='profile-sign-up-image'src={image} alt="profile" />}
                {changeIsClick ? (
                  <>
                  <button onClick={() => setChangeIsClick(false)} className='w-25'>Change</button>
                  </>
                ) : 
                (
                  <>
                    <input onChange={handleFileImage} value={value} type="file" name='file'/>
                    <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.avatar}</p> 
                    {location.pathname === '/user' && <button className='w-50' onClick={() => setChangeIsClick(true)}>Cancel Change</button>}
                  </>
                )        
                }
              </div>
              <button type='submit' className='btn btn-danger w-100 mt-5'>
                {isLoading ? <CircularProgress color="inherit" size='1em'/> : 'Submit'}
              </button>  
            </div>  
          </form>
        </div>
      </div>
      {isRegistered && 
      <div>
        <div className='signup-card-container'/>
        <div className='signup-card'>
          <h1 className='pb-3 text-center'>Successfully Registered!</h1>
          <button onClick={() => {navigate('/')}}className='btn btn-success'>Login</button>
        </div>
      </div>
      }
    </div>
  )
}

export default Signup
