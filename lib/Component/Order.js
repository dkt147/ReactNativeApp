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
            .collection("conformOrder")
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
                conform: value,
            }).then(alert('Submit')).then(async() => await DeleteBooking(_id))
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
                                <Text style={styles.text}>User Name: {data.name}</Text>
                                <Text style={styles.text}>User Phone: {data.number}</Text>
                                <Text style={styles.text}>User Quantity: {data.quantity}</Text>
                                <Text style={styles.text}>FarmHouse Name: {data.farmname}</Text>
                                <Text style={styles.text}>User Email: {data.coustumeremail}</Text>
                                <Text style={styles.text}>User Day: {data.day}</Text>
                                <Text style={styles.text}>Booking Date: {data.date}</Text>
                                <Radio.Group
                                    name="myRadioGroup"
                                    accessibilityLabel="favorite number"
                                    value={value}
                                    onChange={(nextValue) => {
                                        setValue(nextValue)
                                    }}
                                >
                                    <Box flexDirection='row'>
                                        <Radio value="Accpet" my={1} mr='2'>
                                            Accpet
                                        </Radio>
                                        <Radio value="Reject" my={1}>
                                            Reject
                                        </Radio>
                                    </Box>
                                </Radio.Group>
                                <Button onPress={() => Confirm(data.name, data.number, data.quantity, data.day, data.date, data.farmname, data.owneremail, data.coustumeremail, data._id)}>Confirm</Button>
                            </Box>
                        </Box>
                    )) : <ActivityIndicator size='large' color='black' />}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default Order