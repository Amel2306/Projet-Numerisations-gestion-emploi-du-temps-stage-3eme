import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import {Link, useParams} from 'react-router-dom'
import Parc from "../Parcours/Parc";
import EleveDescr from "./EleveDescr";
import EleveGroupe from "./EleveGroupe";
import QuestionQuestionnaire from "../Questions/QuestionQuestionnaire";
import ElevePdf from "./ElevePdf";
import {PDFDownloadLink} from "@react-pdf/renderer"


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
              console.log("parcours attribué");
              window.location.reload();
          })
          .catch((err) => {
              console.log(err);
          });            
      }
    }

    return eleve && (

        <div className="eleve">

            <EleveDescr id={id} />
                {eleve.parcoursId &&
                    <div>
                        <h1>Mon parcours :</h1>
                        <Parc parcoursId={eleve.parcoursId} eleve={eleve}/>                    
                    </div> 
                }
                <button
                    className="btn"
                    onClick={() => handleSupprime(eleve.id)}
                > 
                    Supprimer 
                </button>
                {!eleve.professeurId ? (
                <button 
                    className="btn"
                    onClick={() => handleValide(eleve.id)}
                > 
                    Valider 
                </button>
              ):
              (
                <button className="btn">
                    <Link to={`/professeur/${eleve.professeurId}`}> Voir Tuteur </Link>
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
              {( eleve.parcoursId && (
                <div>
                    <EleveGroupe id={id} eleve={eleve}/>
                    <QuestionQuestionnaire 
                        questionnaire="Eleve"
                        repondantEleveId={id}
                    />                 
                </div>    
              ))}

            <PDFDownloadLink document={<ElevePdf eleve={eleve} />} fileName={"eleve"+eleve.id+".pdf"}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Téléchargement en cours...' : 'Télécharger la fiche élève'
                }
            </PDFDownloadLink>    
        </div>
    )

}

export default Eleve