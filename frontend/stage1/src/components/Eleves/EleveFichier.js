import React, {useState} from 'react'
import Papa from 'papaparse'
import axiosInstance from '../../config/axiosConfig';
import {useNavigate} from 'react-router-dom'

function EleveFichier () {

    const history = useNavigate()

    const [selectFile, setFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const handleFileUpload = () => {
        if (selectFile) {
            Papa.parse(selectFile, {
                header: true,
                complete: async (results) => {
                    const data = results.data

                    const formattedData = data.map((item) => ({
                        nom: item.nom,
                        prenom: item.prenom,
                        email: item.email,
                        numero_tel: item.numTel,
                        numero_tel_parent: item.numTelPar,
                        adress: item.adresse,
                        etablissement: item.etablissement,
                    }))
                    try {
                        for (const rowData of formattedData) {
                          await axiosInstance.post('/eleves', rowData);
                        }
                        history("/eleves")
                        window.location.reload();
                    } catch (error) {
                        console.error('Une erreur s\'est produite lors de l\'envoi des données:', error);
                    }
                }
            })
        }
    }

    return (
        <div>
            <label>Veuillez joindre votre fichier </label>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload} className="btn">Ajouter les élèves</button>
        </div>
    )
}

export default EleveFichier

