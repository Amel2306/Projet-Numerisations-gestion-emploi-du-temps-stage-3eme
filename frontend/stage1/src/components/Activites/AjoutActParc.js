import { useState, useEffect } from "react"
import axiosInstance from "../../config/axiosConfig"
import {useNavigate} from 'react-router-dom'

function AjoutActPar (props) {
    
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
    const [parcoursId, setParcoursId] = useState(0)
    const [parcours, setParcours] = useState(null)
    const [etat, setEtat] = useState(false)

    const navigate = useNavigate()

    const handleAfficherParc = () => {
        setEtat(!etat);
    }

    useEffect(() => {
        axiosInstance.get(`/activiteparcours/parcours`)
        .then((res) => {
            setParcours(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const confirmation = window.confirm("Êtes-vous sûr de vouloir ajouter cette activité au parcours " + parcoursId + " le " + moment[indexMoment] + " ?");

        if (confirmation) {

            const data = {
                parcoursId,
                activiteId,
                indexMoment
            }

            axiosInstance.post(`/activiteparcours`, data)
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
                    <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>} Ajouter l'activité à un parcours
            </button>  
            {etat && (
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Entrez le moment de la semaine durant lequel vous souhaitez ajouter cette activité</label>
                        <select value= {indexMoment} onChange={(e) => setIndexMoment(e.target.value)}>
                            {moment && moment.map((mom, index) => (
                                <option key={index} value={index}>{mom}</option>
                            ))}                     
                        </select>

                    </div>            
                    <div>
                        <label>Entrez les parcours sur le quel vous voulez rajouter l'activité </label>
                        <select value= {parcoursId} onChange={(e) => setParcoursId(e.target.value)}>
                            {parcours && Object.keys(parcours).map((parc) => (
                                <option key={parc} value={parc}>{parc}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn">Ajouter</button>
                </form>                      
            )}
        </div>
    )
}

export default AjoutActPar