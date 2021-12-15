import React from 'react';
import {
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
import UserInfo from './lib/Component/UserInfo'
import farmOwnerInfo from './lib/Component/farmOwnerInfo'
import CateringInfo from './lib/Component/CateringInfo'
import TranspoterInfo from './lib/Component/TranspoterInfo'
import AllPackages from './lib/Component/AllPackages';
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
      {/* <Stack.Screen name="AdminBottomNav" component={AdminBottomNav} /> */}
      <Stack.Screen name="BottomNav" component={BottomNav} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="FarmOwnerInfo" component={farmOwnerInfo} />
      <Stack.Screen name="CateringInfo" component={CateringInfo} />
      <Stack.Screen name="TranspoterInfo" component={TranspoterInfo} />
      <Stack.Screen name="AllPackages" component={AllPackages} />
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
