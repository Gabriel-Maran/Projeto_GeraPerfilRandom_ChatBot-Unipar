import { useState } from "react";
import { ChatBot } from "./pages/ChatBot";
import { RandomUser } from "./pages/RandomUser";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [isChatBot, setIsChatBot] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.titleChat}>
        <Text style={styles.titleChatText}>ChatBot</Text>
      </View>
      {isChatBot && <ChatBot />}
      {!isChatBot && <RandomUser />}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2);",
  },
  titleChat: {
    marginTop: 1,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 35,
    borderTopEndRadius: 35,
    width: 340,
    borderBottomWidth: 1,
    backgroundColor: "#ffffff",
  },
  titleChatText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
