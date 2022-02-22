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
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './components/AuthContext';

function App() {

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({})
  const [updateIsClick, setUpdateIsClick] = useState(false)
  const [changeIsClick, setChangeIsClick] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)


  return (
    <div className="App">
      <AuthContext.Provider value={{auth, setAuth}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login
              setIsUpdated={setIsUpdated}
              setChangeIsClick={setChangeIsClick}
              setUpdateIsClick={setUpdateIsClick}
              setUser={setUser}

            />}/>
            <Route path='/signup' element={<Signup
              setIsUpdated={setIsUpdated}
              setChangeIsClick={setChangeIsClick}
              changeIsClick={changeIsClick}
              setUpdate={setUpdateIsClick}
              updateStatus={updateIsClick}
              />}/>
            <Route element={<PrivateRoute auth={auth}/>}>
              <Route path='/user' element={<LoggedIn
                setIsUpdated={setIsUpdated}
                isUpdated={isUpdated}
                setChangeIsClick={setChangeIsClick}
                changeIsClick={changeIsClick}
                setUpdate={setUpdateIsClick}
                updateStatus={updateIsClick}
                user={user}     
              />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
