import { Box, Text, Center, ScrollView, Image, Button, Radio } from 'native-base'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import styles from '../Component/main.style'
import { getDataFromPhone } from './localStorage'
import { useNavigation } from "@react-navigation/native";

let UserData = ''

const History = () => {
    const navigation = useNavigation()

    useEffect(() => {
        getDataFromPhone('UserEmail').then((res) => { UserData = res }).then(async () => await Filter())
    }, [])
    const [post, setPost] = React.useState([]);
    React.useEffect(() => {
        firestore().collection('conformOrder').onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPost(newPost.filter((x) => x.coustumeremail == UserData));
        });
    }, [])
    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {post !== [] ?
                        post.map((data) => (
                            <Box>
                                <Box style={styles.mainBox}>
                                    <Text style={styles.text}>User Name: {data.name}</Text>
                                    <Text style={styles.text}>User Phone: {data.number}</Text>
                                    <Text style={styles.text}>User Quantity: {data.quantity}</Text>
                                    <Text style={styles.text}>FarmHouse Name: {data.farmname}</Text>
                                    <Text style={styles.text}>User Email: {data.coustumeremail}</Text>
                                    <Text style={styles.text}>User Day: {data.day}</Text>
                                    <Text style={styles.text}>Booking Date: {data.date}</Text>
                                    <Text style={styles.text}>Your order: {data.conform}</Text>
                                    <Box flexDirection='row'>
                                        <Button w='50%' mr='2' borderRadius='20' onPress={() => navigation.navigate('TransportBooking', {data: data})}>Transport</Button>
                                        <Button w='50%' borderRadius='20' onPress={() => navigation.navigate('CartingBooking', {data: data})}>Catring</Button>
                                    </Box>
                                </Box>
                            </Box>
                        )) : null}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default History
