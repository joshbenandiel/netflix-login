import React, { useEffect, useState } from 'react'
import '../styles/SignUp.css'
import background from '../images/netflix-background.jpg'
import axios from 'axios'
import NetflixLogo from './NetflixLogo'



const Signup = ({contacts}) => {

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    contact_number: '',
  })


  const [formErrors, setFormErrors] = useState({})

  console.log(formErrors)

  const [isSubmit, setIsSubmit] = useState(false)



  const handleSubmit = async(e) => {
    e.preventDefault()
    setFormErrors(validate(formData))
    setIsSubmit(true)
    if(Object.keys(formErrors).length === 0 && isSubmit){
      try {
        const path = 'http://localhost:8080/api/contacts/create'  
        const result = await axios.post(path, formData)
        if(result.data.status === 'success'){
          setFormData({
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            password: '',
            contact_number: '',
          })
        }  
        
       
      } catch(err){
        console.log(err)
      }
    }
  }

  const validate = (values) => {
    const errors = {}
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
    }
    if(!values.contact_number){
      errors.contact_number = '*Contact Number is Required'
    } else if (values.contact_number.length < 11) {
      errors.contact_number = '*Invalid Contact Number'
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

  const getImagePath = async(e) => {
    try {
      const path = 'http://localhost:8080/api/file/upload'
      const data = new FormData()
      data.append('image', e.target.files[0])
      const result = await axios.post(path, data)
      if(result.data.status === 'success'){
        setFormData({ ...formData, avatar: result.data.result.path })
      }
    } catch(err){
      console.log(err)
    } 
  }


  const handleFileImage = (e) => {
    getImagePath(e)
  }


  return (
    <div className='login-containers position-relative'>
      <NetflixLogo/>
      <div className='w-100 d-flex justify-content-center align-items-center h-100'>
        <div className='sign-in-container text-white'>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className='details-wrapper'>
              <div className="form-group mt-3">
                <label className='mb-1'>First Name</label>
                <input onChange={handleChange} value={formData.first_name} name='first_name'type='text' className="form-control" placeholder='First Name'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.first_name}</p>
                <label className='mb-1'>Middle Name</label>
                <input onChange={handleChange} value={formData.middle_name} name='middle_name'type='text' className="form-control" placeholder='Middle Name'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.middle_name}</p>
                <label className='mb-1'>Last Name</label>
                <input onChange={handleChange} value={formData.last_name} name='last_name'type='text' className="form-control" placeholder='Last Name'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.last_name}</p>
                <label className='mb-1'>Email</label>
                <input onChange={handleChange} value={formData.email} name='email'type='text' className="form-control" placeholder='Email'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.email}</p>
                <label className='mb-1'>Password</label>
                <input onChange={handleChange} value={formData.password} name='password'type='password' className="form-control" placeholder='Password'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.password}</p>
                <label className='mb-1'>Contact Number</label>
                <input onChange={handleChange} value={formData.contact_number} name='contact_number'type='text' className="form-control" placeholder='Contact Number'/>
                <p className='m-1 mb-2' style={{color: 'red', fontSize: '13px'}}>{formErrors.contact_number}</p>
              </div>
              <div className='d-flex flex-column'>
                <label className='mt-3 mb-1'>Profile Picture</label>
                <input onChange={handleFileImage} type="file" name='file'/>
              </div>
              <button type='submit' className='btn btn-danger w-100 mt-5'>Submit</button>  
            </div>  
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
