import { useEffect } from "react"
import { useState } from "react"
import axiosInstance from "../../config/axiosConfig"
import QuestionAffiche from "./QuestionAffiche";
import { PDFDownloadLink } from '@react-pdf/renderer';
import QuestionPdf from "./QuestionPdf";

function QuestionsAffiche (props) {

    const questionnaire = props.questionnaire

    const [questions, setQuestions] = useState(null)
    const [etat, setEtat] = useState(false)
    const [modification, setModif] = useState(false)
    const [contenu, setContenu] = useState("")

    useEffect(() => {
        axiosInstance.get(`/questions/questionnaire/${questionnaire}`)
        .then((res) => {
            setQuestions(res.data)
        })
        .catch((err)=> {
            console.error(err)
        })

    }, [])

    const handleAfficherQuestionnaire = () => {
        setEtat(!etat);
    }

    const handleModifContenu = (id, pcontenu) => {
        axiosInstance.put(`/questions/${id}`, pcontenu)
        .then((res) => {
            setModif(false)
        })
    }

    return (
        questions && (
            <div>
                <h2>Questionnaire pour {questionnaire}</h2>
                <button className="btn" onClick={() => handleAfficherQuestionnaire()}> 
                {etat ? 
                    <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                    <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
                </button>
                <ul>
                    {etat && questions && questions.map((question)=> (
                        <QuestionAffiche question= {question} />

                    ))}
                    
                </ul>
                <PDFDownloadLink document={<QuestionPdf questionnaire={questionnaire} />} fileName={"questions"+questionnaire+".pdf"}>
                            {({ blob, url, loading, error }) =>
                                loading ? 'Téléchargement en cours...' : 'Télécharger les questions'
                            }
                </PDFDownloadLink>
            </div>
        )
    )
}

export default QuestionsAffiche