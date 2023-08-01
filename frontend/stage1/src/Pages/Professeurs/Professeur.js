import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import EleveDescr from "../../components/Eleves/EleveDescr";
import ParcProf from "../../components/Parcours/ParcProf";
import QuestionQuestionnaire from "../../components/Questions/QuestionQuestionnaire";
import ListeEleves from "../../components/Eleves/ListeElevesPdf"
import { PDFDownloadLink } from '@react-pdf/renderer';
import "../../style/Professeurs/Professeurs.css"

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
                console.error(err);
            });  
        }
    }

    return (
        professeur && 
        <div className="contain-professeur">

            <div >
                <ul className="prof-descr">
                <li> <h1>{professeur.nom} {professeur.prenom}</h1> </li> 
                    <li>Email : {professeur.email} </li>
                    <li>Numéro de téléphone : {professeur.numero_tel}</li>
                    <li>Métier : {professeur.metier}</li>
                    <li>Établissement : {professeur.etablissement}</li>
                    <li>Rôle : {professeur.role}</li>
                    <li>Identifiant : {professeur.id}</li>
                </ul>

                <button 
                    className="btn"
                    onClick={() => handleSupprime()}
                >
                    Supprimer
                </button>              
            </div>
                {(professeur.role === "Tuteur" || professeur.role === "Encadrant et Tuteur") && (
                        eleves && eleves.length > 0 && (
                            <div className="contain-eleves"> 
                                <h3>Mes élèves</h3> 
                                <button className="btn" onClick={() => handleAfficherParc()}> 
                                    {etat ? 
                                        <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                                        <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
                                </button>
                                <div className="eleves-prof">                        
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

                                </div>
                                    {etat && 
                                            <PDFDownloadLink className="link"  
                                            document={<ListeEleves 
                                            eleves={eleves} 
                                            professeur={professeur}/>} 
                                            fileName={"professeur"+professeur.id+".pdf"}
                                            >
                                                {({ blob, url, loading, error }) =>
                                                    loading ? 'Téléchargement en cours...' : 'Télécharger la liste des élèves'
                                                }
                                            </PDFDownloadLink>                          
                                    }
                            </div>
                           

                        )
                )}

                {(professeur.role === "Encadrant" || professeur.role === "Encadrant et Tuteur") && (
                    <div className="parcours-prof">
                        <h2>Mes parcours</h2>
                        <ParcProf profId={id} professeur={professeur}/>

                    </div>
                )}        
        </div>

    )
}

export default Professeur