import { useEffect, useState } from "react";
import {Link } from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";

function ActiviteDescr (props) {

    const id = props.id

    const [activite, setActivite] = useState(null)

    useEffect (()=> {
        axiosInstance.get(`/activites/${id}`)
        .then((res) => {
            setActivite(res.data);
        })
        .catch((err) => {
            console.error(err);
        });  
    }, [])

    return (
        activite && (

            <div className='contain-act-descr'> 
                <ul className="activite-descr">
                    <li><h3>{activite.nom}</h3></li>
                    <li>Description: {activite.description}</li>
                    <li>Nombre de réalisation: {activite.nb_realisations}</li>
                    <li>Nombre d'élèves au maximum: {activite.nb_eleve_max}</li>
                    <li>Lieu du déroulement de l'activité : {activite.lieu}</li>
                    <li>Lieu de rendez-vous (là ou je dois me rendre): {activite.lieu_rdv}</li>
                    <li>id : {activite.id}</li>
                    <li>
                        <button><Link className="link" to={`/activite/${id}`}>Voir activité</Link></button>
                    </li>
                    <div>
                        <p>Encadrant respo: {activite.professeurId}</p>
                        <li>
                            <button>
                                <Link className="link" to={`/professeur/${activite.professeurId}` } >Voir accueillant</Link>                        
                            </button>                            
                        </li>

                    </div>
                </ul>            
            </div>
        )
    )
}

export default ActiviteDescr