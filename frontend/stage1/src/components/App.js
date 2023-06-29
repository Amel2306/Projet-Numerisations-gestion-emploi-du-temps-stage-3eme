import '../style/App.css';
import Home from "./Home"
import Login from "./Login"
import Navbar from "./Navbar"
import ProfForm from './ProfForm';
import axiosInstance from '../config/axiosConfig';
import {Routes, Route} from 'react-router-dom'
import { useState, useEffect } from "react"

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
      const personne = localStorage.getItem("personne")
      const userId = localStorage.getItem("userId")

    axiosInstance
      .get(`/${personne}/${userId}`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Navbar user={user} setUser = {setUser}/>
      <Routes>
        <Route exact path="/" element={<Home user={user}/>} />
        <Route path="/login/:personne" element={<Login/>} />
        <Route path="/profForm" element= {<ProfForm/>} />
      </Routes>
    </div>
  );
}

export default App;
