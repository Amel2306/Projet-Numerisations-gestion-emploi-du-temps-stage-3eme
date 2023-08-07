import { useState } from "react";
import axiosInstance from "../../config/axiosConfig.js";
import { useParams, useNavigate } from 'react-router-dom'
import "../../style/Authentification/Authentification.css"

function Login() {

    const {personne} = useParams()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }
        
        axiosInstance.post(`/authentification/login/${personne}`, data)
        .then(response => {
            const token = response.data.token;
            const userId = response.data.eleveId ? response.data.eleveId : response.data.profId
            localStorage.setItem('token', token)
            localStorage.setItem('userId', userId)
            localStorage.setItem('personne', personne)
            navigate('/')            
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
        });


        setEmail('')
        setPassword('')
    }

    return (
        <div className="contain-form-auth">
            <h1>Connexion {personne === "eleves" ? "Élève" : "Encadrant-Tuteur"}</h1>            
            <form onSubmit={handleSubmit} className="contain-auth">
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email}
                        onChange= {handleEmailChange}
                        placeholder="Email" 
                    />
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Mot de passe" 
                    />
                </div>

                <button className="btn" >Se connecter</button>
            
            </form>            
        </div>
    )
}

export default Login