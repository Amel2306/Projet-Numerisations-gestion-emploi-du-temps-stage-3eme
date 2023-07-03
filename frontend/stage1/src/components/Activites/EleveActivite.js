import { useState } from "react"
import { useEffect } from "react"
import axiosInstance from "../../config/axiosConfig"
import Eleve from "../Eleves/Eleve"

function EleveActivite (props) {

    const moment = [
        "Lundi Matin",
        "Lundi Aprés-midi",
        "Mardi Matin",
        "Mardi Aprés-midi",
        "Mercredi Matin",
        "Mercredi Aprés-midi",
        "Jeudi Matin",
        "Jeudi Aprés-midi",
        "Vendredi Matin",
        "Vendredi Aprés-midi"
    ]

    const indexMoment = props.indexMoment
    const activiteId = props.activiteId

    const [eleves, setEleves] = useState(null)

    useEffect(() => {
        axiosInstance.get(`/eleves/activite/${activiteId}/${indexMoment}`)
        .then ((res) => {
            setEleves(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    return (
        eleves && Object.entries(eleves).map((eleve) => (
            <div>
                <h3>{moment[indexMoment]}</h3>
                <Eleve id={eleve.id} />
            </div>

        ))
    )
}

export default EleveActivite 