import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../config/axiosConfig";
import { MomentsContext } from "../../utils/tabMoments";

function ReponsesEncadrant(props) {
  const { tab_moments } = useContext(MomentsContext);

  const encadrantId = props.encadrantId;

  const [questionRep, setQuestionRep] = useState(null);
  const [etat, setEtat] = useState(false);

  const handleAfficherReponses = () => {
    setEtat(!etat);
  };

  useEffect(() => {
    axiosInstance
      .get(`/reponses/encadrant/${encadrantId}`)
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
            Object.keys(questionRep).map(
              (activiteId) =>
                questionRep[activiteId] &&
                Object.keys(questionRep[activiteId]).map((questionId) => (
                  <>
                    <h4>
                      Question : {questionRep[activiteId][questionId].contenu}
                    </h4>
                    {questionRep[activiteId][questionId].reponses &&
                      questionRep[activiteId][questionId].reponses.length > 0 &&
                      questionRep[activiteId][questionId].reponses.map(
                        (reponse) => (
                          <div>
                            <h4>
                              {tab_moments && tab_moments[reponse.indexMoment]},
                              Activite : {activiteId}
                            </h4>
                            <h4> Réponse : {reponse.contenu}</h4>
                          </div>
                        )
                      )}
                  </>
                ))
            )}
        </>
      )}
    </div>
  );
}

export default ReponsesEncadrant;
