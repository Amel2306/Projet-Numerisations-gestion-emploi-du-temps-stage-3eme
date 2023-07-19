import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axiosInstance from '../../config/axiosConfig';
import EleveFichier from './EleveFichier';

function EleveForm () {

    const [eleve, setEleve] = useState(null)
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [numero_tel, setNum] = useState("")
    const [numero_tel_parent, setNumParent] = useState("")
    const [adress, setAdress] = useState("")
    const [etablissement, setEtablissement] = useState("")

    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            nom,
            prenom,
            email,
            numero_tel,
            numero_tel_parent,
            adress,
            etablissement,
        }

        axiosInstance.post('/eleves', data)
        .then(response => {
            setNom("")
            setPrenom("")
            setEmail("")
            setNum("")
            setNumParent("")
            setAdress("")
            setEtablissement("")

            setEleve(response.data)

            history("/eleveCreation")
            
        })
        .catch(error => {
            console.error(error);
        });


    }

    return (
        <div>
            <h3>Formulaire Élève</h3>
            <form onSubmit={handleSubmit}>
                <div className="label-form" >
                    <label>Nom</label>
                    <input type="text"
                    value = {nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                    required
                    />                    
                </div>
                <div className="label-form" >
                    <label>Prenom</label>
                    <input type="text"
                    value = {prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Prenom"
                    required
                    />                    
                </div>
                <div className="label-form" >
                    <label>Email</label>
                    <input type="email"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    />                    
                </div>
                <div className="label-form" >
                    <label>Numéro de téléphone</label>
                    <input type="text"
                    value = {numero_tel}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="Numéro de téléphone" 
                    required                   
                    />                    
                </div>
                <div className="label-form" >
                    <label>Numéro de téléphone d'un parent</label>
                    <input type="text"
                    value = {numero_tel_parent}
                    onChange={(e) => setNumParent(e.target.value)}
                    placeholder="Numéro parent"
                    required
                    />                    
                </div>


                <div className="label-form" >
                    <label>Adresse</label>
                    <input type="text"
                    value = {adress}
                    onChange={(e) => setAdress(e.target.value)}
                    placeholder="Adresse"
                    required
                    />                    
                </div>

                <div className="label-form" >
                    <label>Établissement </label>
                    <input type="text"
                    value = {etablissement}
                    onChange={(e) => setEtablissement(e.target.value)}
                    placeholder="Établissement"
                    required
                    />                    
                </div>

                <button className='btn'>Valider</button>

            </form>
            <EleveFichier/>
        </div>
    )
}

export default EleveForm