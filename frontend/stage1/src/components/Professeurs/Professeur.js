import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import EleveDescr from "../Eleves/EleveDescr";
import ParcProf from "../Parcours/ParcProf";
import QuestionQuestionnaire from "../Questions/QuestionQuestionnaire";

function Professeur () {

    const {id}= useParams()

    const [professeur, setProfesseur] = useState(null)
    const [eleves, setEleves] = useState(null)

    useEffect (() => {

        axiosInstance.get(`/professeurs/${id}`)
        .then ((res) =>{
            setProfesseur(res.data)
        })
        .catch ((err) => {
            console.error(err)
        })

    }, [])

    useEffect (() => {

        axiosInstance.get(`/professeurs/tuteur/${id}`)
        .then ((res) =>{
            setEleves(res.data)
        })
        .catch ((err) => {
            console.error(err)
        })

    }, [])

    const [etat, setEtat] = useState(false)

    const handleAfficherParc = () => {
      setEtat(!etat);
    }

    const handleSupprime = () => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?");
        if (confirmation) {
            axiosInstance.delete(`professeurs/${id}`)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });  
        }
    }

    return (
        professeur && 
        <div>
            <h1>{professeur.nom} {professeur.prenom}</h1>
            <h4>Email : {professeur.email} </h4>
            <h4>Numéro de téléphone : {professeur.numero_tel}</h4>
            <h4>Métier : {professeur.metier}</h4>
            <h4>Établissement : {professeur.etablissement}</h4>
            <h4>Rôle : {professeur.role}</h4>
            <h4>Identifiant : {professeur.id}</h4>
            {(professeur.role === "Tuteur" || professeur.role === "Encadrant et Tuteur") && (
                    eleves && eleves.length > 0 && (
                    <>                        
                        <h3>Mes élèves</h3>
                        <button className="btn" onClick={() => handleAfficherParc()}> 
                            {etat ? 
                                <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                                <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
                        </button>
                        {eleves && etat && Object.values(eleves).map((eleve) => (
                            <div key={eleve.id}>
                                <EleveDescr id={eleve.id} /> 
                                <QuestionQuestionnaire 
                                    questionnaire="Tuteur" 
                                    repondantProfId={id}
                                    eleveConcerneId={eleve.id}
                                />                           
                            </div>
                        ))} 
                    </>
                    )
            )}

            {(professeur.role === "Encadrant" || professeur.role === "Encadrant et Tuteur") && (
                <>

                </>
            )}
            <>
                <h5>Mes parcours</h5>
                <ParcProf profId={id} />
            </>

            <button 
                className="btn"
                onClick={() => handleSupprime()}
            >
                Supprimer
            </button>
        </div>
    )
}

export default Professeur