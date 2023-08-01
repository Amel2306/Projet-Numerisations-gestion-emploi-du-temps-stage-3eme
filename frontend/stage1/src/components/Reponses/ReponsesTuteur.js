import { useEffect } from "react"
import { useState } from "react"
import axiosInstance from "../../config/axiosConfig"

function ReponsesTuteur (props) {

    const tuteurId = props.tuteurId

    const [questionRep, setQuestionRep] = useState(null)
    const [etat, setEtat] =useState(false)

    const handleAfficherReponses = () => {
        setEtat(!etat);
    }

    useEffect(() => {
        axiosInstance.get(`/reponses/tuteur/${tuteurId}`)
        .then((res) => {
            setQuestionRep(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

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
                Object.keys(questionRep).map((eleveId) => 
                  questionRep[eleveId] && (
                    <>
                        <h3> Eleve concerné : {eleveId}</h3>
                        {Object.keys(questionRep[eleveId]).map((questionId) => {
                        const activite = questionRep[eleveId][questionId];
                        return (
                            <>
                            <h4>Question : {activite.contenu}</h4>
                            {activite.reponses &&
                                activite.reponses.length > 0 && (
                                activite.reponses.map((reponse) => (
                                    <div>
                                    <h4> Réponse : {reponse.contenu}</h4>
                                    </div>
                                ))
                                )}
                            </>
                        );
                        })}
                    </>                  
                ))}
            </>
          )}
        </div>
    );
}

export default ReponsesTuteur