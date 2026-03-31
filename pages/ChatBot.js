import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { sendToGeminiIA } from "../api/api";
import { useState } from "react";

export function ChatBot() {
  const [userPrompt, setUserPrompt] = useState(null);
  const [iaResponse, setIAResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <View style={styles.container}>
      <Text>{iaResponse}</Text>
      <View style={styles.userInteract}>
        <TextInput
          style={styles.input}
          placeholder="Pergunte alguma coisa..."
          onChangeText={(userPrompt) => setUserPrompt(userPrompt)}
          defaultValue={userPrompt}
          multiline={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (userPrompt != null) {
              setIAResponse(sendToGeminiIA(userPrompt));
            } else {
              setErrorMessage("O input não pode ser null");
              console.log("ABC");
            }
          }}
        >
          <Image
            source={require("../assets/arrowUp.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userInteract: {
    backgroundColor: "#838282",
    flexDirection: "row",
    width: 340,
    borderWidth: 2,
    borderColor: "#838282",
    borderRadius: 35,
    borderStyle: "solid",
    padding: 15,
    position: "absolute",
    bottom: 90,
  },
  input: {
    alignContent: "center",
    color: "#e4e1e1",
    outlineColor: "#ffffff",
    width: 270,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#ffffff",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "#ffffff",
  },
});
