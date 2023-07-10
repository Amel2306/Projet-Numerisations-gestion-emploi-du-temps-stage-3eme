import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import ActiviteDescr from "./ActiviteDescr";
import EleveActivite from "./EleveActivite";

function Activite (props) {

    const [activite, setActivite] = useState(null)

    let {id} = useParams()

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
                        <p>Professeur respo: {activite.professeurId}</p>
                        <Link to={`/professeur/${activite.professeurId}` } >Voir professeur</Link>                     
                    </div>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div className="elevesActivite" key={i}>
                            <EleveActivite activiteId={id} indexMoment={i} professeurId={activite.professeurId}/>
                        </div>
                    ))}
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