import { useEffect } from "react"
import { useState } from "react"
import {PDFDownloadLink} from '@react-pdf/renderer'
import axiosInstance from "../../config/axiosConfig"
import EleveDescr from "./EleveDescr"
import ListeEleves from "./ListeElevesPdf"


function EleveGroupe (props)  {
    const id = props.id
    const eleveP = props.eleve

    const [groupe, setGroupe] = useState(null)
    const [etat, setEtat] = useState(false)

    useEffect(() =>{
        axiosInstance.get(`/eleves/binome/${id}`)
        .then((res) => {
            setGroupe(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    const handleAfficherGroupe = () => {
        setEtat(!etat);
    }

    return (  
        groupe && groupe.length>0 && 
        <div>
            <h1 className="groupe">Mon groupe</h1>
            <button className="btn" onClick={() => handleAfficherGroupe()}> 
              {etat ? 
                <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
            </button>
          {groupe && etat && groupe.map((eleve) => (
                <div>
                    <EleveDescr id={eleve.id} />

                </div>
          ))}
                <PDFDownloadLink 
                    document={<ListeEleves 
                        eleves={groupe}
                        eleve= {eleveP}
                    />}
                    fileName={"groupe"+id+".pdf"}
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Téléchargement en cours...' : 'Télécharger la liste des élèves'
                    }
                </PDFDownloadLink>  
        </div>
    )
}

export default EleveGroupe