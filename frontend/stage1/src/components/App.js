import '../style/App.css';
import Navbar from "./Navbar/Navbar"
import axiosInstance from '../config/axiosConfig';
import { useState, useEffect } from "react"
import Rootes from './Routes';

function App() {

  const personne = localStorage.getItem("personne")
  const userId = localStorage.getItem("userId")

  const [user, setUser] = useState(null);
  const [semaine, setSemaine] = useState("")

  useEffect(() => {
    axiosInstance
      .get(`/${personne}/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <Navbar user={user} setUser= {setUser} personne= {personne}/>
      <Rootes user={user} setUser = {setUser} semaine={semaine} setSemaine = {setSemaine}/>
      <img src="/fleurs.png" alt="fleurs" className="image-fixed-bottom" />
    </div>
  );
}

export default App;
