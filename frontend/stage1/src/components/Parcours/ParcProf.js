import { useState, useEffect } from "react";
import Activite from "../Activites/Activite";
import axiosInstance from "../../config/axiosConfig";

function ParcProf(props) {

    const id = props.profId;

    const tab_moment = [
        "Lundi Matin",
        "Lundi Aprés-midi",
        "Mardi Matin",
        "Mardi Aprés-midi",
        "Mercredi Matin",
        "Mercredi Aprés-midi",
        "Jeudi Matin",
        "Jeudi Aprés-midi",
        "Vendredi Matin",
        "Vendredi Aprés-midi"
    ]

    const [etat, setEtat] = useState(false)

    const handleAfficherParc = () => {
      setEtat(!etat);
    }


    const [activites, setActivites] = useState(null);

    useEffect(() => {
        axiosInstance
        .get(`/activiteparcours/professeur/${id}`)
        .then((res) => {
            setActivites(res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <div>
            <button className="btn" onClick={() => handleAfficherParc()}> 
              {etat ? 
                <i class="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                <i class="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
            </button>
            {activites && etat && Object.entries(activites).map(([index, moments]) => (
            <div key={index}>
            <h3> {tab_moment[index]} : </h3>
            {moments.length > 0 && moments.map((moment, momentIndex) => (
                <ul key={momentIndex}>
                {moment && moment.map((activite, activiteIndex) => (
                    <Activite key={activiteIndex} id={activite.activiteId} />
                ))}
                </ul>
            ))}
            </div>
        ))}
        </div>
    );
}

export default ParcProf;