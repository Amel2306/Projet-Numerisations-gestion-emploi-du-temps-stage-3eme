import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

function ProfesseurDescr(props) {
  const id = props.id;

  const [professeur, setProfesseur] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/professeurs/${id}`)
      .then((res) => {
        setProfesseur(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    professeur && (
          <ul className="prof-descr">
            <li>
              {" "}
              <h1>
                {professeur.nom} {professeur.prenom}
              </h1>{" "}
            </li>
            <li>Email : {professeur.email} </li>
            <li>Numéro de téléphone : {professeur.numero_tel}</li>
            <li>Métier : {professeur.metier}</li>
            <li>Établissement : {professeur.etablissement}</li>
            <li>Rôle : {professeur.role}</li>
            <li>Identifiant : {professeur.id}</li>
          </ul>
    )
  );
}

export default ProfesseurDescr;
