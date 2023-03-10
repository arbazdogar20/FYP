import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/Screens/SignInScreen';
import SignUpScreen from './src/Screens/SignUpScreen/SignUpScreen';
import Navigation from './src/Navigation';


const App = () => {
  return (
    <View style={styles.root}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC"
  },
});

export default App;