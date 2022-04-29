import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import LoggedIn from './components/LoggedIn';
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import { PrivateRouteUser } from './components/PrivateRoute';
import { PrivateRouteLogin } from './components/PrivateRoute';
import { PrivateRouteSignup } from './components/PrivateRoute';
import { AuthContext } from './components/AuthContext';
import useLocalStorage from './hooks/useLocalStorage.jsx'

function App() {

  const [auth, setAuth] = useLocalStorage('auth', false)
  const [user, setUser] = useLocalStorage('user',{})
  const [updateIsClick, setUpdateIsClick] = useState(false)
  const [changeIsClick, setChangeIsClick] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  return (
    <div className="App">
      <AuthContext.Provider value={{auth, setAuth}}>
        <BrowserRouter>
          <Routes>
            <Route 
              path='/' 
              element={
                <PrivateRouteLogin auth={auth}>
                  <Login
                    setIsUpdated={setIsUpdated}
                    setChangeIsClick={setChangeIsClick}
                    setUpdateIsClick={setUpdateIsClick}
                    setUser={setUser}
                    user={user}
                  />
                </PrivateRouteLogin>
              }
            />
            <Route 
              path='/signup' 
              element={
                <PrivateRouteSignup auth={auth}>
                  <Signup
                    setIsUpdated={setIsUpdated}
                    setChangeIsClick={setChangeIsClick}
                    changeIsClick={changeIsClick}
                    setUpdate={setUpdateIsClick}
                    updateStatus={updateIsClick}
                  />      
                </PrivateRouteSignup>
                }
              />
            <Route 
              path='/user' 
              element={
                <PrivateRouteUser auth={auth}>
                  <LoggedIn
                    setIsUpdated={setIsUpdated}
                    isUpdated={isUpdated}
                    setChangeIsClick={setChangeIsClick}
                    changeIsClick={changeIsClick}
                    setUpdate={setUpdateIsClick}
                    updateStatus={updateIsClick}
                    user={user}     
                  />
                </PrivateRouteUser>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
