import React from "react"
import {Link} from "react-router-dom"

function Home(props) {
    const user = props.user;
    if (!user) {
        return (

          <div>
            <h1>Vous n'êtes pas connecté</h1>
            <div>
              <button className="btn" style={{fontSize: "20px", margin: "40px"}}>
                <Link className="link" to="/profForm" > S'inscrire en tant que Tuteur ou encadrant</Link> 
              </button>   
            </div>
            <div>
              <button className="btn" style={{fontSize: "20px"}}>
                <Link className="link" to="eleveForm" >S'inscrire en tant qu'Eleve</Link>                
              </button>
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