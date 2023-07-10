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
                        nb_eleve_tuteur: parseInt(item.nb_eleve_tuteur),
                        nom_act: item.nomActivite,
                        description: item.description,
                        nb_realisations: parseInt(item.nb_realisations),
                        nb_eleve_max: parseInt(item.nb_eleve_max),
                        l1: parseInt(item.l1),
                        l2: parseInt(item.l2),
                        ma1: parseInt(item.ma1),
                        ma2: parseInt(item.ma2),
                        me1: parseInt(item.me1),
                        me2: parseInt(item.me2),
                        j1: parseInt(item.j1),
                        j2: parseInt(item.j2),
                        v1: parseInt(item.v1),
                        v2: parseInt(item.v2),                        
                    }))

                    console.log(formattedData)

                    try {
                        for (const rowData of formattedData) {
                          const reponse = await axiosInstance.post('/professeurs', rowData);
                          const professeurId = reponse.data.id                          
                          if (rowData.nom_act && rowData.description && rowData.j1) {
                            const activiteData = {
                                nom: rowData.nom_act,
                                description: rowData.description,
                                nb_realisations: rowData.nb_realisations,
                                nb_eleve_max: rowData.nb_eleve_max,
                                l1: rowData.l1,
                                l2: rowData.l2,
                                ma1: rowData.ma1,
                                ma2: rowData.ma2,
                                me1: rowData.me1,
                                me2: rowData.me2,
                                j1: rowData.j1,
                                j2: rowData.j2,
                                v1: rowData.v1,
                                v2: rowData.v2, 
                                professeurId
                            }
                            await axiosInstance.post('/activites', activiteData)                            
                          }
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