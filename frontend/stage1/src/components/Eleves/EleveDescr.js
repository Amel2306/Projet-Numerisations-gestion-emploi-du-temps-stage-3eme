import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

function EleveDescr (props) {

    const id = props.id
    const [eleve, setEleve] = useState(null)

    useEffect (() => {

        axiosInstance.get(`/eleves/${id}`)
        .then ((res) =>{
            setEleve(res.data)
        })
        .catch ((err) => {
            console.error(err)
        })

    }, [])

    return (
        eleve &&
        <div className="eleve-descr">
            <ul className="descr">
                <li>
                    <h1>{eleve.nom} {eleve.prenom} </h1>
                </li>
                <li> Email de l'élève : {eleve.email}</li>
                <li> Numéro de téléphone de l'élève : {eleve.numero_tel}</li>
                <li> Numéro de téléphone d'un parent de l'élève : {eleve.numero_tel_parent}</li>
                <li> adresse de l'élève : {eleve.adress}</li>
                <li> établissement de l'élève : {eleve.etablissement}</li>
                <li> tuteur de l'élève : {eleve.professeurId}
                        <button>
                            <Link className="link" to={`/professeur/${eleve.professeurId}`}> Voir Tuteur </Link>
                        </button>
                </li>
                <li> identifiant : {eleve.id}
                    <button><Link className="link" to={`/eleve/${eleve.id}`}>Voir élève</Link></button>
                </li>

                <li>
                </li>
                <li> parcours de l'élève : {eleve.parcoursId} </li>
            </ul>            
        </div>
    )
}

export default EleveDescr