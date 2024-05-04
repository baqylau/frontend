import React, { useEffect, useState } from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import Map from './map/Map';
import Auth from './auth/Auth';
import toast, {Toaster} from "react-hot-toast"
import axios from 'axios';
import bakyl from "./img/bakyl.png";
import Regestration from './auth/Register';
import ListoOrg from './organizations/ListoOrg';
import Billing from './organizations/Bilings';

function App() {
  const [user,setUser] = useState(null)

  async function getUser() {
    try {      
      const response = await axios.get('https://baqylau-backend.undefined.ink/api/user', { headers: {
        "Authorization": "Bearer "+ localStorage.getItem("carsToken") || ""
      } });
      if(response.data.success === true) {
          setUser(response.data.user)
      }
    } catch (error) {
      setUser(false)
      console.error('Ошибка при отправке данных:', error);
    } 
  }

  useEffect(() => {
    getUser()
  },[])



  if(user == null) return <div className="flex min-h-screen justify-center items-center">
  <img src={bakyl} alt="Loader" className="animate-spin h-16 w-16" />
</div>
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/biling' element={<Billing />} />
          <Route path="/organization" element={<ListoOrg  user={user} setUser={setUser}/>} />
          <Route path="/register" element={<Regestration setUser={setUser} user={user}/>} />
          <Route path="/" element={<Auth setUser={setUser} user={user}/>} />
          <Route path="/map/:id" element={<Map user={user}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
