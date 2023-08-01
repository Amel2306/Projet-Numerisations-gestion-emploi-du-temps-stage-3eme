import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import { useParams} from 'react-router-dom'
import Parc from "../../components/Parcours/Parc";
import EleveDescr from "../../components/Eleves/EleveDescr";
import EleveGroupe from "../../components/Eleves/EleveGroupe";
import QuestionQuestionnaire from "../../components/Questions/QuestionQuestionnaire";
import ElevePdf from "../../components/Eleves/ElevePdf";
import {PDFDownloadLink} from "@react-pdf/renderer"
import "../../style/Eleves/Eleves.css"


function Eleve (props) {

    const nbEleveMax = props.nbEleveMax

    let {id} = useParams()
    if (props.id) {
        id = props.id
    }

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

    const handleValide = (id) => {

        const confirm = window.confirm("Êtes-vous sûr de vouloir valider cet élève ?");

        if (confirm) {
            axiosInstance.put(`eleves/confirmation/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });            
        }

    }

    const handleSupprime = (id) => {

        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet élève ?");

        if (confirmation) {
            axiosInstance.delete(`eleves/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });            
        }
    }

    const handleParcours = (id) => {
      const confirmation = window.confirm("Êtes-vous sûr de vouloir attribuer un parcours à cet élève ?");

      if (confirmation) {

        console.log("nbr eleve max" + nbEleveMax)

        const data = {
            nbEleveMax: parseInt(nbEleveMax)
        }

          axiosInstance.put(`eleves/parcours/${id}`,data)
          .then((res) => {
              window.location.reload();
          })
          .catch((err) => {
              console.log(err);
          });            
      }
    }

    return eleve && (

        <div className="global-eleve">

            <div className="contain-eleve">

            <div className="contain-eleve-descr">
                <EleveDescr id={id} />
                    <button
                        className="btn"
                        onClick={() => handleSupprime(eleve.id)}
                    >  
                        Supprimer 
                    </button> 

                    <PDFDownloadLink className="link pdf"  document={<ElevePdf eleve={eleve} />} fileName={"eleve"+eleve.id+".pdf"}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Téléchargement en cours...' : (
                                <>
                                    <i className="fa-solid fa-circle-down fa-xl"></i> Télécharger la fiche élève
                                </>
                            )
                        }
                    </PDFDownloadLink>    

            </div >
  

                {( eleve.parcoursId && (
                    <div className="groupe-questions">
                        <div className="contain-groupe"> 
                            <EleveGroupe id={id} eleve={eleve}/>                            
                        </div>
                        <div className="contain-questionnaire">
                            <h1>Questionnaire</h1>
                            <QuestionQuestionnaire 
                                questionnaire="Eleve"
                                repondantEleveId={id}
                            />                               
                        </div>
                    </div>    
                ))}


                <div className="all-btn">
                    {!eleve.professeurId && (
                    <button 
                        className="btn"
                        onClick={() => handleValide(eleve.id)}
                    > 
                        Valider 
                    </button>
                    )}

                    {(!eleve.parcoursId && eleve.professeurId)  &&(
                        <button 
                            className="btn"
                            onClick={() => handleParcours(eleve.id)}
                        > 
                            Attribuer un parcours
                        </button>
                    )}                                  
                </div>



            </div>
              {eleve.parcoursId &&
                    <div className="contain-parcours">
                        <h1>Mon parcours :</h1>
                        <Parc parcoursId={eleve.parcoursId} eleve={eleve}/>                    
                    </div> 
                }            
        </div>
    )

}

export default Eleve