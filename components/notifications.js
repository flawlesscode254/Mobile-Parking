import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import { Button, Overlay } from 'react-native-elements'
import Detailed from './detailed'
import { db } from '../firebase'
import { auth } from '../firebase'
import {
  AdMobBanner,
  setTestDeviceIDAsync,
} from "expo-ads-admob"

const check = () => {
  const [stream, setStream] = useState([])
  const [visible, setVisible] = useState(false);

  useEffect(() => {
      setTestDeviceIDAsync("EMULATOR");
  }, [])

  const Reveal = async () => {
      await setVisible(!visible);
      await db.collection('orders')
      .where("email", '==', auth?.currentUser?.email)
      .onSnapshot(snapshot => {
        setStream(snapshot.docs.map(doc => (
          {
            id: doc.id,
            name: doc.data().name,
            phone: doc.data().phone,
            plate: doc.data().plate,
            city: doc.data().city,
            parking: doc.data().parking
          })))
      }) 
      await setVisible(visible)
  }


  return (
      <SafeAreaView>
        <ScrollView>
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
          adUnitID="ca-app-pub-1575625881370911/6730615952" 
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(e) => console.log(e)}
          />
      </View>
        <View style={{
          marginTop: 10,
          marginBottom: 10
        }}>
          <Button title="View Your Credentials" onPress={Reveal} />
        </View>
        <View>
            <Overlay isVisible={visible}>
              <Text>Fetching...</Text>
            </Overlay>
        </View>
        
          {stream.map(({id, name, phone, plate, city, parking}) => (
            <View>
              <Detailed
                key={id}
                name={name}
                phone={phone}
                plate={plate}
                city={city}
                parking={parking}
              />
              </View>
          ))}
        
        </ScrollView>
     
      </SafeAreaView>
  );
};

export default check;

const styles = StyleSheet.create({});
