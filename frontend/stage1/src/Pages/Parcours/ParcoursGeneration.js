import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import {useNavigate} from "react-router-dom"

function ParcoursGeneration (props) {

    const semaine = props.semaine
    const setSemaine = props.setSemaine
    const nbEleveMax = props.nbEleveMax
    const setNbEleveMax = props.setNbEleveMax

    const [nbParcours, setNbParcours] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault();

        const data = {
            nbParcours,
            nbEleveMax
        }

        axiosInstance.post("/parcours",data)
        .then(response => {
            navigate("/parcours")
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="global-generate-parc">
            <form onSubmit={handleSubmit} className="contain-generation-parc">
                <div className="label-form">
                    <label>Combien souhaitez vous générer de parcours ?</label>
                    <input
                        type="number"
                        value={nbParcours}
                        onChange={(e)=> setNbParcours(e.target.value)}
                    />
                </div>

                <div className="label-form">
                    <label>Combien souhaitez vous générer d'élèves par groupe ?</label>
                    <input
                        type="number"
                        value={nbEleveMax}
                        onChange={(e)=> setNbEleveMax(e.target.value)}
                    />
                </div>

                <div className="label-form">
                    <label>Quelle sera la semaine de stage (le premier lundi)? </label>
                    <input
                        type="date"
                        value={semaine}
                        onChange={(e) => setSemaine(e.target.value)}
                    />
                </div>
                
                <button className="btn">Valider</button>
            </form>
        </div>
    )
}

export default ParcoursGeneration