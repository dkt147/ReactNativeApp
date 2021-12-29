import { Box, Text, Center, ScrollView, Image, Button, Radio, Input, Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import Axios from "axios"
import styles from './main.style'
import { getDataFromPhone } from '../packages/localStorage';
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

let UserData = ''
const CatringOrder = () => {
    const [udata, setUdata] = useState([])
    const [value, setValue] = React.useState("")
    const [price, setPrice] = React.useState("")

    useEffect(() => {
        getDataFromPhone('UserEmail').then((res) => { UserData = res }).then(async () => await Filter())
    }, [])

    const Filter = async () => {
        await Axios.get("https://smartfarm012.herokuapp.com/getCartingBooking").then(
            (reponse) => {
                const newdata = reponse.data
                setUdata(newdata)
            })
    }
    console.log(udata)
    const Confirm = async (name, number, quantity, date, farmname, coustumeremail, _id, dropAddress, time, dishName) => {
        firestore()
            .collection("CatringConformOrder")
            .doc()
            .set({
                name: name,
                number: number,
                quantity: quantity,
                date: date,
                farmname: farmname,
                coustumeremail: coustumeremail,
                drop: dropAddress,
                pickTime: time,
                owneremail: UserData,
                conform: value,
                price: price,
                dish: dishName
            })
            .then(alert('Submit')).then(async () => await DeleteBooking(_id))
    }
    const DeleteBooking = (_id) => {
        Axios.delete(`https://smartfarm012.herokuapp.com/deleteCartingBooking/${_id}`)
    }
    console.log(udata)
    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {udata != '' ? udata.map((data) => (
                        <Box>
                            <Box style={styles.mainBox}>
                                <Text style={styles.text}>Dish Name: {data.dishName}</Text>
                                <Text style={styles.text}>User Name: {data.name}</Text>
                                <Text style={styles.text}>User Phone: {data.number}</Text>
                                <Text style={styles.text}>User Quantity: {data.quantity}</Text>
                                <Text style={styles.text}>FarmHouse Name: {data.farmname}</Text>
                                <Text style={styles.text}>User Email: {data.coustumeremail}</Text>
                                <Text style={styles.text}>Drop Address: {data.dropAddress}</Text>
                                <Text style={styles.text}>Drop Time: {data.time}</Text>
                                <Text style={styles.text}>Booking Date: {data.date}</Text>
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
                                <Box flexDirection='row' mt='1'>
                                <Button w='50%' mr='1' onPress={() =>( Confirm(data.name, data.number, data.quantity, data.date, data.farmname, data.coustumeremail, data._id, data.dropAddress, data.time, data.dishName), setValue("Accpet"))}>Accpet</Button>
                                <Button w='50%' onPress={() => (Confirm(data.name, data.number, data.quantity, data.date, data.farmname, data.coustumeremail, data._id, data.dropAddress, data.time, data.dishName), setValue("Reject"))}>Reject</Button>
                                    </Box>
                            </Box>
                        </Box>
                    )) : <ActivityIndicator size='large' color='black' />}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default CatringOrder