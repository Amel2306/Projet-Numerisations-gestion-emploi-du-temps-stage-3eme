import { useEffect } from "react"
import { useState } from "react"
import axiosInstance from "../../config/axiosConfig"
import EleveDescr from "./EleveDescr"


function EleveGroupe (props)  {
    const id = props.id

    const [groupe, setGroupe] = useState(null)
    const [etat, setEtat] = useState(false)

    useEffect(() =>{
        axiosInstance.get(`/eleves/binome/${id}`)
        .then((res) => {
            setGroupe(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    const handleAfficherGroupe = () => {
        setEtat(!etat);
    }

    return (  
        groupe && groupe.length>0 && 
        <div>
            <h1 className="groupe">Mon groupe</h1>
            <button className="btn" onClick={() => handleAfficherGroupe()}> 
              {etat ? 
                <i class="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                <i class="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
            </button>
          {groupe && etat && groupe.map((eleve) => (
                <div>
                    <EleveDescr id={eleve.id} />
                </div>
          ))}
        </div>
    )
}

export default EleveGroupe