import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import prof from '../assets/prof.png'
import { auth } from '../firebase'
import { Image } from 'react-native-elements'

const detailed = ({name, phone, plate, city, parking}) => {
    return (
      <View>
         <View
          style={{
            backgroundColor: "#5359D1",
            borderRadius: 10,
            padding: 20,
            marginTop: 5,
            flex: 1,
            flexWrap: 'wrap'
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 20,
            }}
          >
            {parking}
          </Text>
          <Text
            style={{
              color: "orange",
            }}
          >
            {city}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
            borderColor: "blue",
            borderRadius: 10,
            backgroundColor: "#5359D1",
            padding: 40,
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 999,
              marginBottom: 20,
            }}
            source={prof}
          ></Image>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
           {name}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            {phone}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
             {auth?.currentUser?.email}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            {plate}
          </Text>
        </View>
      </View>
           
    )
}

export default detailed

const styles = StyleSheet.create({})
