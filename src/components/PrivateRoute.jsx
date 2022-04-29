import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const PrivateRouteUser = ({auth, children}) => {
  const user = Cookies.get('user')

  return auth && user ? children : <Navigate to='/'/>
}

export const PrivateRouteLogin = ({auth, children}) => {
  return auth ? <Navigate to='/user'/> : children
}

export const PrivateRouteSignup= ({auth, children}) => {
  return auth ? <Navigate to='/user'/> : children
}
