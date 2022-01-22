import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import LoggedIn from './components/LoggedIn';
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";

function App() {

  const [contacts, setContacts] = useState([])
  
  const getContactsData = async() => {
    try {
      const path = 'http://localhost:8080/api/contacts/list'
      const result = await axios.get(path)
      console.log(result)
      if(result.data.status === 'success'){
        setContacts(result.data.contacts)
      }
    } catch(err){
      console.log(err)
    }
  }

  useEffect(()=> {
    getContactsData()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login
          contacts={contacts}
          />}/>
          <Route path='/signup' element={<Signup
          contacts={contacts}
          />}/>
          <Route path='/user' element={<LoggedIn
          />}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
