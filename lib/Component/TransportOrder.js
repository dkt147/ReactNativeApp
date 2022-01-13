import { Box, Text, Center, ScrollView, Image, Button, Radio, Input, Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import Axios from "axios"
import styles from './main.style'
import { getDataFromPhone } from '../packages/localStorage';
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native'
let UserData = ''
const TransportOrder = () => {
    const navigation = useNavigation()
    const [udata, setUdata] = useState([])
    const [value, setValue] = React.useState("")
    const [price, setPrice] = React.useState("")

    useEffect(() => {
        getDataFromPhone('UserEmail').then((res) => { UserData = res }).then(async () => await Filter())
    }, [])

    const Filter = async () => {
        await Axios.get("https://smartfarm012.herokuapp.com/getTransportBooking").then(
            (reponse) => {
                const newdata = reponse.data
                setUdata(newdata)
            })
    }
    console.log(value)
    const Confirm = async (name, number, quantity, date, farmname, coustumeremail, _id, pickupAddress, dropAddress, time) => {
        await firestore()
            .collection("TransportConformOrder")
            .doc()
            .set({
                name: name,
                number: number,
                quantity: quantity,
                date: date,
                farmname: farmname,
                coustumeremail: coustumeremail,
                pickup: pickupAddress,
                drop: dropAddress,
                pickTime: time,
                owneremail: UserData,
                conform: 'Accpet',
                price: price,
            })
            .then(alert('Submit')).then(async () => await DeleteBooking(_id)).then(() => navigation.navigate('BottomNav'))
    }
    const Reject = async (name, number, quantity, date, farmname, coustumeremail, _id, pickupAddress, dropAddress, time) => {
        await firestore()
            .collection("TransportConformOrder")
            .doc()
            .set({
                name: name,
                number: number,
                quantity: quantity,
                date: date,
                farmname: farmname,
                coustumeremail: coustumeremail,
                pickup: pickupAddress,
                drop: dropAddress,
                pickTime: time,
                owneremail: UserData,
                conform: 'Reject',
                price: price,
            })
            .then(alert('Submit')).then(async () => await DeleteBooking(_id)).then(() => navigation.navigate('BottomNav'))
    }
    const DeleteBooking = (_id) => {
        Axios.delete(`https://smartfarm012.herokuapp.com/deleteTransportBooking/${_id}`)
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
                                        {data.coustumeremail}
                                    </Text>
                                </Text>
                                <Text style={styles.text}>Pickup Address:
                                    <Text fontWeight='400'>
                                        {data.pickupAddress}</Text>
                                </Text>
                                <Text style={styles.text}>Drop Address:
                                    <Text fontWeight='400'>
                                        {data.dropAddress}</Text>
                                </Text>
                                <Text style={styles.text}>Pickup Time:
                                    <Text fontWeight='400'>
                                        {data.time}</Text>
                                </Text>
                                <Text style={styles.text}>Booking Date:
                                    <Text fontWeight='400'>
                                        {data.date}</Text>
                                </Text>
                                <Input
                                    onChangeText={(val) => setPrice(val)}
                                    borderRadius='30'

                                    placeholder="Enter Price" // mx={4}
                                    _light={{
                                        placeholderTextColor: "blueGray.400",
                                    }}
                                    _dark={{
                                        placeholderTextColor: "blueGray.50",
                                    }}
                                />
                                {/* <Radio.Group
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
                                </Radio.Group> */}
                                <Box mt='2' flexDirection='row'>
                                    <Button w='50%' mr='1' onPress={() => (Confirm(data.name, data.number, data.quantity, data.date, data.farmname, data.coustumeremail, data._id, data.pickupAddress, data.dropAddress, data.time))}>Accpet</Button>
                                    <Button w='50%' onPress={() => (Reject(data.name, data.number, data.quantity, data.date, data.farmname, data.coustumeremail, data._id, data.pickupAddress, data.dropAddress, data.time))}>Reject</Button>
                                </Box>
                            </Box>
                        </Box>
                    )) : <ActivityIndicator size='large' color='black' />}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default TransportOrder