import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";

function Eleves () {
    const [eleves, setEleves] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.get("/eleves")
        .then((res) => {
          setEleves(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])

    const handleSupprimeAll = () => {

      const confirmation = window.confirm("Êtes-vous sûr de vouloir tout supprimer ?");

      if (confirmation) {
        axiosInstance.delete("/eleves")
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err)
        })
      }
    }

    const handleClick = ( id) => {
      navigate(`/eleve/${id}`)

    }

    return (
        <div className="container">
          <h2>Liste des élèves</h2>
          {eleves && eleves.map((eleve) => (
            <div className="element" key={eleve.id}
              onClick={() => handleClick(eleve.id)}
            >
              <h3>{eleve.nom} {eleve.prenom}</h3>
              <p>Identifiant : {eleve.id}</p>            
            </div>

          ))}
          <Link className="link" to='/eleveForm'> Ajouter un élève</Link>

          <button className="btn" onClick={handleSupprimeAll}>Supprimer tous les élèves</button>
        </div>
      );
}

export default Eleves