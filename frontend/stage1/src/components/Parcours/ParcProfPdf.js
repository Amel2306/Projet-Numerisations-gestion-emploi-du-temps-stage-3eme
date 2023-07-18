import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import  ActiviteDescrPdf from '../Activites/ActiviteDescrPdf';


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


function ParcProfPdf(props) {

    const activites = props.activites;
    const tab_moment = props.tab_moment;
    const nom = props.nom
    const prenom = props.prenom

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>{"Parcours de " + nom +" " + prenom }</Text>
                </View>
                <View style={styles.section}>
                {activites && Object.entries(activites).map(([index, moments]) => (
                    <div key={index}>
                        <Text> {moments.length > 0  && tab_moment[index]} </Text>
                        {moments.length > 0 && moments.map((moment, momentIndex) => (
                            <ul key={momentIndex}>
                            {moment && moment[0] && (
                                <View style={styles.section}>
                                    <ActiviteDescrPdf id={moment[0].activiteId} indexMoment = {moment[0].indexMoment} role={"prof"}/>                    
                                </View>
                            )}
                            </ul>
                        ))}
                    </div>
                ))}
                </View>
            </Page>
        </Document>
    );
}

export default ParcProfPdf;