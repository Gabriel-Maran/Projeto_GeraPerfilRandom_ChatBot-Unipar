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
          style={[
            styles.buttonsHeader,
            isChatBot && {
              borderTopLeftRadius: 35,
              borderBottomWidth: 1,
              backgroundColor: "#e6e6e6",
            },
          ]}
          onPress={() => setIsChatBot(false)}
        >
          <View style={styles.titleRandomUserView}>
            <Text style={styles.titleRandomUserText}>Random User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonsHeader,
            !isChatBot && {
              borderTopRightRadius: 35,
              borderBottomWidth: 1,
              backgroundColor: "#e6e6e6",
            },
          ]}
          onPress={() => setIsChatBot(true)}
        >
          <View style={styles.titleChatView}>
            <Text style={[styles.titleChatText]}> ChatBot</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 35,
    borderTopEndRadius: 35,
    width: 340,
    boxShadow: "0px 10px 15px -5px rgba(0, 0, 0, 0.2);",
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
  titleChatView: {
    height: 90,
    borderLeftWidth: 1,
    justifyContent: "center",
  },
  titleRandomUserView: {
    height: 90,
    justifyContent: "center",
  },
  buttonsHeader: {
    justifyContent: "center",
    width: 170,
    height: 90,
  },
});
