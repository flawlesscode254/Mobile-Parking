import React, { useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, SafeAreaView } from 'react-native'
import {
    AdMobBanner,
    setTestDeviceIDAsync
  } from "expo-ads-admob";

const terms = () => {

    useEffect(() => {
        setTestDeviceIDAsync("EMULATOR");
    }, [])

    return (
        <SafeAreaView>
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
      <ScrollView>
          <Text style={{
                color: "black",
                fontSize: 20,
                fontWeight: "bold"
            }}>View Terms and Conditions.</Text>
            <Text>1.Ensure that you enter your details correctly.</Text>
            <Text>2.Ensure that you are checked out before you leave a parking spot to avoid extra costs.</Text>
            <Text>3.The parking fees are at a rate of K.sh 30 per hour of parking.</Text>
            <Text>4.We do this to ensure that you pay according to the time that you spend in a parking spot.</Text>
            <Text>5.It may appear expensive but in the long run it is a cheap and fair alternative to parking.</Text>
            <Text>6.We are also open to any kind of suggestions that may arise from people.</Text>
            <Text>7.When you book a aprking space, ensure that you set a pin that you will be able to recall easily.</Text>
            <Text>8.Keep in mind that it does not mean that you will use the same pin over and over again, you can 
                enter a different one every time you book a space.
            </Text>
            <Text>9.The pin is very important because it provides safety for your vehicle to ensure that
                it is only you that can clear you from the parking spot.
            </Text>
            <Text>10.The pin allows you to view a security code that is only unique to you that is essential
                in clearing you from the parking spot.
            </Text>
      </ScrollView>
        </SafeAreaView>
       
    )
}

export default terms

const styles = StyleSheet.create({})
