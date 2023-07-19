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

    const handleSupprimeAll = () => {

        const confirmation = window.confirm("Êtes-vous sûr de vouloir tout supprimer ?");
  
        if (confirmation) {
          axiosInstance.delete("/professeurs")
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            console.error(err)
          })
        }
    }

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

            <button className="btn">
                <Link className="link" to="/profForm">Ajouter un scientifique</Link>
            </button>
            <button className="btn" onClick={handleSupprimeAll}>
                Supprimer les scientifiques
            </button>

        </div>
    )
}

export default Professeurs