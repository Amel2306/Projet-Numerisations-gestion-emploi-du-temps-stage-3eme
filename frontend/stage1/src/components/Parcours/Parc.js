import axiosInstance from "../../config/axiosConfig";
import { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom'
import Activite from '../Activites/Activite'


function Parc (props) {

    const parcoursId = props.parcoursId

    const prof = props.profId

    const moment = [
        "Lundi Matin",
        "Lundi Aprés-midi",
        "Mardi Matin",
        "Mardi Aprés-midi",
        "Mercredi Matin",
        "Mercredi Aprés-midi",
        "Jeudi Matin",
        "Jeudi Aprés-midi",
        "Vendredi Matin",
        "Vendredi Aprés-midi"
    ]

    const [etat, setEtat] = useState(false)

    const handleAfficherParc = () => {
      setEtat(!etat);
    }

    const [activites, setActivites] = useState(null)

    let route;
    if (prof) {
        route = `/activiteparcours/professeur/${prof}`
    }
    else {
        route = `/activiteparcours/${parcoursId}`
    }
    useEffect (() => {

        axiosInstance.get(route)
        .then ((res) =>{
            setActivites(res.data)
        })
        .catch ((err) => {
            console.error(err)
        })

    }, [])

    return (
        <div>
            <h1 className="parcours">Parcours {parcoursId}</h1>
            <button className="btn" onClick={() => handleAfficherParc()}> 
              {etat ? 
                <i class="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                <i class="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
            </button>
            <ul className="container">
              {(activites && etat) && activites.map((act) => (
                <li key={act.activiteId}>
                    <h3>{moment[act.indexMoment]} :</h3>
                    <Activite id={act.activiteId} />
                </li>
              ))}
            </ul>
        </div>
    )
}

export default Parc