import { useEffect } from "react"
import { useState } from "react"
import axiosInstance from "../../config/axiosConfig"
import QuestionRep from "./QuestionRep"

function QuestionQuestionnaire (props) {

    const questionnaire = props.questionnaire
    const repondantProfId = props.repondantProfId
    const repondantEleveId = props.repondantEleveId
    const activiteId = props.activiteId
    const eleveConcerneId = props.eleveConcerneId
    const indexMoment = props.indexMoment


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
                        <QuestionRep
                            key={question.id}
                            question={question}
                            data={{
                                repondantEleveId,
                                repondantProfId,
                                eleveConcerneId,
                                activiteId,
                                question,
                                indexMoment,
                            }}
                        />
                    ))}
                    
                </ul>
            </div>
        )
    )
}

export default QuestionQuestionnaire