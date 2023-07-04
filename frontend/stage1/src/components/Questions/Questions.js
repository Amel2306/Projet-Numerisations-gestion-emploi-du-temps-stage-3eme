import QuestionQuestionnaire from "./QuestionQuestionnaire"

function Questions () {
    return (
        <div>
            <div className="questionnaire">
                <QuestionQuestionnaire questionnaire="Eleve"/>
            </div>
            <div className="questionnaire">
                <QuestionQuestionnaire questionnaire="Tuteur"/>
            </div>
            <div className="questionnaire">
                <QuestionQuestionnaire questionnaire="Encadrant"/>
            </div>
        </div>
    )
}

export default Questions