import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import { useState } from "react";

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

function QuestionPdf(props) {
  const questionnaire = props.questionnaire;
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/questions/questionnaire/${questionnaire}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{"Questions pour " + questionnaire}</Text>
        </View>
        <View>
          {questions &&
            questions.map((question) => (
              <View style={styles.section}>
                <Text>{question.contenu}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
}

export default QuestionPdf;
