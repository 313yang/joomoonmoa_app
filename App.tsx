import { SafeAreaView, BackHandler, StyleSheet, StatusBar, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import * as Notifications from 'expo-notifications';
import { useRef, useEffect, useState } from "react";
// import { Permissions } from "expo";
const getToken = async () => (await Notifications.getDevicePushTokenAsync()).data;

// import { firebase } from '@firebase/app';
// import '@firebase/messaging';

// async function registerForPushNotificationsAsync() {
//   const { status } = await Notifications.requestPermissionsAsync();
//   if (status !== 'granted') {
//     alert('푸시 알림을 허용해야 합니다!');
//     return;
//   }
//   const token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log(token);

//   // Firebase로 푸시 알림 토큰 등록
//   const messaging = firebase.messaging();
//   messaging.getToken({ vapidKey: 'YOUR_VAPID_KEY' }).then((firebaseToken:any) => {
//     // 푸시 알림 토큰을 Firebase에 등록
//     console.log(firebaseToken);
//   });
// }

// registerForPushNotificationsAsync();
// const firebaseConfig = {
//   // Firebase 프로젝트의 설정 정보 입력
// };

// export const push = {
//   _registerForBackendAppConfig: async (userId: any) => {
//     const { status: existingStatus } = await Permissions.getAsync;
//   }
// };

const INJECTED_JAVASCRIPT = `(function() {
  const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
})();`;

const WebViewWrapper = (): JSX.Element => {
  const webview = useRef<WebView>(null);
  const onAndroidBackPress = (): boolean => {
    if (webview.current) {
      webview.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };
  useEffect((): (() => void) => {
    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
    return (): void => {
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
    };
  }, []); // Never re-run this effect
  return (
    <WebView
      bounces={false}
      source={{
        uri: "https://www.joomoonmoa.com/",
      }}
      ref={webview}
      injectedJavaScript={INJECTED_JAVASCRIPT}
    />
  );
};

export default function App() {
  const [token2, setToken2] = useState();

  useEffect(() => {

    getToken().then((res) => {
      setToken2(res);


    });
  }, [token2]);
  // let token2;


  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} />
      <View style={styles.container}>
        <StatusBar backgroundColor="#f1f3f5" barStyle="dark-content" />
        <WebViewWrapper />
        <Text>{token2}</Text>
      </View>
      {/* <SafeAreaView /> */}
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {
    // flex: 1,
    backgroundColor: "#f1f3f5"
  },
  safeAreaBottom: {
    // flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
  }
});
