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

function App() {

  const [user, setUser] = useState({})

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login
          setUser={setUser}
          />}/>
          <Route path='/signup' element={<Signup
          />}/>
          <Route path='/user' element={<LoggedIn
          user={user}        
          />}/>
           <Route path='/update' element={<Update       
          />}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
