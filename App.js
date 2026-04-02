import { useState } from "react";
import { ChatBot } from "./pages/ChatBot";
import { RandomUser } from "./pages/RandomUser";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [isChatBot, setIsChatBot] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonHeader}
          onPress={() => setIsChatBot(false)}
        >
          <View style={styles.titleRandomUserView}>
            <Text style={styles.titleRandomUserText}>Random User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHeader}
          onPress={() => setIsChatBot(true)}
        >
          <View style={styles.titleChatView}>
            <Text style={styles.titleChatText}>ChatBot</Text>
          </View>
        </TouchableOpacity>
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
  header: {
    marginTop: 1,
    flexDirection: "row",
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  titleRandomUserText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  buttonHeader: {
    justifyContent: "center",
    width: 170,
    height: 60,
  },
  titleChatView: {
    height: 60,
    borderLeftWidth: 1,
    justifyContent: "center",
  },
  titleRandomUserView: {
    height: 60,
    justifyContent: "center",
  },
});
