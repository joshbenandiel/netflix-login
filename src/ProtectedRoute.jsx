import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({auth , component: Component, ...rest}) => {

  const navigate = useNavigate()
  return (
    <Route
     {...rest}
     render={(props) => {
      if(auth) return <Component {...props}/>
      if(!auth) {
        navigate('/')
      }
     }}
    />
  )
}

export default ProtectedRoute