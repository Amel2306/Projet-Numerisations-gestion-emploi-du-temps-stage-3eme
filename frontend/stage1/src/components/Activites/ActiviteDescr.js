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
                <p>id : {activite.id}</p>
                <Link to={`/activite/${id}`}>Voir activité</Link>
            </div>
        )
    )
}

export default ActiviteDescr