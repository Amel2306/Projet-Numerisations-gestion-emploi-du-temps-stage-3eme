import { useState, useEffect } from 'react';

import '../style/App.css';
import Home from "./Accueil/Home"
import Login from "./Authentification/Login"
import ProfForm from './Professeurs/ProfForm';
import Eleve from './Eleves/Eleve'
import Eleves from './Eleves/Eleves'
import {Routes, Route} from 'react-router-dom'
import EleveForm from './Eleves/EleveForm';
import EleveCreation from './Eleves/EleveCreation';
import Professeurs from './Professeurs/Professeurs';
import Activtes from './Activites/Activites';
import ActiviteForm from './Activites/ActiviteForm';
import ActiviteCreation from './Activites/ActiviteCreation'
import ParcoursGeneration from './Parcours/ParcoursGeneration';
import Parcours from './Parcours/Parcours';
import Activite from './Activites/Activite';
import Professeur from './Professeurs/Professeur'
import QuestionForm from './Questions/QuestionForm';
import Questions from './Questions/Questions';
import ReponsesEleves from './Reponses/ReponsesEleves';
import ReponsesProfesseurs from './Reponses/ReponsesProfesseurs';

function Rootes (props) {

    const user = props.user
    const setUser = props.setUser
    const semaine = props.semaine
    const setSemaine = props.setSemaine

    const [nbEleveMax, setNbEleveMax] = useState(() => {
        const storedValue = localStorage.getItem('nbEleveMax');
        return storedValue ? parseInt(storedValue) : 0;
    });

    const updateNbEleveMax = (newNbEleveMax) => {
        setNbEleveMax(newNbEleveMax);
    };

    useEffect(() => {
        localStorage.setItem('nbEleveMax', nbEleveMax.toString());
    }, [nbEleveMax]);

    return (
        <Routes>
            <Route exact path="/" element={<Home user={user}/>} />
            <Route path="/login/:personne" element={<Login/>} />

            <Route path="/profForm" element= {<ProfForm />} />
            <Route path='/professeurs' element= {<Professeurs/>} />
            <Route path='/professeur/:id' element= {<Professeur/>} />

            <Route path='/eleveForm' element= {<EleveForm/>} />        
            <Route exact path='/eleves' element= {<Eleves/>} />
            <Route path="/eleveCreation" element= {<EleveCreation/>} />
            <Route path='/eleve/:id' element={<Eleve nbEleveMax = {nbEleveMax}/>} />

            <Route path= '/activiteForm' element= {<ActiviteForm semaine={semaine}/>} />
            <Route path='/activite/:id' element={<Activite/>} />
            <Route path='/activites' element={<Activtes/>} />
            <Route path='/activiteCreation' element={<ActiviteCreation/>} />

            <Route path='/parcoursGeneration' element={
                <ParcoursGeneration 
                    semain={semaine} 
                    setSemaine={setSemaine} 
                    nbEleveMax = {nbEleveMax}
                    setNbEleveMax = {updateNbEleveMax}
                />} 
            />
            <Route path='/parcours' element={<Parcours semaine={semaine}/>} />

            <Route path='/questionForm' element={<QuestionForm/>} />
            <Route path='/questions' element={<Questions />} />

            <Route path='/reponsesEleves' element={<ReponsesEleves />} />
            <Route exact path='/reponses/:role' element={<ReponsesProfesseurs />} />
        </Routes>
    )
}

export default Rootes
