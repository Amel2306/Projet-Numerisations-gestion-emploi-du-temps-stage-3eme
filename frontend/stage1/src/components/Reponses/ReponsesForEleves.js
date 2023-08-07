import { useContext } from "react"
import { useEffect } from "react"
import axiosInstance from "../../config/axiosConfig"

function ReponsesForEleve (props) {

    const eleveId = props.id 

    const [allReponses, setReponses] = useContext(null)
    const [etat, setEtat] = useContext(false)

    const handleEtat = () =>{
        setEtat(!etat)
    }
    
    useEffect(() => {
        axiosInstance.get(`/reponses/foreleve/${eleveId}`)
        .then((res) => {
            setReponses(res.data)
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])

    return allReponses && (
        <div>
            <button className="btn" onClick={() => handleEtat()}> 
            {etat ? 
                    <i className="fa-solid fa-play fa-rotate-270 fa-lg"></i>:
                    <i className="fa-solid fa-play fa-rotate-90 fa-lg"></i>}
            </button>
            {etat && allReponses && allReponses.map((rep) => {
                (
                    <div > 
                        <h3>{rep && rep.contenu}</h3>
                        {rep && rep.reponses && rep.reponses.map((res) => (
                            <h4>{res && res.contenu}</h4>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

export default ReponsesForEleve