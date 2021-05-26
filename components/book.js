import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator
         size="large" 
         color="#00ff00"
      />
      <Text style={{
        textAlign: "center",
        color: "#5359D1"
      }}>Loading map...</Text>
    </View>
  );
};

const MyWeb = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: "go to home",
      });
    }, [navigation]);

    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <WebView
            style={{flex: 1}}
            //Loading URL
            source={{uri: 'https://hungry-curie-7b7404.netlify.app/'}}
            //Enable Javascript support
            javaScriptEnabled={true}
            //For the Cache
            domStorageEnabled={true}
            onLoadStart={() => setVisible(true)}
            onLoad={() => setVisible(false)}
          />
          {visible ? <ActivityIndicatorElement /> : null}
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default MyWeb