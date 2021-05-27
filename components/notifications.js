import React, { useState } from "react";
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
