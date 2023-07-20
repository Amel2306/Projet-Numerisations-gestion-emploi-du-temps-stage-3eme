import axiosInstance from "../../config/axiosConfig";
import { useEffect, useState } from "react";
import "../../style/Parcours/Parcours.css"
import Parc from "../../components/Parcours/Parc";


function Parcours(props) {

  const semaine = props.semaine
    const [parcours, setParcours] = useState(null)

    useEffect(() => {

        axiosInstance.get('/activiteparcours/parcours')
        .then(response => {
            setParcours(response.data)
        })
        .catch(error => {
            console.error(error);
        });

    }, [])

    return (
        <div>
          <h1> Les parcours pour la semaine du {semaine}</h1>
          {parcours && Object.entries(parcours).map(([parcoursId, act]) => (
          <div key={parcoursId}>
            <ul className="container">
              {parcours && (
                <Parc parcoursId={parcoursId}/>
                )}
            </ul>
          </div>
        ))}
      </div>
    );
}

export default Parcours