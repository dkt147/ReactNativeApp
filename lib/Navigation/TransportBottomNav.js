import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../packages/Profile/Profile.js'
import TransportHome from "../packages/TransportHome/TransportHome";

export default function TransportBottomNav() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#25A9B6',
            }}
        >
            {/* <Tab.Screen
                name="AddVentor"
                component={AddVentor}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shopping" color={color} size={size} />),
                }}
            /> */}
            <Tab.Screen
                name="Home"
                component={TransportHome}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-box-outline" color={color} size={size} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}