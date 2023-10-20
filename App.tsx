import React from 'react';
import store from '@/redux/store';
import AppNavigation from '@/navigation';

import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
  }
})