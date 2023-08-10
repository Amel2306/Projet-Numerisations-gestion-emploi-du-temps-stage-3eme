import React, { useState } from "react";
import Papa from "papaparse";
import axiosInstance from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

function ActiviteFichier() {
  const history = useNavigate();

  const [selectFile, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleFileUpload = () => {
    if (selectFile) {
      Papa.parse(selectFile, {
        header: true,
        complete: async (results) => {
          const data = results.data;

          const formattedData = data.map((item) => ({
            nom: item.nomActivite,
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
            professeurId: parseInt(item.professeurId),
          }))(formattedData);

          try {
            for (const rowData of formattedData) {
              await axiosInstance.post("/activites", rowData);
            }
            history("/activites");
            window.location.reload();
          } catch (error) {
            console.error(
              "Une erreur s'est produite lors de l'envoi des données:",
              error
            );
          }
        },
      });
    }
  };

  return (
    <div>
      <label>Veuillez joindre votre fichier </label>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} className="btn">
        Ajouter les activités
      </button>
    </div>
  );
}

export default ActiviteFichier;
