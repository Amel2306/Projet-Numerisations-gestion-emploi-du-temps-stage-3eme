import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import EleveActivite from "./EleveActivite";

function Activite (props) {

    const [activite, setActivite] = useState(null)

    let {id} = useParams()
    if (props.id) {
        id = props.id
    }

    const handleSupprime = (id) => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?");
        if (confirmation) {
            axiosInstance.delete(`activites/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });  
        }
    }

    useEffect (()=> {
        axiosInstance.get(`/activites/${id}`)
        .then((res) => {
            setActivite(res.data);
        })
        .catch((err) => {
            console.log(err);
        });  
    }, [])

    return (
            activite && (
                <div>
                    <h3>{activite.nom}</h3>
                    <p>Description: {activite.description}</p>
                    <p>Nombre de réalisation: {activite.nb_realisations}</p>
                    <p>Nombre d'élèves au maximum: {activite.nb_eleve_max}</p>
                    <div> 
                        <p>Professeur respo: {activite.professeurId}</p>
                        <Link to={`/professeur/${activite.professeurId}` } >Voir professeur</Link>                     
                    </div>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div className="elevesActivite" key={i}>
                            <EleveActivite activiteId={id} indexMoment={i}/>
                        </div>
                    ))}
                    <button 
                        className="btn"
                        onClick={() => handleSupprime(activite.id)}
                    >
                        Supprimer
                    </button>      
                </div>       
            )
    )
}

export default Activite