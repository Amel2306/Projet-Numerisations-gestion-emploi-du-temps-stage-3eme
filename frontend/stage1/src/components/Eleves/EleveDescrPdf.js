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

function EleveDescrPdf(props) {

    const id = props.id

    const [eleve, setEleve] = useState(null)

    useEffect (()=> {
        axiosInstance.get(`/eleves/${id}`)
        .then((res) => {
            setEleve(res.data);
        })
        .catch((err) => {
            console.log(err);
        });  
    }, [])


    return (
        eleve &&
            <div>
                <View style={{backgroundColor: "#f5dfc8"}}>
                    <Text>{eleve.nom} {eleve.prenom}</Text>
                    <Text>Numéro de téléphone de l'élève : {eleve.numero_tel}</Text>
                    <Text>Email de l'élève : {eleve.email}</Text>
                    <Text>établissement de l'élève : {eleve.etablissement}</Text>
                    <Text>id : {eleve.id}</Text>                                  
                </View>
            </div>

    );
}

export default EleveDescrPdf
