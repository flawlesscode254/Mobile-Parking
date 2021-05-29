import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import home from '../assets/home.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
import menu from '../assets/menu.png';
import close from '../assets/close.png';
import Notifications from '../components/notifications'
import Settings from '../components/settings'
import { auth } from '../firebase'
import Terms from '../components/terms'
import star from '../assets/star.png'
import prof from '../assets/prof.png'
import {
  AdMobBanner,
  setTestDeviceIDAsync
} from "expo-ads-admob";

const Home = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setTestDeviceIDAsync("EMULATOR");
  }, [])

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const SignOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login")
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
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
        <Image source={prof} style={{
          width: 60,
          height: 60,
          borderRadius: 999,
          marginTop: 8
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>{auth?.currentUser?.displayName}</Text>

<View>
        <TouchableOpacity onPress={() => navigation.navigate("Book")}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={star} style={{
          width: 25, height: 25,
          tintColor:  "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color:  "white"
        }}>Book Space</Text>

      </View>
    </TouchableOpacity>
        </View>

        <View style={{ flexGrow: 1, marginTop: 50 }}>

          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
          {TabButton(currentTab, setCurrentTab, "Control Info", settings)}

        </View>

        <View>
        <TouchableOpacity onPress={SignOut}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={logout} style={{
          width: 25, height: 25,
          tintColor:  "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color:  "white"
        }}>Logout</Text>

      </View>
    </TouchableOpacity>
        </View>

      </View>

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 20,

            }}></Image>

          </TouchableOpacity>

          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20
          }}>{currentTab}</Text>

          <View>
            {currentTab == "Notifications" ? <Notifications /> : currentTab === "Control Info" ? <Settings /> : <Terms />}
          </View>
        </Animated.View>

      </Animated.View>

    </SafeAreaView>
  );
}

const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity onPress={() => {
        setCurrentTab(title)
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
