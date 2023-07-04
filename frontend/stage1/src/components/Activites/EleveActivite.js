import { useState } from "react"
import { useEffect } from "react"
import axiosInstance from "../../config/axiosConfig"
import Eleve from "../Eleves/Eleve"

function EleveActivite (props) {

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

    const indexMoment = props.indexMoment
    const activiteId = props.activiteId

    const [eleves, setEleves] = useState(null)

    useEffect(() => {
        axiosInstance.get(`/eleves/activite/${activiteId}/${indexMoment}`)
        .then ((res) => {
            setEleves(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    return (
        eleves && eleves.length > 0 && 
        <div> 
        <h3>{moment[indexMoment]}</h3>
           <button className="btn" onClick={() => handleAfficherParc()}> 
                {etat ? 
                    <i class="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                    <i class="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
            </button>        
            {(etat && eleves) && Object.entries(eleves).map((eleve) => (
                <div>
                    <Eleve id={eleve.id} />
                </div>

                ))
            }            
        </div>
    )
}

export default EleveActivite 