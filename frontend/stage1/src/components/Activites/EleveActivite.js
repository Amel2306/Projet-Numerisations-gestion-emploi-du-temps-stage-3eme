import { useState } from "react"
import { useEffect } from "react"
import axiosInstance from "../../config/axiosConfig"
import EleveDescr from "../Eleves/EleveDescr"
import ListeEleves from "../Eleves/ListeElevesPdf"
import QuestionQuestionnaire from "../Questions/QuestionQuestionnaire"
import { PDFDownloadLink } from '@react-pdf/renderer';

function EleveActivite (props) {

    const moment = [
        "Lundi Matin",
        "Lundi Aprés-midi",
        "Mardi Matin",
        "Mardi Aprés-midi",
        "Mercredi Matin",
        "Mercredi Aprés-midi",
        "Jeudi Matin",
        "Jeudi Aprés-midi",
        "Vendredi Matin",
        "Vendredi Aprés-midi"
    ]

    const indexMoment = props.indexMoment
    const activiteId = props.activiteId
    const professeurId = props.professeurId

    const [etat, setEtat] = useState(false)
    const [eleves, setEleves] = useState(null)    

    const handleAfficherParc = () => {
      setEtat(!etat);
    }

    useEffect(() => {
        axiosInstance.get(`/eleves/activite/${activiteId}/${indexMoment}`)
        .then ((res) => {
            setEleves(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    return (
        eleves && eleves.length > 0 && 
        <div> 
        <h3>{moment[indexMoment]}</h3>
           <button className="btn" onClick={() => handleAfficherParc()}> 
                {etat ? 
                    <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                    <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
            </button>        
            {etat &&
        eleves &&
        Object.values(eleves).map((eleve) => (
          <div key={eleve.id}>
            <EleveDescr id={eleve.id} />
          </div>
        ))}
       
       {etat && (
            <PDFDownloadLink document={<ListeEleves eleves={eleves} moment={moment[indexMoment]} activiteId={activiteId}/>} fileName={"activite"+activiteId+".pdf"}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Téléchargement en cours...' : 'Télécharger la liste des élèves'
                }
            </PDFDownloadLink>        
       )}


      {etat && (
        <QuestionQuestionnaire
          questionnaire="Encadrant"
          repondantProfId={professeurId}
          activiteId={activiteId}
          indexMoment={indexMoment}
        />
      )}
    </div>
    )
}

export default EleveActivite 