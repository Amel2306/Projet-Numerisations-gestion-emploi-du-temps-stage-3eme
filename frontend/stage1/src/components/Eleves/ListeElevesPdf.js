import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import EleveDescrPdf from './EleveDescrPdf';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'left',
        justifyContent: 'space-between',
        paddingBottom: 50
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    },
    section: {
        marginBottom: 10,
        padding: 10,
        flexGrow: 1,
        break: 'after',
        fontSize: 15,
    }
});

function ListeEleves(props) {


    const eleves = props.eleves;
    const activiteId = props.activiteId
    const professeur = props.professeur
    const eleve = props.eleve

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>{
                    professeur ?  "Liste des élèves de " +  professeur.nom + " " + professeur.prenom 
                    : eleve ? "Liste des élèves du groupe de  " + eleve.nom + " " + eleve.prenom 
                    : activiteId ? "Liste des élèves pour l'activité " + activiteId : ""}</Text>
                </View>
                <View style={styles.section}>
                    {eleves &&
                        eleves.map((eleve) => (
                            <View key={eleve.id} style={styles.section}>
                                <EleveDescrPdf id={eleve.id}/>
                            </View>
                        ))}
                </View>
            </Page>
        </Document>
    );
}

export default ListeEleves;