import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { auth } from '../firebase'
import prof from '../assets/prof.png'

const check = () => {
  return (
      <SafeAreaView>
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
            {auth?.currentUser?.displayName}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            0769084353
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            duncanii414@gmail.com
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            KBU 364B
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            StartTime
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            End Time
          </Text>
        </View>
      </SafeAreaView>
  );
};

export default check;

const styles = StyleSheet.create({});
