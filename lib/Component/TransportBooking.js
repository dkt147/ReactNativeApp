import React, { useState, useEffect } from "react";
import {
    Box,
    Heading,
    VStack,
    Button,
    Center,
    Image,
    Input,
    Icon,
    Link,
    Text,
    HStack,
    ScrollView,
    CheckIcon,
    Select,
    Modal,
    FlatList,
    Radio

} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Axios from "axios"
import { useNavigation } from "@react-navigation/native";
import { getDataFromPhone } from '../packages/localStorage'
export default function TransportBooking({ route }) {
    const { data } = route.params;
    console.log('data', data)
    const navigation = useNavigation()
    const [name, setName] = React.useState("")
    const [number, setNumber] = React.useState("")
    const [quality, setQuality] = React.useState("")
    const [time, setTime] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [dropAddress, setDropAddress] = React.useState('')
    const [udata, setUData] = useState('')
    useEffect(() => {
        getDataFromPhone('userEmail').then((res) => setUData(JSON.parse(res)))
    }, [])

    console.log(udata)
    const Submit = async () => {
        if (name !== '' && number !== '' && quality !== '' && time !== '' && dropAddress !== '' && address !== '') {

            await Axios.post('https://smartfarm012.herokuapp.com/TransportBooking', {
                name: name,
                email: udata.email,
                number: number,
                quantity: quality,
                date: data.date,
                farmname: data.farmname,
                coustumeremail: data.coustumeremail,
                time: time,
                dropAddress: dropAddress,
                pickupAddress: address,
            }).then(alert('Submit'))
        }else{
            alert('some filed empty')
        }
    }
    return (
        <ScrollView>
            <Center flex={1} px="3">
                <Box w="100%" p="10px">
                    <Box mt="10" height="100%">
                        <Center>
                            <Heading mt="30px" mb='10'>Booking Form!</Heading>

                            <Input
                                onChangeText={(val) => setName(val)}
                                borderRadius='30'
                                value={name}
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Coustumer Name" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setNumber(val)}
                                value={number}
                                borderRadius='30'
                                mt="16px"
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Coustumer Number" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setQuality(val)}
                                value={quality}
                                borderRadius='30'
                                mt="16px"
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Coustumer quantity" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setTime(val)}
                                value={time}
                                borderRadius='30'
                                mt="16px"
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Pickup Time" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />

                            <Input
                                onChangeText={(val) => setAddress(val)}
                                value={address}
                                borderRadius='30'
                                mt="16px"
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Pickup Address" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setDropAddress(val)}
                                value={dropAddress}
                                borderRadius='30'
                                mt="16px"
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="user" />}
                                        size="4"
                                        m={4}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                placeholder="Drop Address" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Box width="50%" mt="5">
                                <VStack space={3}>
                                    <Button
                                        borderRadius='30'
                                        h="48px"
                                        onPress={() => Submit()
                                        }
                                    >
                                        Add Package!
                                    </Button>
                                </VStack>
                            </Box>
                        </Center>
                    </Box>

                </Box>
            </Center>
        </ScrollView>
    )
}
