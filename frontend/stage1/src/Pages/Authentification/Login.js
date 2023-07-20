import { useState } from "react";
import axiosInstance from "../../config/axiosConfig.js";
import { useParams } from 'react-router-dom'

function Login() {

    const {personne} = useParams()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

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
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
        });


        setEmail('')
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Connexion {personne === "eleves" ? "Élève" : "Encadrant-Tuteur"}</h3>

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
    )
}

export default Login