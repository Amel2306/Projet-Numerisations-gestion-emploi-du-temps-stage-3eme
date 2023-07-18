import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig";
import "./Questions.css"

function QuestionForm () {
    const [contenu, setContenu] = useState("")
    const [questionnaire, setQuestionnaire] = useState("Eleve") // je met Eleve par défaut car ça sera le choix par défaut de l'utilisateur

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

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
        <div className="container-form">
            <h1>Formulaire question</h1>
            <form onSubmit={(e) => handleSubmit(e)}>


                <div>
                    <label>Contenu de la question</label>
                    <input 
                        className="question-input"
                        type="text" 
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                        placeholder="Contenu de la question"
                        required
                    />                    
                </div>

                <div>
                    <label>Type de questionnaire ou sera ajouté la question</label>  
                    <select 
                        className="question-input"
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