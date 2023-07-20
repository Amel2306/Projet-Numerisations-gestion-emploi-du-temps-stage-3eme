import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import ActiviteDescr from "./ActiviteDescr";
import AjoutActAllPar from "./AjoutActAllParc";
import AjoutActPar from "./AjoutActParc";
import EleveActivite from "./EleveActivite";


function Activite () {

    let {id} = useParams()
    
    const [activite, setActivite] = useState(null)

    const handleSupprime = (id) => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?");
        if (confirmation) {
            axiosInstance.delete(`activites/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    useEffect (()=> {
        axiosInstance.get(`/activites/${id}`)
        .then((res) => {
            setActivite(res.data);
        })
        .catch((err) => {
            console.log(err);
        });  
    }, [])

    return (
            activite && (
                <div className="contain-activite">
                    <div className="contain-act-descr">
                        <ActiviteDescr className="contain-act-descr" id={id}/>   
                        <button 
                            className="btn supp-act"
                            onClick={() => handleSupprime(id)}
                        >
                            Supprimer l'activité
                        </button> 
                        
                    </div>

                    <div className="elevesActivite">
                        <h2>Parcours de l'activité</h2>
                        {Array.from({ length: 10 }, (_, i) => (
                            <div  key={i}>
                                <EleveActivite activiteId={id} indexMoment={i} professeurId={activite.professeurId}/>
                            </div>
                        ))}                        
                    </div>
                    <div className="ajout-activite">
                        <h2> Ajouter l'activité </h2>
                        <AjoutActPar className="ajout-act-parc" activiteId= {id} />
                        <AjoutActAllPar className="ajout-act-parc" activiteId= {id} />                   
                     </div>
                </div>       
            )
    )
}

export default Activite