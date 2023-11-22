import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";

const stylesAct = StyleSheet.create({
  titre: {
    margin: 10,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: "20px",
  },
  text: {
    fontSize: "5px",
    marginBottom: 10,
    margin: 30,
  },
});

function EleveDescrPdf(props) {
  const id = props.id;

  const [eleve, setEleve] = useState(null);

  const couleur = props.couleur ? props.couleur : "#F2D1C9";

  useEffect(() => {
    axiosInstance
      .get(`/eleves/${id}`)
      .then((res) => {
        setEleve(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    eleve && (
      <div>
        <View style={{ background: couleur }}>
          <Text>
            {eleve.nom} {eleve.prenom}
          </Text>
          <Text>Numéro de téléphone de l'élève : {eleve.numero_tel}</Text>
          <Text>Email de l'élève : {eleve.email}</Text>
          <Text>numéro de parcours : {eleve.parcoursId}</Text>
        </View>
      </div>
    )
  );
}

export default EleveDescrPdf;
