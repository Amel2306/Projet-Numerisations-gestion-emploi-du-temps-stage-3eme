import QuestionAffiche from "./QuestionsAffiche"

function Questions () {
    return (
        <div>
            <div className="questionnaire">
                <QuestionAffiche questionnaire="Eleve"/>
            </div>
            <div className="questionnaire">
                <QuestionAffiche questionnaire="Tuteur"/>
            </div>
            <div className="questionnaire">
                <QuestionAffiche questionnaire="Encadrant"/>
            </div>
        </div>
    )
}

export default Questions