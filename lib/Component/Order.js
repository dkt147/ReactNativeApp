import { Box, Text, Center, ScrollView, Image, Button, Radio } from 'native-base'
import React, { useEffect, useState } from 'react'
import Axios from "axios"
import styles from './main.style'
import { getDataFromPhone } from '../packages/localStorage';
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from "react-native";
let UserData = ''
const Order = () => {
    const [udata, setUdata] = useState([])
    const [value, setValue] = React.useState("")

    useEffect(() => {
        getDataFromPhone('UserEmail').then((res) => { UserData = res }).then(async () => await Filter())
    }, [])

    const Filter = async () => {
        await Axios.get("https://smartfarm012.herokuapp.com/getUserBooking").then(
            (reponse) => {
                if (UserData !== '') {
                    const newdata = reponse.data
                    setUdata(newdata.filter((x) => x.owneremail === UserData))
                }
            })
    }
    console.log(value)
    const Confirm = async (name, number, quantity, day, date, farmname, owneremail, coustumeremail, _id) => {
        firestore()
            .collection("conformOrderAccpet")
            .doc()
            .set({
                name: name,
                number: number,
                quantity: quantity,
                day: day,
                date: date,
                farmname: farmname,
                owneremail: owneremail,
                coustumeremail: coustumeremail,
                conform: 'Accpet',
            }).then(alert('Submit')).then(async () => await DeleteBooking(_id)).then({ setValue: setValue('') })
    }
    const Reject = async (name, number, quantity, day, date, farmname, owneremail, coustumeremail, _id) => {
        firestore()
            .collection("conformOrderReject")
            .doc()
            .set({
                name: name,
                number: number,
                quantity: quantity,
                day: day,
                date: date,
                farmname: farmname,
                owneremail: owneremail,
                coustumeremail: coustumeremail,
                conform: 'Reject',
            }).then(alert('Submit')).then(async () => await DeleteBooking(_id)).then({ setValue: setValue('') })
    }
    const DeleteBooking = (_id) => {
        Axios.delete(`https://smartfarm012.herokuapp.com/deleteBooking/${_id}`)
    }
    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {udata != '' ? udata.map((data) => (
                        <Box>
                            <Box style={styles.mainBox}>
                                <Text style={styles.text}>User Name:
                                    <Text fontWeight='400'>
                                        {data.name}
                                    </Text>
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
                                <Box flexDirection='row'>
                                    <Button w='50%' mr='1' onPress={() => (Confirm(data.name, data.number, data.quantity, data.day, data.date, data.farmname, data.owneremail, data.coustumeremail, data._id), setValue("Accpet"))}>Accpet</Button>
                                    <Button w='50%' onPress={() => (Reject(data.name, data.number, data.quantity, data.day, data.date, data.farmname, data.owneremail, data.coustumeremail, data._id,), setValue("Reject"))}>Reject</Button>
                                </Box>
                            </Box>
                        </Box>
                    )) : <ActivityIndicator size='large' color='black' />}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default Order