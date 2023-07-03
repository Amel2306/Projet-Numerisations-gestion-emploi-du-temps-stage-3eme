import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import Eleve from "../Eleves/Eleve";
import Parc from "../Parcours/Parc";
import ParcProf from "../Parcours/ParcProf";

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
            <h4>Email : {professeur.mail} </h4>
            <h4>Numéro de téléphone : {professeur.numero_tel}</h4>
            <h4>Métier : {professeur.metier}</h4>
            <h4>Établissement : {professeur.etablissement}</h4>
            <h4>Rôle : {professeur.role}</h4>
            <h4>Identifiant : {professeur.id}</h4>
            {(professeur.role === "Tuteur" || professeur.role === "Encadrant et Tuteur") && (
                <>
                    <h3>Mes élèves</h3>
                    {eleves && Object.entries(eleves).map((eleve) => (
                        <div key={eleve.id}>
                            <Eleve id={eleve.id} />                            
                        </div>
                    ))}       
                </>
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