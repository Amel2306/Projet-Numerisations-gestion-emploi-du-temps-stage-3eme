import axiosInstance from "../../config/axiosConfig";
import { useState } from "react";
import ActiviteFichier from "../../components/Activites/ActiviteFichier";
import {useNavigate} from "react-router-dom"

function ActiviteForm (props) {

    const semaine = props.semaine

    const navigate = useNavigate()


    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    const [nb_realisations, setNbReal] = useState(0)
    const [nb_eleve_max, setNbEleve] = useState(0)
    const [l1, setL1] = useState(0)
    const [l2, setL2] = useState(0)
    const [ma1, setMa1] = useState(0)
    const [ma2, setMa2] = useState(0)
    const [me1, setMe1] = useState(0)
    const [me2, setMe2] = useState(0)
    const [j1, setJ1] = useState(0)
    const [j2, setJ2] = useState(0)
    const [v1, setV1] = useState(0)
    const [v2, setV2] = useState(0)
    const [professeurId, setProf] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            nom,
            description,
            nb_realisations,
            nb_eleve_max,
            l1,
            l2,
            ma1,
            ma2,
            me1,
            me2,
            j1,
            j2,
            v1,
            v2,
            professeurId
        }

        axiosInstance.post('/activites', data)
        .then(response => {
            navigate("/activites")
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
          <h2>Formulaire d'activité</h2>
          <form onSubmit={handleSubmit}>

            <div className="label-form">
                <label>Nom de l'activité</label>
                <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                />
            </div>

            <div className="label-form">
                <label>Description de l'activité</label>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            <div className="label-form">
                <label>Nombre de fois que je peux réaliser l'activité</label>
                <input
                type="number"
                value={nb_realisations}
                onChange={(e) => setNbReal(parseInt(e.target.value))}
                />
            </div>

            <div className="label-form">
                <label>Nombre d'élèves maximum que je peux accepter à chaque fois</label>
                <input
                type="number"
                value={nb_eleve_max}
                onChange={(e) => setNbEleve(parseInt(e.target.value))}
                />
            </div>

            <h3>Je suis disponible pour faire cette activté se déroulant la semaine du {semaine} le </h3>

            <div className="label-form">
                <label>Lundi matin :</label>
                <select value={l1} onChange={(e) => setL1(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>

            <div className="label-form">
                <label>Lundi aprés-midi</label>
                <select value={l2} onChange={(e) => setL2(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>

            <div className="label-form">
                <label>Mardi matin :</label>
                <select value={ma1} onChange={(e) => setMa1(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>

            <div className="label-form">
                <label>Mardi aprés-midi</label>
                <select value={ma2} onChange={(e) => setMa2(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>


            <div className="label-form">
                <label>Mercredi matin :</label>
                <select value={me1} onChange={(e) => setMe1(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>
    

            <div className="label-form">
                <label>Mercredi aprés-midi</label>
                <select value={me2} onChange={(e) => setMe2(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>

            <div className="label-form">
                <label>Jeudi matin :</label>
                <select value={j1} onChange={(e) => setJ1(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>

            <div className="label-form">
                <label>Jeudi aprés-midi</label>
                <select value={j2} onChange={(e) => setJ2(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>

            <div className="label-form">
                <label>Vendredi matin :</label>
                <select value={v1} onChange={(e) => setV1(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>

            <div className="label-form">
                <label>Vendredi aprés-midi</label>
                <select value={v2} onChange={(e) => setV2(parseInt(e.target.value))}>
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
                </select>
            </div>
    
            <div className="label-form">
                <label>Encadrant ID :</label>
                <input
                type="number"
                value={professeurId}
                onChange={(e) => setProf(parseInt(e.target.value))}
                />
            </div>
    
            <button type="submit">Valider</button>
          </form>
          <ActiviteFichier />
        </div>
    );
}
export default ActiviteForm