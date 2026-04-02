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
  const [chat, setChat] = useState([]);
  const [prompt, setPrompt] = useState(null);

  async function enviarParaIa(texto) {
    texto = texto.trim();
    if (texto == "" || texto == null) return;
    setPrompt("");

    var textUser = {
      id: (Date.now() - Math.random()).toString(),
      isUser: true,
      response: texto,
    };
    setChat((chatAnterior) => [...chatAnterior, textUser]);

    try {
      const resposta = await sendToGeminiIA(texto);
      const isErrorResposta =
        resposta === "Limite de API excedido. Tente novamente mais tarde.";
      var respostaAPI = {
        id: (Date.now() - Math.random()).toString(),
        isUser: false,
        isError: isErrorResposta,
        response: resposta,
      };
      setChat((chatAnterior) => [...chatAnterior, respostaAPI]);
    } catch (error) {
      console.error("Erro na chamada da API:", error);
    }
  }

  return (
    <View style={styles.containerInterno}>
      <Text>
        {chat.length > 0 && (
          <FlatList
            data={chat}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={
                  item.isError
                    ? styles.listError
                    : item.isUser
                      ? styles.listUser
                      : styles.listIA
                }
              >
                <Text
                  style={
                    item.isError
                      ? styles.textListError
                      : item.isUser
                        ? styles.textListUser
                        : styles.textListIA
                  }
                >
                  {item.response}
                </Text>
              </View>
            )}
            style={styles.list}
          />
        )}
      </Text>
      <View style={styles.userInteract}>
        <TextInput
          style={styles.input}
          placeholder="Pergunte alguma coisa..."
          onChangeText={(prompt) => setPrompt(prompt)}
          defaultValue={prompt}
          value={prompt}
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
  );
}

const styles = StyleSheet.create({
  containerInterno: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    maxHeight: 700,
    width: 340,
    borderBottomLeftRadius: 35,
    borderBottomEndRadius: 35,
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
    outlineStyle: "none",
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
  textListUser: {
    backgroundColor: "#6366F1",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomEndRadius: 8,
    padding: 15,
    width: 230,
    color: "#ffffff",
  },
  textListIA: {
    backgroundColor: "#efeeee",
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomEndRadius: 8,
    padding: 15,
    width: 230,
    color: "#000000",
  },
  textListError: {
    backgroundColor: "#b74646",
    borderRadius: 8,
    padding: 15,
    width: 230,
    color: "#000000",
    textAlign: "center",
    color: "#ffffff",
  },
  listIA: { alignItems: "flex-start", marginTop: 20, textAlign: "justify" },
  listUser: { alignItems: "flex-end", marginTop: 20, textAlign: "justify" },
  listError: { alignItems: "center", marginTop: 20, textAlign: "justify" },
  list: {
    height: 535,
    width: 310,
  },
});
