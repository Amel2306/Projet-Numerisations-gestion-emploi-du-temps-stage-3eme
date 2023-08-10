import React, { useState } from "react";
import Papa from "papaparse";
import axiosInstance from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

function ProfesseurFichier() {
  const history = useNavigate();

  const [selectFile, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const analyseMoment = (mom) => {
    return mom === "Oui" ? 1 : 0;
  };

  const analyseNbEleveTuteur = (nbEleveTuteur) => {
    return nbEleveTuteur || nbEleveTuteur === "" ? 0 : parseInt(nbEleveTuteur);
  };

  const handleFileUpload = () => {
    if (selectFile) {
      Papa.parse(selectFile, {
        header: true,
        complete: async (results) => {
          const data = results.data;
          console.log(data);
          const formattedData = data.map((item) => ({
            nom: item.nom,
            prenom: item.prenom,
            email: item.email,
            numero_tel: item.numeroTel,
            metier: item.metier,
            etablissement: item.etablissement,
            role: item.role,
            nb_eleve_tuteur: analyseNbEleveTuteur(item.nbEleveTuteur),
            nom_act: item.nomActivite,
            description: item.description,
            nb_realisations: parseInt(item.nbRealisations),
            nb_eleve_max: parseInt(item.nbEleveMax),
            l1: analyseMoment("Non"),
            l2: analyseMoment(item.crenau_l2),
            ma1: analyseMoment(item.crenau_ma1),
            ma2: analyseMoment(item.crenau_ma2),
            me1: analyseMoment(item.crenau_me1),
            me2: analyseMoment(item.crenau_me2),
            j1: analyseMoment(item.crenau_j1),
            j2: analyseMoment(item.crenau_j2),
            v1: analyseMoment(item.crenau_v1),
            v2: analyseMoment("Non"),
          }));

          console.log(formattedData);

          try {
            for (let rowData of formattedData) {
              const reponse = await axiosInstance.post("/professeurs", rowData);
              const professeurId = reponse.data.id;
              if (
                rowData.nom_act &&
                rowData.description &&
                rowData.nom_act !== ""
              ) {
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
                  professeurId,
                };
                axiosInstance.post("/activites", activiteData);
              }
            }
            history("/professeurs");
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
        Ajouter les accueillants
      </button>
    </div>
  );
}

export default ProfesseurFichier;
