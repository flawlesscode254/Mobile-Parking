import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image, Overlay } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "./../firebase";
import Parking from '../assets/parking.png'
import Parkings from '../assets/spinner.gif'
import {
  AdMobBanner,
  setTestDeviceIDAsync
} from "expo-ads-admob";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTestDeviceIDAsync("EMULATOR");
}, [])

  const login = async () => {
    await setVisible(!visible);
    await auth.signInWithEmailAndPassword(email, password)
      .then( async () => {
        // some stuff...
        await navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          shadowOffset: { width: 5, height: 5 },
          width: "90%",
          borderRadius: 5,
          alignSelf: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
      <AdMobBanner
          bannerSize="smartBanner"
          adUnitID="ca-app-pub-1575625881370911/2289997432" 
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(e) => console.log(e)}
          />
      </View>
      <Image
        source={Parking}
        style={styles.logo}
      />
      <View style={styles.loginContainer}>
        <Input
          placeholder="email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button containerStyle={styles.button} title="Login" onPress={login} />
        <Button
          containerStyle={styles.button}
          title="Register"
          type="outline"
          onPress={() => navigation.navigate("Register")}
        />
        <Overlay isVisible={visible}>
          <Image source={Parkings} style={styles.logo} />
        </Overlay>
      </View>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 5,
  },

  loginContainer: {
    width: 300,
  },

  input: {},

  button: {
    marginTop: 10,
  },
});
