import { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import ActiviteDescr from "../Activites/ActiviteDescr";
import ParcProfPdf from "./ParcProfPdf";
import { PDFDownloadLink } from '@react-pdf/renderer';

function ParcProf(props) {

    const id = props.profId;
    const professeur = props.professeur

    const tab_moment = [
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

    const [etat, setEtat] = useState(false)

    const handleAfficherParc = () => {
      setEtat(!etat);
    }


    const [activites, setActivites] = useState(null);

    useEffect(() => {
        axiosInstance
        .get(`/activiteparcours/professeur/${id}`)
        .then((res) => {
            setActivites(res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <div>
            <button className="btn" onClick={() => handleAfficherParc()}> 
              {etat ? 
                <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
            </button>
            {activites && etat && Object.entries(activites).map(([index, moments]) => (
            <div key={index}>
            <h3> {moments.length > 0  && tab_moment[index]} </h3>
            {moments.length > 0 && moments.map((moment, momentIndex) => (
                <ul key={momentIndex}>
                {moment && moment.map((activite, activiteIndex) => (
                    <div>
                        <ActiviteDescr key={activiteIndex} id={activite.activiteId} />
                        <h3> Parcours : {activite.parcoursId}</h3>                      
                    </div>
                ))}
                </ul>
            ))}
            </div>
        ))}
            <PDFDownloadLink document={<ParcProfPdf 
                activites={activites} 
                tab_moment={tab_moment} 
                nom={professeur.nom} 
                prenom={professeur.prenom}/>} 
                fileName={"parcours"+id+".pdf"} 
            >
                {({ blob, url, loading, error }) =>
                    loading ? 'Téléchargement en cours...' : 'Télécharger le parcours'
                }
            </PDFDownloadLink>
        </div>
    );
}

export default ParcProf;