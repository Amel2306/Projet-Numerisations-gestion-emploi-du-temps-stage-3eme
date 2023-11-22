import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

function ReponsesEleve(props) {
  const eleveId = props.eleveId;

  const [questionRep, setQuestionRep] = useState(null);
  const [etat, setEtat] = useState(false);

  const handleAfficherReponses = () => {
    setEtat(!etat);
  };

  useEffect(() => {
    axiosInstance
      .get(`/reponses/eleve/${eleveId}`)
      .then((res) => {
        setQuestionRep(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {questionRep && (
        <>
          <button className="btn" onClick={() => handleAfficherReponses()}>
            {etat ? (
              <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>
            ) : (
              <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>
            )}
          </button>

          {etat &&
            Object.values(questionRep).map(
              (questrep) =>
                questrep.reponses[0] && (
                  <div>
                    <p>question: {questrep.question}</p> <br />
                    <p>reponse: {questrep.reponses[0].contenu}</p>
                  </div>
                )
            )}
        </>
      )}
    </div>
  );
}

export default ReponsesEleve;
