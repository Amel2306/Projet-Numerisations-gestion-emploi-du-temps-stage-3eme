import { useState, useEffect } from "react"
import axiosInstance from "../../config/axiosConfig"
import {useNavigate} from 'react-router-dom'


function AjoutActAllPar (props) {
    
    const activiteId = props.activiteId

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
    
    const [indexMoment, setIndexMoment] = useState(0)
    const [etat, setEtat] = useState(false)
    const navigate = useNavigate()

    const handleAfficherParc = () => {
        setEtat(!etat);
    }

    const handleSubmit = () => {
        const confirmation = window.confirm("Êtes-vous sûr de ajouter cette activité à tous les parcours le " + moment[indexMoment] + " ?");

        if (confirmation) {
            const data = {
                activiteId,
                indexMoment
            }
            axiosInstance.post(`/activiteparcours/parcours`, data)
            .then((res) => {
                navigate("/parcours")
            })
            .catch((err) => {
                console.error(err)
            })
        }
    }

    return (
        <div>
            <button className="btn" onClick={() => handleAfficherParc()}> 
                {etat ? 
                    <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                    <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>} Ajouter l'activité à tous les parcours
            </button>  
            {etat && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Entrez le moment de la semaine durant lequel vous souhaitez ajouter cette activité</label>
                        <select value= {indexMoment} onChange={(e) => setIndexMoment(e.target.value)}>
                            {moment && moment.map((mom, index) => (
                                <option key={index} value={index}>{mom}</option>
                            ))}                     
                        </select>

                    </div>            
                    <button className="btn">Ajouter</button>
                </form>                      
            )}
        </div>
    )
}

export default AjoutActAllPar