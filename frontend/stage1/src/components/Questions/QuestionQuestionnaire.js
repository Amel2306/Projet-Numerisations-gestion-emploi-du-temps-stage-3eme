import { useEffect } from "react"
import { useState } from "react"
import axiosInstance from "../../config/axiosConfig"

function QuestionQuestionnaire (props) {

    const questionnaire = props.questionnaire
    const [questions, setQuestions] = useState(null)

    useEffect(() => {
        axiosInstance.get(`/questions/questionnaire/${questionnaire}`)
        .then((res) => {
            setQuestions(res.data)
        })
        .catch((err)=> {
            console.error(err)
        })

    }, [])

    return (
        questions && (
            <div>
                <h2>Questionnaire pour {questionnaire}</h2>
                <ul>
                    {questions.map((question)=> (
                        <li>{question.contenu}</li>
                    ))}                        
                </ul>
            </div>
        )
    )
}

export default QuestionQuestionnaire