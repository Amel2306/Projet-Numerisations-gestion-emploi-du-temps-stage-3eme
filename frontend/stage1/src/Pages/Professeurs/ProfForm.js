import axiosInstance from "../../config/axiosConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfesseurFichier from "../../components/Professeurs/ProfesseurFichier";

function ProfForm() {
  const userRole = localStorage.getItem("userRole");

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numero_tel, setNum] = useState("");
  const [metier, setMetier] = useState("");
  const [etablissement, setEtablissement] = useState("");
  const [role, setRole] = useState("");
  const [nb_eleve_tuteur, setNombre] = useState(0);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nom,
      prenom,
      email,
      numero_tel,
      metier,
      etablissement,
      role,
      nb_eleve_tuteur,
      password
    };

    axiosInstance
      .post("/professeurs", data)
      .then((response) => {
        const profId = response.data.id;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h3>Formulaire accueillant</h3>
      <form onSubmit={handleSubmit}>
        <div className="label-form">
          <label>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            required
          />
        </div>
        <div className="label-form">
          <label>Prenom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prenom"
            required
          />
        </div>
        <div className="label-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="label-form">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="label-form">
          <label>Numéro de téléphone</label>
          <input
            type="text"
            value={numero_tel}
            onChange={(e) => setNum(e.target.value)}
            placeholder="Numéro de téléphone"
            required
          />
        </div>
        <div className="label-form">
          <label>Métier</label>
          <input
            type="text"
            value={metier}
            onChange={(e) => setMetier(e.target.value)}
            placeholder="Métier"
            required
          />
        </div>
        <div className="label-form">
          <label>Établissement/labo/...</label>
          <input
            type="text"
            value={etablissement}
            onChange={(e) => setEtablissement(e.target.value)}
            placeholder="Établissement..."
            required
          />
        </div>
        <div className="label-form">
          <label>Je souhaite être...</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Encadrant">Encadrant d'une activité</option>
            <option value="Tuteur">Tuteur d'un élève</option>
            <option value="Encadrant et Tuteur">Tuteur et encadrant</option>
            {userRole && userRole === "Admin" && (
              <option value="Admin">Admin</option>
            )}{" "}
            {/* uniquement l'admin peut créer de nouveaux admin*/}
          </select>
        </div>

        {(role === "Tuteur" ||
          role === "Encadrant et Tuteur" ||
          role === "Admin") && (
          <div className="label-form">
            <label>Je souhaite être tuteur de combien d'élève ?</label>
            <input
              type="number"
              value={nb_eleve_tuteur}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        )}

        {role === "Tuteur" ? (
          <button className="btn">Valider</button>
        ) : (
          <button className="btn">
            <Link className="link" to="/activiteForm">
              Ajouter une activité
            </Link>
          </button>
        )}
      </form>
      {userRole && userRole === "Admin" && <ProfesseurFichier />}
    </div>
  );
}

export default ProfForm;
