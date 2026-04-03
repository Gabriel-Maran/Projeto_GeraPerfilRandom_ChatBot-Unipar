import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { getRandomUser } from "../api/api";

import { useEffect, useState } from "react";

export function RandomUser() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

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
    return <Text>Carregando...</Text>;
  }

  return (
    <>
      <Text style={styles.title}>GERADOR DE PERFIL</Text>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: dados?.picture?.large }} />

        <View style={styles.info}>
          <Text style={styles.name}>
            {dados?.name?.first} {dados?.name?.last}
          </Text>
        </View>

        <View style={styles.inputs}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            value={dados?.email}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha gerada:</Text>
          <TextInput
            style={styles.input}
            value={dados?.login?.password}
            secureTextEntry={true}
            editable={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 150,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
