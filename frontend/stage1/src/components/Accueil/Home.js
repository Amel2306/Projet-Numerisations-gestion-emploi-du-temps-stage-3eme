import React from "react"
import {Link} from "react-router-dom"

function Home(props) {
    const user = props.user;
    if (!user) {
        return (

          <div>
            <h1>Vous n'êtes pas connecté</h1>
            <div>
                <Link to="/profForm"> Tuteur ou encadrant</Link>    
            </div>
            <div>
                <Link to="eleveForm" >Eleve</Link>
            </div>
          </div>
        );
      }
    
      return (
        <div>
          <h1>Salut {user.prenom}</h1>
          <p>Bienvenue sur votre page d'accueil.</p>
        </div>
      );
  }
  
  export default Home;