import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

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

    const [activite, setActivite] = useState(null)

    useEffect (()=> {
        axiosInstance.get(`/activites/${id}`)
        .then((res) => {
            setActivite(res.data);
        })
        .catch((err) => {
            console.log(err);
        });  
    }, [])

    return (
        activite &&
            <div>
                    <Text style={{backgroundColor: "#f5dfc8"}}>Activite : {activite.nom}</Text>
                    <Text style={{backgroundColor: "#f5dfc8"}} >Description : {activite.description}</Text>
                    <Text style={{backgroundColor: "#f5dfc8"}} >Nombre de réalisation: {activite.nb_realisations}</Text>
                    <Text style={{backgroundColor: "#f5dfc8"}} >Nombre d'élèves au maximum: {activite.nb_eleve_max}</Text>
                    <Text style={{backgroundColor: "#f5dfc8"}} >id : {activite.id}</Text>              
            </div>

    );
}

export default ActiviteDescrPdf
