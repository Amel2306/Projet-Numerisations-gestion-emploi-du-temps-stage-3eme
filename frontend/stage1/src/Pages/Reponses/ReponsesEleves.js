import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import ReponsesEleve from "../../components/Reponses/ReponsesEleve";

function ReponsesEleves() {
  const [eleves, setEleves] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/eleves")
      .then((res) => {
        setEleves(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    eleves &&
    eleves.length > 0 && (
      <div>
        <h1>Les réponses des élèves</h1>
        {eleves.map((eleve) => (
          <div>
            <h3>
              Réponse de {eleve.nom} {eleve.prenom}
            </h3>
            <ReponsesEleve key={eleve.id} eleveId={eleve.id} />
          </div>
        ))}
      </div>
    )
  );
}

export default ReponsesEleves;
