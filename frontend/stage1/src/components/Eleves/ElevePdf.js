import { useState, useEffect } from 'react'
import {Document, Page, View, StyleSheet, Text} from '@react-pdf/renderer'
import axiosInstance from '../../config/axiosConfig'
import EleveDescrPdf from './EleveDescrPdf'
import ListeEleves from './ListeElevesPdf'
import QuestionQuestionnaire from '../Questions/QuestionQuestionnaire'
import ActiviteDescrPdf from '../Activites/ActiviteDescrPdf'

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


function ElevePdf (props) {

    const eleve = props.eleve

    const moment = [
        "Lundi Matin",
        "Lundi Aprés-midi",
        "Mardi Matin",
        "Mardi Aprés-midi",
        "Mercredi Matin",
        "Mercredi Aprés-midi",
        "Jeudi Matin",
        "Jeudi Aprés-midi",
        "Vendredi Matin",
        "Vendredi Aprés-midi"
    ]

    const [activites, setActivites] = useState(null)
    const [groupe, setGroupe] = useState(null)

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
        axiosInstance.get(`/eleves/binome/${eleve.id}`)
        .then((res) => {
            setGroupe(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])

    return (
        <Document>
            <Page>
                <View>
                    <EleveDescrPdf id={eleve.id}/>
                </View>
                <View style={styles.section}>
                    {activites &&
                        activites.map((act) => (
                            <View key={act.activiteId} style={styles.section}>
                                <Text style={{ color: 'green', paddingBottom: "12px" }}>{moment[act.indexMoment]}</Text>
                                <ActiviteDescrPdf id={act.activiteId} style={{backgroundColor: '#cfbba5'}} />
                            </View>
                        ))}
                </View>    
                <View>
                    <ListeEleves eleves={groupe} />               
                </View>
                <View>
                    <QuestionQuestionnaire questionnaire="Eleve" />                     
                </View>  
            </Page>
        </Document>
    )

}

export default ElevePdf