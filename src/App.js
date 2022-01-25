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

  console.log(updateIsClick)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login
          setUpdateIsClick={setUpdateIsClick}
          setUser={setUser}
          />}/>
          <Route path='/signup' element={<Signup
          setUpdate={setUpdateIsClick}
          updateStatus={updateIsClick}
          />}/>
          <Route path='/user' element={<LoggedIn
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
