import { useState } from "react"
import { useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";

function EleveDescr (props) {

    const id = props.id
    const [eleve, setEleve] = useState(null)

    useEffect (() => {

        axiosInstance.get(`/eleves/${id}`)
        .then ((res) =>{
            setEleve(res.data)
            console.log(res)
            console.log(id)
        })
        .catch ((err) => {
            console.error(err)
        })

    }, [])

    return (
        eleve &&
        <div className="container-descr">
            <ul className="descr">
                <li>
                    <h1>{eleve.nom} {eleve.prenom} </h1>
                </li>
                <li> Email de l'élève : {eleve.email}</li>
                <li> Numéro de téléphone de l'élève : {eleve.numero_tel}</li>
                <li> Numéro de téléphone d'un parent de l'élève : {eleve.email}</li>
                <li> adresse de l'élève : {eleve.adress}</li>
                <li> établissement de l'élève : {eleve.etablissement}</li>
                <li> tuteur de l'élève : {eleve.professeurId}</li>
                <li> parcours de l'élève : {eleve.parcoursId} </li>
            </ul>            
        </div>

    )
}

export default EleveDescr