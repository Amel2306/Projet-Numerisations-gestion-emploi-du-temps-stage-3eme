import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import {Link, useParams} from 'react-router-dom'
import Parc from "../Parcours/Parc";
import EleveDescr from "./EleveDescr";

function Eleve (props) {

    let {id} = useParams()
    if (props.id) {
        id = props.id
    }

    const [eleve, setEleve] = useState(null)

    useEffect (() => {

        axiosInstance.get(`/eleves/${id}`)
        .then ((res) =>{
            setEleve(res.data)
            console.log(res)
            console.log(id)
        })
        .catch ((err) => {
            console.error(err)
        })

    }, [])

    const handleValide = (id) => {

        const confirmation = window.confirm("Êtes-vous sûr de vouloir valider cet élève ?");

        if (confirmation) {
            axiosInstance.post (`/eleves/confirmation/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });            
        }

    }

    const handleSupprime = (id) => {

        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet élève ?");

        if (confirmation) {
            axiosInstance.delete(`eleves/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });            
        }
    }

    const handleParcours = (id) => {
      const confirmation = window.confirm("Êtes-vous sûr de vouloir attribuer un parcours à cet élève ?");

      if (confirmation) {
          axiosInstance.put(`eleves/parcours/${id}`)
          .then((res) => {
              console.log("parcours attribué");
              window.location.reload();
          })
          .catch((err) => {
              console.log(err);
          });            
      }
    }

    return eleve && (

        <div className="eleve">

            <EleveDescr id={id} />
                {eleve.parcoursId &&
                    <div>

                        <h1>Mon parcours :</h1>
                        <Parc parcoursId={eleve.parcoursId} />                    
                    </div> 
                }
                <button
                    className="btn"
                    onClick={() => handleSupprime(eleve.id)}
                > 
                    Supprimer 
                </button>
                {!eleve.professeurId ? (
                <button 
                    className="btn"
                    onClick={() => handleValide(eleve.id)}
                > 
                    Valider 
                </button>
              ):
              (
                <button className="btn">
                    <Link to={`/professeur/${eleve.professeurId}`}> Voir professeur </Link>
                </button>
              )}

              {(!eleve.parcoursId && eleve.professeurId)  &&(
                  <button 
                      className="btn"
                      onClick={() => handleParcours(eleve.id)}
                  > 
                      Attribuer un parcours
                  </button>
              )}

        </div>
    )

}

export default Eleve