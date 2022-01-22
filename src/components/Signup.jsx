import React, { useEffect, useState } from 'react'
import '../styles/SignUp.css'
import background from '../images/netflix-background.jpg'
import axios from 'axios'
import NetflixLogo from './NetflixLogo'


 
const details = [
  {
    id: 'first-name',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter First Name',
    name: 'first_name',
    text: 'text'
    
  },
  {
    id: 'middle-name',
    label: 'Middle Name',
    type: 'text',
    placeholder: 'Enter Middle Name',
    name: 'middle_name',
    text: 'text'
  },
  {
    id: 'last-name',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter Last Name',
    name: 'last_name',
    text: 'text'
  },
  {
    id: 'email-address',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter Email Address',
    name: 'email',
    text: 'email'
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter Password',
    name: 'password',
    text: 'password'
  },
  {
    id: 'confirm-password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Enter Password',
    name: 'confirm-password',
    text: 'password'
  },
  {
    id: 'contact-number',
    label: 'Contact Number',
    type: 'text',
    placeholder: 'Enter Contact Number',
    name: 'contact_number',
    text: 'text'
  },
 
]

const Signup = ({contacts}) => {

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    contact_number: '',
  })

  console.log(formData)



  const [fileImage, setFileImage] = useState('')
  


  const handleSubmit = async(e) => {
    e.preventDefault()
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
              {details.map((detail, index) => {
                return (
                <div
                key={detail.id} 
                className="form-group mt-3">
                  <label className='mb-1'>{detail.label}</label>
                  <input onChange={handleChange} value={formData[detail.name]} name={detail.name}type={detail.text} className="form-control" id={detail.id} placeholder={detail.placeholder}/>
                </div>
                )
              })}
              <div className='d-flex flex-column'>
                <label className='mt-3 mb-1'>Profile Picture</label>
                <input onChange={handleFileImage} type="file" name='file'/>
              </div>
              <button type='submit' className='btn btn-danger w-100 mt-5'>Submit</button>  
            </div>  
          </form>
          <button onClick={getImagePath}>Get Path</button>
        </div>
      </div>
    </div>
  )
}

export default Signup
