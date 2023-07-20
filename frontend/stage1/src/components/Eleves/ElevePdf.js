import { useState, useEffect, useContext } from 'react'
import {Document, Page, View, StyleSheet, Text} from '@react-pdf/renderer'
import axiosInstance from '../../config/axiosConfig'
import EleveDescrPdf from './EleveDescrPdf'
import ActiviteDescrPdf from '../Activites/ActiviteDescrPdf'
import {MomentsContext} from "../../utils/tabMoments"


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
    },
    title: {
        margin: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: '20px'
    },
});


function ElevePdf (props) {

    const eleve = props.eleve

    const {tab_moments} = useContext(MomentsContext);

    const [activites, setActivites] = useState(null)
    const [groupe, setGroupe] = useState(null)
    const [tuteur, setTuteur] = useState(null)

    useEffect (() => {

        axiosInstance.get(`/activiteparcours/${eleve.parcoursId}`)
        .then ((res) =>{
            setActivites(res.data)
        })
        .catch ((err) => {
            console.error(err)
        })

    }, [])

    useEffect(() =>{
        axiosInstance.get(`/eleves/groupe/${eleve.id}`)
        .then((res) => {
            setGroupe(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    useEffect(() =>{
        axiosInstance.get(`/professeurs/${eleve.professeurId}`)
        .then((res) => {
            setTuteur(res.data)
        })
        .then((err) => {
            console.error(err)
        })
    }, [])


    return (
        <Document>
            <Page>
                <Text style={styles.header}>{eleve.nom + " " + eleve.prenom}</Text>
                <View style={styles.section}>
                    <EleveDescrPdf id={eleve.id}/>
                </View>
                <View style={styles.section}>
                    {activites &&
                        <>
                            <Text style={styles.title}>Mon parcours : </Text>
                            {activites.map((act) => (
                                <View key={act.activiteId} style={styles.section}>
                                    <Text style={{ color: 'green', paddingBottom: "12px" }}>{tab_moments && tab_moments[act.indexMoment]}</Text>
                                    <ActiviteDescrPdf id={act.activiteId} style={{backgroundColor: '#cfbba5'}} />
                                </View>
                            ))}                  
                        </>
                    }
                </View>    
                <View style={styles.section}>
                    <Text style={styles.title}>Mon groupe : </Text>
                    {groupe && groupe.map((eleve) => (
                        <EleveDescrPdf id={eleve.id} />
                    ))}              
                </View>
                {tuteur && (
                    <View style={styles.section}>
                        <Text style={styles.title}>Mon tuteur {tuteur.nom + " " + tuteur.prenom + " :" }</Text>
                        <Text> email : {tuteur.email}</Text>
                        <Text> metier : {tuteur.metier}</Text>
                        <Text> etablissement : {tuteur.etablissement}</Text>
                    </View>
                )}
            </Page>
        </Document>
    )

}

export default ElevePdf