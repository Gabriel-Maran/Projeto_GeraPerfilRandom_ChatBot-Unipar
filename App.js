import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-web";
import { enviarParaIA } from "./api/api/";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{}</Text>
      <Button
        title="TESTE"
        onPress={async () => {
          const teste = await enviarParaIA("Quanto é 1+1?");
          console.log(teste);
        }}
      ></Button>
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
});
