import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import LoggedIn from './components/LoggedIn';
import {Update} from './components/Update'
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";

function App(props) {

  const [user, setUser] = useState({})

  const [updateIsClick, setUpdateIsClick] = useState(false)

  const [changeIsClick, setChangeIsClick] = useState(false)

  const [isUpdated, setIsUpdated] = useState(false)


  return (
    <div className="App">
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
          <Route path='/user' element={<LoggedIn
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
            setChangeIsClick={setChangeIsClick}
            changeIsClick={changeIsClick}
            setUpdate={setUpdateIsClick}
            updateStatus={updateIsClick}
            user={user}        
          />}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
