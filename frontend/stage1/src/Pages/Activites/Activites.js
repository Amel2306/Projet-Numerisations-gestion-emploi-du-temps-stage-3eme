import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import '../../style/Activites/Activites.css'

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

    const handleSupprimeAll = () => {

        const confirmation = window.confirm("Êtes-vous sûr de vouloir tout supprimer ?");
  
        if (confirmation) {
          axiosInstance.delete("/activites")
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            console.error(err)
          })
        }
    }

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
                        </div>
                    ))}               
                </div>

            <button className="btn">
                <Link className="link" to="/activiteForm">Ajouter une activité</Link>
            </button>
            <button className="btn" onClick={handleSupprimeAll}>
                Supprimer les activités
            </button>
        </div>
    )
}

export default Activtes