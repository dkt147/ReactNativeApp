import { Box, Text, Center, ScrollView, Image, Button, Radio, Heading } from 'native-base'
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
    const [postT, setPostT] = React.useState([]);
    const [postC, setPostC] = React.useState([]);
    const [postTC, setPostTC] = React.useState([]);
    const [postCC, setPostCC] = React.useState([]);
    const [post1, setPost1] = React.useState([]);

    React.useEffect(() => {
        firestore().collection('conformOrderAccpet').onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPost(newPost.filter((x) => x.coustumeremail == UserData));
        });
    }, [])
    React.useEffect(() => {
        firestore().collection('conformOrderReject').onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPost1(newPost.filter((x) => x.coustumeremail == UserData));
        });
    }, [])
    React.useEffect(() => {
        firestore().collection('TransportConformOrder').onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPostT(newPost.filter((x) => x.coustumeremail == UserData));
        });
    }, [])
    React.useEffect(() => {
        firestore().collection('CatringConformOrder').onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPostC(newPost.filter((x) => x.coustumeremail == UserData));
        });
    }, [])
    React.useEffect(() => {
        firestore().collection('TransportUserAccpet').onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(newPost)
            setPostTC(newPost.filter((x) => x.coustumeremail == UserData));
        });
    }, [])
    React.useEffect(() => {
        firestore().collection('CatringUserAccpet').onSnapshot(snapshot => {
            const newPost = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(newPost)
            setPostCC(newPost.filter((x) => x.coustumeremail == UserData));
        });
    }, [])
    const Taccpet = (data) => {
        let newdata = data.data
        console.log(newdata)
        firestore()
            .collection("TransportUserAccpet")
            .doc()
            .set({
                name: newdata.name,
                number: newdata.number,
                quantity: newdata.quantity,
                date: newdata.date,
                farmname: newdata.farmname,
                coustumeremail: newdata.coustumeremail,
                pickup: newdata.pickup,
                drop: newdata.drop,
                owneremail: newdata.owneremail,
                conform: newdata.conform,
                price: newdata.price,
            })
            .then(
                firestore()
                    .collection('TransportConformOrder')
                    .doc(data.data.id)
                    .delete()
                    .then(() => {
                        console.log('User deleted!');
                    })
            )
            .then(alert('Submit'))
    }
    const Caccpet = (data) => {
        let newdata = data.data
        console.log(newdata)
        firestore()
            .collection("CatringUserAccpet")
            .doc()
            .set({
                name: newdata.name,
                number: newdata.number,
                quantity: newdata.quantity,
                date: newdata.date,
                farmname: newdata.farmname,
                coustumeremail: newdata.coustumeremail,
                drop: newdata.drop,
                pickTime: newdata.pickTime,
                owneremail: newdata.owneremail,
                conform: newdata.conform,
                price: newdata.price,
                dish: newdata.dish
            })
            .then(
                firestore()
                    .collection('CatringConformOrder')
                    .doc(data.data.id)
                    .delete()
                    .then(() => {
                        console.log('User deleted!');
                    })
            )
            .then(alert('Submit'))
    }
    const Treject = (data) => {
        let newdata = data.data
        firestore()
            .collection("TransportUserReject")
            .doc()
            .set({
                name: newdata.name,
                number: newdata.number,
                quantity: newdata.quantity,
                date: newdata.date,
                farmname: newdata.farmname,
                coustumeremail: newdata.coustumeremail,
                pickup: newdata.pickup,
                drop: newdata.drop,
                owneremail: newdata.owneremail,
                conform: newdata.conform,
                price: newdata.price,
                Conform: 'Reject'
            }).then(
                firestore()
                    .collection('TransportConformOrder')
                    .doc(data.data.id)
                    .delete()
                    .then(() => {
                        console.log('User deleted!');
                    })
            )
            .then(alert('Submit'))
    }
    const Creject = (data) => {
        let newdata = data.data
        firestore()
            .collection("CatringUserReject")
            .doc()
            .set({
                name: newdata.name,
                number: newdata.number,
                quantity: newdata.quantity,
                date: newdata.date,
                farmname: newdata.farmname,
                coustumeremail: newdata.coustumeremail,
                drop: newdata.drop,
                pickTime: newdata.pickTime,
                owneremail: newdata.owneremail,
                conform: newdata.conform,
                price: newdata.price,
                dish: newdata.dish,
                Conform: 'Reject'
            })
            .then(
                firestore()
                    .collection('CatringConformOrder')
                    .doc(data.data.id)
                    .delete()
                    .then(() => {
                        console.log('User deleted!');
                    })
            )
            .then(alert('Submit'))
    }
    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {post !== [] ?
                        post.map((data) => (
                            <Box>
                                <Box style={styles.mainBox}>
                                    <Text style={{ fontFamily: 'Merriweather' }} fontSize='26' fontWeight='600'>Farm House</Text>
                                    <Text style={styles.text}>User Name: <Text fontWeight='400'>{data.name}</Text></Text>
                                    <Text style={styles.text}>User Phone: <Text fontWeight='400'>{data.number}</Text></Text>
                                    <Text style={styles.text}>User Quantity:
                                        <Text fontWeight='400'>
                                            {data.quantity}
                                        </Text>
                                    </Text>
                                    <Text style={styles.text}>FarmHouse Name:
                                        <Text fontWeight='400'>
                                            {data.farmname}</Text>
                                    </Text>
                                    <Text style={styles.text}>User Email:<Text fontWeight='400'>
                                        {data.coustumeremail}</Text>
                                    </Text>
                                    <Text style={styles.text}>User Day: <Text fontWeight='400'>
                                        {data.day}</Text>
                                    </Text>
                                    <Text style={styles.text}>Booking Date: <Text fontWeight='400'>
                                        {data.date}</Text>
                                    </Text>
                                    <Text style={styles.text}>Your order:<Text fontWeight='400'>
                                        {data.conform}</Text>
                                    </Text>
                                    <Box flexDirection='row'>
                                        <Button w='50%' mr='2' borderRadius='20' onPress={() => navigation.navigate('TransportBooking', { data: data })}>Transport</Button>
                                        <Button w='50%' borderRadius='20' onPress={() => navigation.navigate('CartingBooking', { data: data })}>Catring</Button>
                                    </Box>
                                </Box>
                            </Box>
                        )) : null}
                </Box>
                <Box w="100%" p="10px">
                    {post1 !== [] ?
                        post1.map((data) => (
                            <Box>
                                <Box style={styles.mainBox}>
                                    <Text style={{ fontFamily: 'Merriweather' }} fontSize='26' fontWeight='600'>Farm House</Text>
                                    <Text style={styles.text}>User Name: <Text fontWeight='400'>{data.name}</Text></Text>
                                    <Text style={styles.text}>User Phone: <Text fontWeight='400'>{data.number}</Text></Text>
                                    <Text style={styles.text}>User Quantity:
                                        <Text fontWeight='400'>
                                            {data.quantity}
                                        </Text>
                                    </Text>
                                    <Text style={styles.text}>FarmHouse Name:
                                        <Text fontWeight='400'>
                                            {data.farmname}</Text>
                                    </Text>
                                    <Text style={styles.text}>User Email:<Text fontWeight='400'>
                                        {data.coustumeremail}</Text>
                                    </Text>
                                    <Text style={styles.text}>User Day: <Text fontWeight='400'>
                                        {data.day}</Text>
                                    </Text>
                                    <Text style={styles.text}>Booking Date: <Text fontWeight='400'>
                                        {data.date}</Text>
                                    </Text>
                                    <Text style={styles.text}>Your order:<Text fontWeight='400'>
                                        {data.conform}</Text>
                                    </Text>
                                </Box>
                            </Box>
                        )) : null}
                </Box>
                <Box w="100%" p="10px">
                    {postT !== [] ?
                        postT.map((data) => (
                            <Box>
                                <Box style={styles.mainBox}>
                                    <Text style={{ fontFamily: 'Merriweather' }} fontSize='26' fontWeight='600'>Transport</Text>
                                    <Text style={styles.text}>User Name:
                                        <Text fontWeight='400'>
                                            {data.name}
                                        </Text>
                                    </Text>
                                    <Text style={styles.text}>User Phone:
                                        <Text fontWeight='400'>
                                            {data.number}
                                        </Text>
                                    </Text>
                                    <Text style={styles.text}>User Quantity:
                                        <Text fontWeight='400'>
                                            {data.quantity}
                                        </Text>
                                    </Text>
                                    <Text style={styles.text}>FarmHouse Name:
                                        <Text fontWeight='400'>
                                            {data.farmname}
                                        </Text></Text>
                                    <Text style={styles.text}>User Email:
                                        <Text fontWeight='400'>
                                            {data.coustumeremail}</Text>
                                    </Text>
                                    <Text style={styles.text}>Booking Date:
                                        <Text fontWeight='400'>
                                            {data.date}</Text>
                                    </Text>
                                    <Text style={styles.text}>Price:
                                        <Text fontWeight='400'>
                                            {data.price}</Text>
                                    </Text>
                                    <Text style={styles.text}>Your order:
                                        <Text fontWeight='400'>
                                            {data.conform}</Text>
                                    </Text>
                                    <Box mt='2' flexDirection='row'>
                                        <Button w='50%' borderRadius='20' mr='1' onPress={() => Taccpet({ data })}>Accpet</Button>
                                        <Button w='50%' borderRadius='20' onPress={() => Treject({ data })}>Reject</Button>
                                    </Box>
                                </Box>
                            </Box>
                        )) : null}
                </Box>
                <Box w="100%" p="10px">
                    {postTC !== [] ?
                        postTC.map((data) => (

                            <Box>
                                <Box style={styles.mainBox}>
                                    <Text style={{ fontFamily: 'Merriweather' }} fontSize='26' fontWeight='600'>Transport Confrom</Text>
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
                                    <Text style={styles.text}>Booking Date:
                                        <Text fontWeight='400'>
                                            {data.date}</Text>
                                    </Text>
                                    <Text style={styles.text}>Pickup Address:
                                        <Text fontWeight='400'>
                                            {data.pickup}</Text>
                                    </Text>
                                    <Text style={styles.text}>Drop Address:
                                        <Text fontWeight='400'>
                                            {data.drop}</Text>
                                    </Text>
                                    <Text style={styles.text}>Booking Price:
                                        <Text fontWeight='400'>
                                            {data.price}</Text>
                                    </Text>
                                    <Text style={styles.text}>Your order:
                                        <Text fontWeight='400'>
                                            {data.conform}</Text>
                                    </Text>
                                </Box>
                            </Box>
                        )) : null}
                </Box>
                <Box w="100%" p="10px">
                    {postC !== [] ?
                        postC.map((data) => (
                            <Box>
                                <Box style={styles.mainBox}>
                                    <Text style={{ fontFamily: 'Merriweather' }} fontSize='26' fontWeight='600'>Catring</Text>
                                    <Text style={styles.text}>User Name:
                                        <Text fontWeight='400'>
                                            {data.name}</Text>
                                    </Text>
                                    <Text style={styles.text}>Dish Name:
                                        <Text fontWeight='400'>
                                            {data.dish}</Text>
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
                                    <Text style={styles.text}>Booking Date:
                                        <Text fontWeight='400'>
                                            {data.date}</Text>
                                    </Text>
                                    <Text style={styles.text}>Your order:
                                        <Text fontWeight='400'>
                                            {data.conform}</Text>
                                    </Text>
                                    <Text style={styles.text}>Drop Time:
                                        <Text fontWeight='400'>
                                            {data.pickTime}</Text>
                                    </Text>
                                    <Text style={styles.text}>Drop Address:
                                        <Text fontWeight='400'>
                                            {data.drop}</Text>
                                    </Text>
                                    <Text style={styles.text}>Price:
                                        <Text fontWeight='400'>
                                            {data.price}</Text>
                                    </Text>
                                    <Box mt='2' flexDirection='row'>
                                        <Button w='50%' borderRadius='20' mr='1' onPress={() => Caccpet({ data })}>Accpet</Button>
                                        <Button w='50%' borderRadius='20' onPress={() => Creject({ data })}>Reject</Button>
                                    </Box>
                                </Box>
                            </Box>
                        )) : null}
                </Box>
                <Box w="100%" p="10px">
                    {postCC !== [] ?
                        postCC.map((data) => (
                            <Box>
                                <Box style={styles.mainBox}>
                                    <Text style={{ fontFamily: 'Merriweather' }} fontSize='26' fontWeight='600'>Catring Conform</Text>
                                    <Text style={styles.text}>User Name:
                                        <Text fontWeight='400'>
                                            {data.name}</Text>
                                    </Text>
                                    <Text style={styles.text}>Dish Name:
                                        <Text fontWeight='400'>
                                            {data.dish}</Text>
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
                                    <Text style={styles.text}>Booking Date:
                                        <Text fontWeight='400'>
                                            {data.date}</Text>
                                    </Text>
                                    <Text style={styles.text}>Your order:
                                        <Text fontWeight='400'>
                                            {data.conform}</Text>
                                    </Text>
                                    <Text style={styles.text}>Drop Time:
                                        <Text fontWeight='400'>
                                            {data.pickTime}</Text>
                                    </Text>
                                    <Text style={styles.text}>Drop Address:
                                        <Text fontWeight='400'>
                                            {data.drop}</Text>
                                    </Text>
                                    <Text style={styles.text}>Price:
                                        <Text fontWeight='400'>
                                            {data.price}</Text>
                                    </Text>
                                </Box>
                            </Box>
                        )) : null}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default History
