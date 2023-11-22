import React from 'react';
import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";
import ElevePdf from './ElevePdf';

function ElevesPdf (props) {
   const eleves = props.eleves;
   return (
    eleves && 
    <Document>
        {eleves && eleves.map((eleve) => {
            if (eleve.parcoursId !== null) {
                return (
                    <ElevePdf id={eleve.id} key={eleve.id} />
                )
            }
        })}
    </Document>
   )
}

export default ElevesPdf