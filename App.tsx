import { SafeAreaView, BackHandler, StyleSheet,StatusBar } from "react-native";
import { WebView } from "react-native-webview";
// import { StatusBar } from 'expo-status-bar';

import { useRef, useEffect } from "react";

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
        uri: "https://develop.d4zinqpf8hiuq.amplifyapp.com/",
      }}
      ref={webview}
      injectedJavaScript={INJECTED_JAVASCRIPT}
    />
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={"dark-content"} />
      <WebViewWrapper />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f3f5"
  },
});
