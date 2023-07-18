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
                <div>
                    <ActiviteDescr id={id}/>
                    <div> 
                        <p>Encadrant respo: {activite.professeurId}</p>
                        <Link to={`/professeur/${activite.professeurId}` } >Voir Scientifique</Link>                     
                    </div>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div className="elevesActivite" key={i}>
                            <EleveActivite activiteId={id} indexMoment={i} professeurId={activite.professeurId}/>
                        </div>
                    ))}

                    <AjoutActPar activiteId= {id} />
                    <AjoutActAllPar activiteId= {id} />
                    <button 
                        className="btn"
                        onClick={() => handleSupprime(id)}
                    >
                        Supprimer
                    </button> 
                </div>       
            )
    )
}

export default Activite