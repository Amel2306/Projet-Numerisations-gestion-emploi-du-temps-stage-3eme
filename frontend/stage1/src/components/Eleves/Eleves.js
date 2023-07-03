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

    const handleClick = ( id) => {

      /*e.preventDefault()*/
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
          <Link to='/eleveForm'> Ajouter un élève</Link>
        </div>
      );
}

export default Eleves