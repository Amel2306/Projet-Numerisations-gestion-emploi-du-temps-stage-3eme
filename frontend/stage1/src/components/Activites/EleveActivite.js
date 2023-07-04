import { useState } from "react"
import { useEffect } from "react"
import axiosInstance from "../../config/axiosConfig"
import EleveDescr from "../Eleves/EleveDescr"

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

    const indexMoment = props.indexMoment
    const activiteId = props.activiteId

    const [etat, setEtat] = useState(false)
    const [eleves, setEleves] = useState(null)    

    const handleAfficherParc = () => {
      setEtat(!etat);
    }

    useEffect(() => {
        axiosInstance.get(`/eleves/activite/${activiteId}/${indexMoment}`)
        .then ((res) => {
            setEleves(res.data)
            console.log(res.data)
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
            {(etat && eleves) && Object.values(eleves).map((eleve) => (
                <div key={eleve.id}>
                    <EleveDescr id={eleve.id}/>
                    {console.log(eleve)}
                </div>
                ))    
            }       
        </div>
    )
}

export default EleveActivite 