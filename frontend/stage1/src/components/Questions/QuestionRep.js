import { useEffect } from "react"
import { useState } from "react"
import axiosInstance from "../../config/axiosConfig"

function QuestionRep(props) {

    const question = props.data.question
    const repondantProfId = props.data.repondantProfId
    const repondantEleveId = props.data.repondantEleveId
    const activiteId = props.data.activiteId
    const eleveConcerneId = props.data.eleveConcerneId
    const indexMoment = props.data.indexMoment

    const [contenuRep, setContenuRep] = useState("")
    const [repondu, setRepondu] = useState(false)
    const [reponseId, setRepId] = useState(0)

    useEffect(() => {
        const params = {
            repondantEleveId,
            repondantProfId,
            eleveConcerneId,
            questionId: question.id,
            activiteId: parseInt(activiteId),
            indexMoment: parseInt(indexMoment)
        };
        console.log(params)
        axiosInstance.get(`/reponses/unique`, {params})
        .then((res) => {
            console.log(res)
            if (res.data) {
                setRepondu(true)
                setContenuRep(res.data.contenu) 
                setRepId(res.data.id)              
            }
        })        
        
    }, [])

    const handleReponse = (questionId,e) => {
        e.preventDefault()
        const dataRep = {
            contenu: contenuRep,
            repondantEleveId,
            repondantProfId,
            eleveConcerneId,
            questionId,
            activiteId, 
            indexMoment
        }

        axiosInstance.post(`/reponses`, dataRep)
        .then ((res)=> {
            setRepondu(true)
            setRepId(res.data.id)
            setContenuRep(res.data.contenu)
        })
        .catch((err)=> {
            console.error(err)
        }) 
    }

    const updateReponse = (e) => {

        e.preventDefault()

        const data = {
           contenu: contenuRep 
        } 

        axiosInstance.put(`/reponses/${reponseId}`, data)
        .then((res) => {
            console.log("modifié")
            setContenuRep(res.data.contenu)
        })
        .catch((err) =>{
            console.error(err)
        })
    }

    return (
        <form>
          <label>{question.contenu}</label>
          <input
            type="textarea"
            value={contenuRep}
            onChange={(e) => setContenuRep(e.target.value)}
            required
          />
            {repondu ? (
            <button className="btn" onClick={(e) => updateReponse(e)}>
                {repondu} <i className="fa-solid fa-pen"></i>
            </button>
            ) : (
            <button className="btn" onClick={(e) => handleReponse(question.id,e)}>
                {repondu} <i className="fa-solid fa-check"></i>
            </button>
            )}
        </form>
      );
}

export default QuestionRep