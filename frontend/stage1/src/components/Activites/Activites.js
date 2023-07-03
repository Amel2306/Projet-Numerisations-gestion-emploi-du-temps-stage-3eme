import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import './Activites.css'
import Activite from './Activite'


function Activtes () {
    const [activites, setActivites] = useState(null)

    useEffect(() => {

        axiosInstance.get('/activites') 
        .then((res) => {
            setActivites(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/activite/${id}`)
    }

    return (
        <div>
            <h2>Liste des activtiés</h2>
            <div className="container">
                {activites && activites.map((activite) => (
                    <div key={activite.id} className="element"
                        onClick={() => handleClick(activite.id)}
                    >
                        <h1> {activite.nom}</h1>
                        {activite && (
                            <Activite activiteId={activite.id} />
                        )}                        
                    </div>
                ))}
            </div>

            <button className="btn">
                <Link to="/activiteForm">Ajouter une activité</Link>
            </button>
        </div>
    )
}

export default Activtes