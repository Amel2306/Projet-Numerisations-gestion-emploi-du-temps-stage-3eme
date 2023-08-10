import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

function Eleves() {
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  const [eleves, setEleves] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === "Admin") {
      axiosInstance
        .get("/eleves")
        .then((res) => {
          setEleves(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (userRole === "Tuteur" || userRole === "Encadrant et Tuteur") {
      axiosInstance
        .get(`/professeurs/tuteur/${userId}`)
        .then((res) => {
          setEleves(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const handleSupprimeAll = () => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir tout supprimer ?"
    );

    if (confirmation) {
      axiosInstance
        .delete("/eleves")
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleClick = (id) => {
    navigate(`/eleve/${id}`);
  };

  return (
    <div>
      <h2>Liste des élèves</h2>
      <div className="container">
        {eleves &&
          eleves.map((eleve) => (
            <div
              className="element"
              key={eleve.id}
              onClick={() => handleClick(eleve.id)}
            >
              <h3>
                {eleve.nom} {eleve.prenom}
              </h3>
              <p>Identifiant : {eleve.id}</p>
            </div>
          ))}
      </div>
      <button className="btn">
        <Link className="link" to="/eleveForm">
          Ajouter un élève
        </Link>
      </button>

      <button className="btn" onClick={handleSupprimeAll}>
        Supprimer les élèves
      </button>
    </div>
  );
}

export default Eleves;
