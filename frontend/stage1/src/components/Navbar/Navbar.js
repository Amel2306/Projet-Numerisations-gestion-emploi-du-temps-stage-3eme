import '../../style/Navbar/Navbar.css'
import '@fortawesome/fontawesome-svg-core'
import {Link, useNavigate} from "react-router-dom"
import { useState, useEffect, useRef } from 'react'

function Navbar(props) {

    const user = props.user
    const setUser = props.setUser
    const personne = props.personne

    const navigate = useNavigate();

    const [open, setEtat] = useState(true) //Pour l'ouverture de la navbar

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('personne');
        localStorage.removeItem('userId');
        setUser(null);
        navigate('/')
    }

    return (
        <nav className='nav'>
            <Link className="link logo" to="/" >
                Acceuil
            </Link>

            <div>
                <ul id="navbar" className = {open ? 'navbar active' : 'navbar'}>
                    {
                        !user ?(
                            <>
                                <li>
                                    <Link className="link" to="/login/professeurs">Se connecter : Encadrant-tuteur</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/login/eleves">Se connecter : Élève</Link>
                                </li>
                            </>
                        ) : personne === "professeurs" ?

                        user && user.role && user.role === "Admin" ? 
                        (
                            <>
                                <li>
                                    <Link className="link" to="/eleves">Liste des élèves</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/professeurs">Liste des accueillants</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/activites">Liste des Activités</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/parcoursGeneration">Générer des parcours</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/parcours">Liste des Parcours</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/questionForm">Ajout question</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/questions">liste des Questions</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/reponsesEleves">Réponses élèves</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/reponses/Encadrant">Réponses encadrants</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/reponses/Tuteur">Réponses Tuteur</Link>
                                </li>
                                <button className="btn" onClick={handleSignOut}>Se déconnecter</button>                        
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link className='link' to={`/professeur/${user.id}`} >Profil</Link>
                                </li> 
                                <li>
                                    {(user.role === "Tuteur" || user.role==="Encadrant et Tuteur" )&& (
                                        <Link className='link' to= {`/reponses/foreleves/${user.id}`}>Évaluation de mes élèves</Link>                                  
                                    )}                                    
                                </li>
                                <button className="btn" onClick={handleSignOut}>Se déconnecter</button>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link className='link' to={`/eleve/${user.id}`} >Profil</Link>
                                </li>
                                <button className="btn" onClick={handleSignOut}>Se déconnecter</button>
                            </>
                        )
                    }

                </ul> 
            </div>

            <div className='mobile'>
                <i id="bar" className={open ? "fa-solid fa-bars" : 'fas fa-times' }
                onClick={() => setEtat(!open)}></i>
            </div>           
        </nav>
    )
}

export default Navbar