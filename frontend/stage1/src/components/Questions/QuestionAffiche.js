import {useState} from "react"
import axiosInstance from "../../config/axiosConfig"

function QuestionAffiche (props) {

    const question = props.question

    const [modification, setModif] = useState(false)
    const [contenu, setContenu] = useState(question.contenu)

    const handleModifContenu = (id, pcontenu) => {
        const data = {
            contenu: pcontenu
        }
        axiosInstance.put(`/questions/${id}`, data)
        .then((res) => {
            setContenu(res.data.contenu)
            setModif(false)
        })
    }

    return (
        question && (
                        <div> {
                            modification ? 
                            <div> 
                                <textarea
                                    className="question-input"
                                    defaultValue= {contenu}
                                    onChange={(e) => setContenu(e.target.value)}
                                />
                                <button className="btn"
                                    onClick={() => handleModifContenu(question.id, contenu)}                                
                                >
                                    <i className="fa-solid fa-check"></i>
                                </button>  
                            </div>
    
                            :
                            <div>
                                <h3>{contenu}</h3> 
                                <button className="btn"
                                    onClick={() => setModif(true)}                                
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                            </div>
                        }
                        </div>
        )
    )
}

export default QuestionAffiche