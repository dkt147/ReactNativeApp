import { Box, Text, Center, ScrollView, Image, Button, Radio } from 'native-base'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import styles from '../Component/main.style'
import { getDataFromPhone } from '../packages/localStorage'
let UserData = ''

const ConfirmOrder = () => {
    useEffect(() => {
        getDataFromPhone('UserEmail').then((res) => { UserData = res })
    }, [])
    const [post, setPost] = React.useState([]);
    React.useEffect(() => {
        firestore().collection('conformOrderAccpet').onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPost(newPost.filter((x) => x.owneremail == UserData));
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
                                    <Text style={styles.text}>User Name:
                                        <Text fontWeight='400'>
                                            {data.name}</Text>
                                    </Text>
                                    <Text style={styles.text}>User Phone:
                                        <Text fontWeight='400'>
                                            {data.number}</Text>
                                    </Text>
                                    <Text style={styles.text}>User Quantity:
                                        <Text fontWeight='400'>
                                            {data.quantity}</Text>
                                    </Text>
                                    <Text style={styles.text}>FarmHouse Name:
                                        <Text fontWeight='400'>
                                            {data.farmname}</Text>
                                    </Text>
                                    <Text style={styles.text}>User Email:
                                        <Text fontWeight='400'>
                                            {data.coustumeremail}</Text>
                                    </Text>
                                    <Text style={styles.text}>User Day:
                                        <Text fontWeight='400'>
                                            {data.day}</Text>
                                    </Text>
                                    <Text style={styles.text}>Booking Date:
                                        <Text fontWeight='400'>
                                            {data.date}</Text>
                                    </Text>
                                    <Text style={styles.text}>Your order:
                                        <Text fontWeight='400'>
                                            {data.conform}</Text>
                                    </Text>

                                    {/* <Button onPress={() => Confirm(data.name, data.number, data.quantity, data.day, data.date, data.farmname, data.coustumeremail, data.owneremail)}>Confirm</Button> */}
                                </Box>
                            </Box>
                        )) : null}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default ConfirmOrder
