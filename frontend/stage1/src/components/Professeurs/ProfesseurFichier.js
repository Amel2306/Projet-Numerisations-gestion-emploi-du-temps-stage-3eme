import React, {useState} from 'react'
import Papa from 'papaparse'
import axiosInstance from '../../config/axiosConfig';
import {useNavigate} from 'react-router-dom'

function ProfesseurFichier () {

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
                        numero_tel: item.numero_tel,
                        metier: item.metier,
                        etablissement: item.etablissement,
                        role: item.role,
                        nb_eleve_tuteur: parseInt(item.nb_eleve_tuteur)
                    }))

                    console.log(formattedData)

                    try {
                        for (const rowData of formattedData) {
                          await axiosInstance.post('/professeurs', rowData);
                          console.log('Requête POST réussie pour:', rowData);
                        }
                        console.log('Toutes les requêtes POST ont été effectuées.');
                        history("/professeurs")
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
            <button onClick={handleFileUpload} className="btn">Ajouter les professeurs</button>
        </div>
    )
}

export default ProfesseurFichier