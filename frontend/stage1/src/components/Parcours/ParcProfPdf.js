import React from "react";
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

function ParcProfPdf(props) {
  const activites = props.activites;
  const tab_moments = props.tab_moments;
  const nom = props.nom;
  const prenom = props.prenom;

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
        <View style={styles.header}>
          <Text>{"Parcours de " + nom + " " + prenom}</Text>
        </View>
        <View style={styles.section}>
          {activites &&
            Object.entries(activites).map(([index, moments]) => (
              <div key={index}>
                <Text style={{ fontSize: "20", color: moments_colors[index] }}>
                  {" "}
                  {moments.length > 0 && tab_moments && tab_moments[index]}{" "}
                </Text>
                {moments.length > 0 &&
                  moments.map((moment, momentIndex) => (
                    <ul key={momentIndex}>
                      {moment && moment[0] && (
                        <View style={styles.section}>
                          <ActiviteDescrPdf
                            id={moment[0].activiteId}
                            couleur={moments_colors[moment[0].indexMoment]}
                            indexMoment={moment[0].indexMoment}
                            role={"prof"}
                          />
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
