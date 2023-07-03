import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import {useNavigate} from "react-router-dom"

function ParcoursGeneration (props) {

    const semaine = props.semaine
    const setSemaine = props.setSemaine

    const [nbParcours, setNbParcours] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault();

        const data = {
            nbParcours
        }

        axiosInstance.post("/parcours",data)
        .then(response => {
            console.log("ok")
            navigate("/parcours")

        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="label-form">
                    <label>Combien souhaitez vous générer de parcours ?</label>
                    <input
                        type="number"
                        value={nbParcours}
                        onChange={(e)=> setNbParcours(e.target.value)}
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