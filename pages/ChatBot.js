import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { sendToGeminiIA } from "../api/api";
import { useState } from "react";

export function ChatBot() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [chat, setChat] = useState([{ id: 0, isUser: false, response: "" }]);
  const [prompt, setPrompt] = useState(null);

  function enviarParaIa(texto) {
    setChat([
      ...chat,
      { id: crypto.randomUUID(), isUser: false, response: texto },
    ]);
    setPrompt("");
    if (prompt != null) {
      const resposta = sendToGeminiIA(texto);
      setChat([
        ...chat,
        { id: crypto.randomUUID(), isUser: false, response: resposta },
      ]);
    } else {
      setErrorMessage("O input não pode ser null");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInterno}>
        <Text>
          <FlatList
            data={chat}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.textList}>{item.response}</Text>
            )}
            style={styles.list}
          />
        </Text>
        <View style={styles.userInteract}>
          <TextInput
            style={styles.input}
            placeholder="Pergunte alguma coisa..."
            onChangeText={(prompt) => setPrompt(prompt)}
            defaultValue={prompt}
            multiline={true}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => enviarParaIa(prompt)}
          >
            <Image
              source={require("../assets/arrowUp.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInterno: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 700,
    width: 340,
    borderRadius: 35,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2);",
  },
  userInteract: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    width: 300,
    borderWidth: 2,
    borderColor: "#cacaca",
    borderRadius: 35,
    borderStyle: "solid",
    padding: 15,
  },
  input: {
    alignContent: "center",
    color: "#4e4e4e",
    outlineColor: "#ffffff",
    width: 230,
  },
  button: {
    borderColor: "#cacaca",
    borderWidth: 1,
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
  textList: {
    color: "#000000",
  },
  list: {
    height: 500,
  },
});
