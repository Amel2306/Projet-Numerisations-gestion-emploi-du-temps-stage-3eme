import { useEffect, useState } from "react";
import {useNavigate, Link} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";

function Professeurs() {

    const [professeurs, setProfesseurs] = useState(null)

    useEffect (() => {
        axiosInstance.get (`/professeurs`)
        .then((res) => {
            setProfesseurs(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/professeur/${id}`)
    }

    return (
        <div>
            <h2>Liste des encadrant et des tuteur </h2>
            <div className="container">
                {professeurs && professeurs.map((prof) => (
                    <div key={prof.id} className="element"
                        onClick={() => handleClick(prof.id)}  
                    >
                        <h3>{prof.nom} {prof.prenom}</h3> 
                        <p>{prof.email}</p>
                        <p>Rôle : {prof.role}</p>
                    </div>
                )) }                
            </div>
            <Link to="/profForm">Ajouter un professeur</Link>
        </div>
    )
}

export default Professeurs