import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import  ActiviteDescrPdf from '../Activites/ActiviteDescrPdf';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'left',
        justifyContent: 'space-between',
        paddingBottom: 50,
        paddingTom: 50
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

function ParcoursPdf(props) {

    const activites = props.activites;
    const moment = props.moment;
    const eleve= props.eleve 

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {activites &&
                        activites.map((act) => (
                            <View key={act.activiteId} style={styles.section}>
                                <Text style={{ color: 'green', paddingBottom: "12px" }}>{moment[act.indexMoment]}</Text>
                                <ActiviteDescrPdf id={act.activiteId} style={{backgroundColor: '#cfbba5'}} />
                            </View>
                        ))}
                </View>
            </Page>
        </Document>
    );
}

export default ParcoursPdf;