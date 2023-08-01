import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import EleveDescrPdf from '../Eleves/EleveDescrPdf';

const stylesAct = StyleSheet.create({
    titre: {
        margin: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: '20px'
    },
    text: {
        fontSize: "5px",
        marginBottom: 10,
        margin: 30
    }
});

function ActiviteDescrPdf(props) {

    const id = props.id
    const indexMoment = props.indexMoment
    const role = props.role

    const [activite, setActivite] = useState(null)
    const [eleves, setEleves] = useState(null)

    useEffect (()=> {
        axiosInstance.get(`/activites/${id}`)
        .then((res) => {
            setActivite(res.data);
        })
        .catch((err) => {
            console.error(err);
        });  
    }, [])

    useEffect (() => {
        axiosInstance.get(`/eleves/activite/${id}/${indexMoment}`)
        .then ((res) => {
            setEleves(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [id, indexMoment])

    return (
        activite &&
            <div>
                <View>
                    <Text style={{backgroundColor: "#f5dfc8"}}>Activite : {activite.nom}</Text>
                    <Text style={{backgroundColor: "#f5dfc8"}}>Description : {activite.description}</Text>
                    <Text style={{backgroundColor: "#f5dfc8"}}>Nombre de réalisation: {activite.nb_realisations}</Text>
                    <Text style={{backgroundColor: "#f5dfc8"}}>Nombre d'élèves au maximum: {activite.nb_eleve_max}</Text>
                    <Text style={{backgroundColor: "#f5dfc8"}}>id : {activite.id}</Text>                      
                </View>
                {role === "prof" && eleves && (
                    <View>
                        <Text style={{fontSize: "20px"}}>{eleves && "Liste des élèves pour l'activité"}</Text>
                       {eleves && eleves.map((eleve) => (
                            <View key={eleve.id}>
                                <EleveDescrPdf id={eleve.id}/>
                            </View>
                       ))}
                    </View>                    
                )}
            </div>
    );
}

export default ActiviteDescrPdf
