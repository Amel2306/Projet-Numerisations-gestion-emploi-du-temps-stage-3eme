import '../../style/Navbar/Navbar.css'
import '@fortawesome/fontawesome-svg-core'
import {Link} from "react-router-dom"
import { useState } from 'react'

function Navbar(props) {
    const user = props.user
    const setUser = props.setUser
    const [open, setEtat] = useState(true) //Pour l'ouverture de la navbar

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('personne');
        setUser(null);
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
                                    <Link className="link" to="/login/professeurs">Encadrant-tuteur</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/login/eleves">Élève</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/eleves">Liste élèves</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/professeurs">Liste Des Scientifiques</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/activites">Liste Activités</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/parcoursGeneration">Générer des parcours</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/parcours">Parcours</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/questionForm">Ajout question</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/questions">Questions</Link>
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
                            </>
                        ) : (
                            <>
                                <li>
                                    <button onClick={handleSignOut}>Se déconnecter</button>
                                </li>                            
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