import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";

function QuestionForm () {
    const [contenu, setContenu] = useState("")
    const [questionnaire, setQuestionnaire] = useState("")

    const navigate = useNavigate()

    const handleSubmit = () => {
        const data = {
            contenu,
            questionnaire
        }

        const confirmation = window.confirm("Êtes-vous sûr de vouloir ajouter cette question ?");

        if (confirmation) {
            axiosInstance.post("/questions", data)
            .then ((res) => {
                navigate("/questions")
            })
            .catch((err) => {
                console.error(err)
            })            
        }
    }

    return (
        <div>
            <h1>Formulaire question</h1>
            <form onSubmit={() => handleSubmit()}>


                <div>
                    <label>Contenu de la question</label>
                    <input 
                        type="textarea" 
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                        placeholder="Contenu de la question"
                        required
                    />                    
                </div>

                <div>
                    <label>Type de questionnaire ou sera ajouté la question</label>  
                    <select 
                        value={questionnaire} 
                        onChange={(e) => setQuestionnaire(e.target.value)}
                        required
                    >
                        <option value="Eleve">Questionnaire destiné aux élèves</option>
                        <option value="Encadrant">Questionnaire destiné aux encadrants</option>
                        <option value="Tuteur">Questionnaire destiné aux tuteurs</option>

                    </select>               
                </div>
                <button className="btn">Ajouter question </button>
            </form>
        </div>
    )
}

export default QuestionForm