import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import CircularProgress from 'react-native-circular-progress-indicator';

const API_KEY = "978b166afbmsh9297029982f7046p10583djsn5a30ffbd3c29";
const BACKEND_URL = "https://tan-prickly-cheetah.cyclic.app/api"; 

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lovePercentage, setLovePercentage] = useState("");
  const [error, setError] = useState(null);

  const handleCalculateLovePercentage = async () => {
    try {
      const response = await axios.get(
        "https://love-calculator.p.rapidapi.com/getPercentage",
        {
          params: {
            sname: firstName,
            fname: secondName,
          },
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
          },
        }
      );

      console.log(response.data);
      setLovePercentage(response.data.percentage);
      setError(null);

      // Post the love percentage to the backend
      const postData = {
        fname:firstName,
        lname:secondName,
        percent: response.data.percentage,
      };
      
      await axios.post(`${BACKEND_URL}/love`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Love Calculator</Text>
      <View style={styles.inputContainer}>
        <Text>Your Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Partner's Name:</Text>
        <TextInput
          style={styles.input}
          value={secondName}
          onChangeText={(text) => setSecondName(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCalculateLovePercentage}>
        <Text style={styles.buttonText}>Calculate Love Percentage</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
      {lovePercentage !== "" && (<>
        <Text style={styles.result}>
          Love Percentage between {firstName} and {secondName}: {lovePercentage}%
        </Text>
        
        </>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  result: {
    fontSize: 18,
    marginTop: 16,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 16,
  },
});

export default App;
