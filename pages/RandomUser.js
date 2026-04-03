import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getRandomUser } from "../api/api";

import { useEffect, useState } from "react";

export function RandomUser() {
  const [dados, setDados] = useState(null);
  const [isLockPassWord, setIsLockPassWord] = useState(true);
  const [carregando, setCarregando] = useState(true);
  async function reloadData() {
    setIsLockPassWord(true);
    setCarregando(true);
    const user = await getRandomUser();
    setDados(user);
    setCarregando(false);
  }
  useEffect(() => {
    const loadData = async () => {
      setCarregando(true);
      const user = await getRandomUser();
      setDados(user);
      setCarregando(false);
    };
    loadData();
  }, []);

  if (carregando) {
    return (
      <View style={styles.carregandoView}>
        <Text style={styles.carregandoText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: dados.picture.large }} />
        <TouchableOpacity
          onPress={() => reloadData()}
          style={styles.refreshView}
        >
          <Image
            style={styles.iconRefresh}
            source={require("../assets/reload.png")}
          />
        </TouchableOpacity>
        <View style={styles.mainView}>
          <Text style={styles.nameText}>
            {dados.name.first} {dados.name.last}
          </Text>
          <Text style={styles.emailTextMain}>{dados.email}</Text>
        </View>

        <View style={styles.inputs}>
          <View style={styles.emailView}>
            <Image
              source={require("../assets/mail.png")}
              style={styles.iconImage}
            />
            <TextInput
              style={styles.input}
              value={dados.email}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.senhaView}>
            <TouchableOpacity
              onPress={() => setIsLockPassWord(() => !isLockPassWord)}
            >
              <Image
                source={
                  isLockPassWord
                    ? require("../assets/lock.png")
                    : require("../assets/unlock.png")
                }
                style={styles.iconImage}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={dados.login.password}
              editable={false}
              secureTextEntry={isLockPassWord}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  carregandoView: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 670,
    width: 340,
  },
  carregandoText: {
    fontSize: 32,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    maxHeight: 670,
    width: 340,
    borderBottomLeftRadius: 35,
    borderBottomEndRadius: 35,
    boxShadow: "0px 10px 15px -5px rgba(0, 0, 0, 0.2);",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "rgb(255, 255, 255)",
    marginTop: 120,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2);",
  },
  mainView: {
    marginTop: 20,
  },
  nameText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  emailTextMain: {
    fontSize: 14,
    color: "#1b21c6",
    marginTop: 3,
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  emailView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#f6f6f6",
    width: 280,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#edeaea",
  },
  senhaView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f6f6f6",
    width: 280,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#edeaea",
  },
  input: {
    fontSize: 12,
  },
  iconRefresh: {
    width: 22,
    height: 22,
  },
  refreshView: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5F62E9",
    width: 34,
    height: 34,
    borderRadius: 100,
    top: 210,
    right: 115,
  },
});
