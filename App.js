/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { NativeBaseProvider } from 'native-base';
import { theme } from './lib/theme'
import SignIn from './lib/packages/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from './lib/Navigation/BottomNav';
import SignUp from './lib/packages/SignUp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminBottomNav from './lib/Navigation/AdminBottomNav';
const MyStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
    initialRouteName='BottomNav'
      screenOptions={{
        headerMode: null,
        headerShown: false
      }}
      >
      <Stack.Screen name="AdminBottomNav" component={AdminBottomNav} />
      <Stack.Screen name="BottomNav" component={BottomNav} />
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    screenOptions={{
      headerMode: null,
      headerShown: false
    }}
    >
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  )
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setIsLoggedIn(user);
      setLoading(false);
    });
  }, []);


  if (loading) {
    return (
      <View style={{ backgroundColor: 'white', height: '100%', justifyContent: 'center' }} >
        <View >
          <MaterialCommunityIcons
            name="alpha-m-circle"
            size={220}
            color="black"
          />
        </View>
        <ActivityIndicator animating={true} size="large" color="#25A9B6" />
      </View>
    );
  }
  return (
    // initalScreen && (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {isLoggedIn ? <MyStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
    // )
  )
}



export default App;
