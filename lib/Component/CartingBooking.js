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
import {getDataFromPhone} from '../packages/localStorage'
export default function CartingBooking({ route }) {
    const { data } = route.params;
    console.log('data',data)
    const navigation = useNavigation()
    const [name, setName] = React.useState("")
    const [number, setNumber] = React.useState("")
    const [quality, setQuality] = React.useState("")
    const [time, setTime] = React.useState('')
    const [dropAddress, setDropAddress] = React.useState('')
      const [udata, setUData] = useState('')
    useEffect(() => {
        getDataFromPhone('userEmail').then((res) => setUData(JSON.parse(res)))
      }, [])

      console.log(udata)
    const Submit = async () => {
        await Axios.post('https://smartfarm012.herokuapp.com/CartingBooking', {
            name: name,
            email:udata.email,
            number: number,
            quantity: quality,
            date: data.date,
            farmname:data.farmname,
            coustumeremail:data.coustumeremail,
            time:time,
            dropAddress:dropAddress,
        }).then(alert('Submit'))
    }
    return (
        <ScrollView>
            <Center flex={1} px="3">
                <Box w="100%" p="10px">
                    <Box mt="10" height="100%">
                        <Center>
                            <Heading mt="30px" mb='10'>Carting Form!</Heading>

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
                                placeholder="Drop Time" // mx={4}
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
