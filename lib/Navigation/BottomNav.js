import React , {useEffect, useState}from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from "../packages/Home/Home";
import History from "../packages/History";
import Profile from '../packages/Profile/Profile.js'
import { useSelector } from "react-redux";
import AdminBottomNav from '../Navigation/AdminBottomNav'
import { getDataFromPhone } from "../packages/localStorage";
import FarmBottomNav from "./FarmBottomNav";
const userNav = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#25A9B6',
            }}
        >
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shopping" color={color} size={size} />),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
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
    )
}


export default function BottomNav() {
    const [data, setData] = useState('')
    useEffect(() => {
        getDataFromPhone('userData').then((res) => setData(res))
    }, [])
    // const userData = useSelector((state) => state.user.initialState);
    return (
        (( data == 'admin') ? AdminBottomNav() : data == 'Farmhouse'? FarmBottomNav() :userNav())
    );
}