import React, { useLayoutEffect } from 'react';
import { WebView } from 'react-native-webview';

  const MyWeb = ({ navigation }) => {

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: "go to home",
      });
    }, [navigation]);

    return (
         <WebView
        source={{ uri: 'https://hungry-curie-7b7404.netlify.app/' }}
        style={{ marginTop: 20 }}
        />
    );
}

export default MyWeb