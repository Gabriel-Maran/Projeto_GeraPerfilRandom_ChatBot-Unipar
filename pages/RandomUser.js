import { View, Text, Image, StyleSheet } from "react-native";

import { useEffect, useState } from "react";


export function RandomUser() {

  const [dados, setDados] = useState(null);


  useEffect (async  () => {
      try {
          const response = await fetch("https://randomuser.me/api/");
          const data = await response.json();
          setDados(data.results[0]);
      }
      catch (error) { 
          console.error("Erro ao buscar dados do usuário:", error);
      }
  }, []);

  return (
    <>
       <Text style={styles.title}>GERADOR DE PERFIL</Text>
    <View style={styles.container}>

      <Image style={styles.image}
        source={{ uri: dados?.picture?.large }}
    />
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
