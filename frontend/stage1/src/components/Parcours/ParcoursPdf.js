import React, { useContext, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ActiviteDescrPdf from "../Activites/ActiviteDescrPdf";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "left",
    paddingBottom: 50,
    paddingTop: 50,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 30,
    color: "red",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    flexGrow: 1,
    break: "after",
    fontSize: 15,
  },
});

function ParcoursPdf(props) {
  const activites = props.activites;
  const tab_moments = [
    "Lundi Matin",
    "Lundi Aprés-midi",
    "Mardi Matin",
    "Mardi Aprés-midi",
    "Mercredi Matin",
    "Mercredi Aprés-midi",
    "Jeudi Matin",
    "Jeudi Aprés-midi",
    "Vendredi Matin",
    "Vendredi Aprés-midi",
  ];

  const moments_colors = [
    "#D0FCB3",
    "#9EC9A8",
    "#85B0A3",
    "#6C969D",
    "#6A7780",
    "#685762",
    "#826F75",
    "#9B8787",
    "#B59F99",
    "#CEB6AB",
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {activites &&
            activites.map((act) => (
              <View key={act.activiteId} style={styles.section}>
                <Text style={{ color: "green", paddingBottom: "12px" }}>
                  {tab_moments && tab_moments[act.indexMoment]}
                </Text>
                <ActiviteDescrPdf
                  id={act.activiteId}
                  couleur={moments_colors[act.indexMoment]}
                  style={{ backgroundColor: moments_colors[act.indexMoment] }}
                />
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
}

export default ParcoursPdf;
