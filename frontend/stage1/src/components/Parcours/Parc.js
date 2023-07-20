import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../config/axiosConfig";
import ActiviteDescr from "../Activites/ActiviteDescr";
import ParcoursPdf from "./ParcoursPdf";
import { PDFDownloadLink } from '@react-pdf/renderer';
import {MomentsContext} from "../../utils/tabMoments"

function Parc (props) {

    const parcoursId = props.parcoursId
    const prof = props.profId
    const eleve = props.eleve

    const {tab_moments} = useContext(MomentsContext);

    const [etat, setEtat] = useState(false)

    const handleAfficherParc = () => {
      setEtat(!etat);
    }

    const [activites, setActivites] = useState(null)

    let route;
    if (prof) {
        route = `/activiteparcours/professeur/${prof}`
    }
    else {
        route = `/activiteparcours/${parcoursId}`
    }
    useEffect (() => {

        axiosInstance.get(route)
        .then ((res) =>{
            setActivites(res.data)
        })
        .catch ((err) => {
            console.error(err)
        })

    }, [])

    return (
        <div>
            <h1 className="parcours">Parcours {parcoursId}</h1>
            <button className="btn" onClick={() => handleAfficherParc()}> 
              {etat ? 
                <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>}  Afficher le parcours
            </button>
            <ul className="container">
              {(activites && etat) && activites.map((act) => (
                <li key={act.activiteId}>
                    <h3>{tab_moments[act.indexMoment]} :</h3>
                    <ActiviteDescr id={act.activiteId} />
                </li>
              ))}
            </ul>
            {<PDFDownloadLink className="link"  document={<ParcoursPdf activites={activites} eleve={eleve}/>} fileName={"parcours"+parcoursId+".pdf"}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Téléchargement en cours...' : 'Télécharger le parcours'
                }
            </PDFDownloadLink>}
        </div>
    )
}

export default Parc