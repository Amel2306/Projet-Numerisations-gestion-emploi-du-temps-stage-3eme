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
                <div className="activite-descr">
                    <h3>{activite.nom}</h3>
                    <p>Description: {activite.description}</p>
                    <p>Nombre de réalisation: {activite.nb_realisations}</p>
                    <p>Nombre d'élèves au maximum: {activite.nb_eleve_max}</p>
                    <p>Lieu du déroulement de l'activité : {activite.lieu}</p>
                    <p>Lieu de rendez-vous (là ou je dois me rendre): {activite.lieu_rdv}</p>
                    <p>id : {activite.id}</p>
                    <Link className="link" to={`/activite/${id}`}>Voir activité</Link>
                    <div>
                        <p>Encadrant respo: {activite.professeurId}</p>
                        <button>
                            <Link className="link" to={`/professeur/${activite.professeurId}` } >Voir accueillant</Link>                        
                        </button>
                    </div>
                </div>            
            </div>
        )
    )
}

export default ActiviteDescr