import './style/App.css';
import Navbar from "./components/Navbar/Navbar"
import axiosInstance from './config/axiosConfig';
import { useState, useEffect } from "react"
import "./components/Activites/Activites.css"
import Rootes from './components/Routes';

function App() {

  const [user, setUser] = useState(null);
  const [semaine, setSemaine] = useState("")

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
      <Rootes user={user} setUser = {setUser} semaine={semaine} setSemaine = {setSemaine}/>
      <img src="/fleurs.png" alt="fleurs" className="image-fixed" />
    </div>
  );
}

export default App;
