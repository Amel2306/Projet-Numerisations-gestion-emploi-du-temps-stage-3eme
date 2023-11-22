import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import ReponsesForEleves from "../../components/Reponses/ReponsesForEleves";

function ReponsesForAllEleves() {
  const { profId } = useParams();
  const [eleves, setEleves] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/professeurs/tuteur/${profId}`)
      .then((res) => {
        setEleves(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {eleves &&
        eleves.map((eleve) => (
          <div>
            <h3>
              Réponses des encadrants sur le stagiaire {eleve && eleve.nom}{" "}
              {eleve && eleve.prenom}
            </h3>
            <ReponsesForEleves id={eleve && eleve.id} />
          </div>
        ))}
    </div>
  );
}

export default ReponsesForAllEleves;
