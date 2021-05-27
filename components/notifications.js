import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Overlay } from 'react-native-elements'
import Detailed from './detailed'
import { db } from '../firebase'
import { ScrollView } from "react-native";
import { auth } from '../firebase'

const check = () => {
  const [stream, setStream] = useState([])
  const [visible, setVisible] = useState(false);

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
            plate: doc.data().plate
          })))
      }) 
      await setVisible(visible)
  }


  return (
      <SafeAreaView>
        <ScrollView>
             <View
          style={{
            backgroundColor: "#5359D1",
            borderRadius: 10,
            padding: 20,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 20,
            }}
          >
            Naivas Supermarket Parking
          </Text>
          <Text
            style={{
              color: "orange",
            }}
          >
            Kericho Town
          </Text>
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
        
          {stream.map(({id, name, phone, plate}) => (
            <View id={id} >
              <Detailed
                name={name}
                phone={phone}
                plate={plate}
              />
              </View>
          ))}
        
        </ScrollView>
     
      </SafeAreaView>
  );
};

export default check;

const styles = StyleSheet.create({});
