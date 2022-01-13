/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from "react-redux";
import { store } from './lib/Store/Store';
// import PushNotification from "react-native-push-notification";


// PushNotification.configure({
//     onRegister: function (token) {
//         console.log("TOKEN:", token);
//     },
//     onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);
//     },
//     requestPermissions: Platform.OS === 'ios'
// })
const newApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => newApp);
