import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Input, Button, Text, Image, Overlay } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "./../firebase";
import Parking from '../assets/spinner.gif'


const register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const register = async () => {
      await setVisible(!visible);
      await auth.createUserWithEmailAndPassword(email, password)
      .then( async (authUser) => {
        await authUser.user.updateProfile({
          displayName: name
        });
        await navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "go to login",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create an account
      </Text>
      <View style={styles.registerContainer}>
        <Input placeholder="Name" type="text" value={name} onChangeText={(text) => setName(text)} />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button raised onPress={register} title="Register" />
        <Overlay isVisible={visible}>
          <Image source={Parking} style={styles.logo} />
        </Overlay>
      </View>  
    </KeyboardAvoidingView>
  )
}

export default register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  registerContainer: {
    width: 300,
  },
  logo: {
    width: 150,
    height: 150,
  },
})


