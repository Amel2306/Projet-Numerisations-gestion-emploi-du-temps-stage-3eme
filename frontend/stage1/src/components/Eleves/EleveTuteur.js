import { useState, useEffect } from "react"
import axiosInstance from "../../config/axiosConfig"

function EleveTuteur (props) {
    const id = props.id
    
    const [etat, setEtat] = useState(false)
    const [tuteurId, setTuteur] = useState(0)
    const [allProfs, setProfs] = useState(null)

    useEffect(() => {
        axiosInstance.get(`/professeurs`)
        .then ((res) => {
            setProfs(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    const handleAfficherParc = () => {
        setEtat(!etat);
    }

    const handleSubmit = () => {
        const confirmation = window.confirm("Êtes vous sûr de vouloir modifier le tuteur de l'élève ?")

        if (confirmation) {
            const data = {
                professeurId: tuteurId,
            }
            axiosInstance.put(`/eleves/${id}`, data)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.error(err)
            })
        }
    }

    return (
        <div>
            <button className="btn" onClick={() => handleAfficherParc()}> 
                {etat ? 
                    <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                    <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>} Modifier le tuteur de l'élève
            </button>  
            {etat && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Entrez l'accueillant souhaité pour qu'il devienne tuteur de cet élève :</label>
                        <select value= {tuteurId} onChange={(e) => setTuteur(e.target.value)}>
                            {allProfs && allProfs.map((prof) => (
                                <option key={prof.id} value={prof.id}>{prof.nom} {prof.prenom}</option>
                            ))}                     
                        </select>

                    </div>            
                    <button className="btn">Confirmer</button>
                </form>                      
            )}
        </div>
    )
}

export default EleveTuteur