import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import axiosInstance from "../../config/axiosConfig"
import ReponsesEncadrant from "./ReponsesEncadrant"
import ReponsesTuteur from "./ReponsesTuteur"

function ReponsesProfesseurs() { 

    const {role} = useParams()

    const [professeurs, setprofesseurs] = useState(null)

    useEffect(() => {
        axiosInstance.get(`/professeurs/role/${role}`)
        .then((res) =>{
            setprofesseurs(res.data)
            console.log(role)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    return (
        professeurs && professeurs.length > 0 &&
        <div>
            <h1>Les réponses des encadrants</h1>
            {professeurs.map((prof => (
                <div>
                    <h3>Réponse de {prof.nom} {prof.prenom}</h3>
                    {role === "Encadrant" ?
                        (<ReponsesEncadrant key={prof.id} encadrantId={prof.id} />) 
                        :
                        (<ReponsesTuteur key={prof.id} tuteurId={prof.id} />)                   
                    }
                </div>
            )))}
        </div>
    )
}

export default ReponsesProfesseurs