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
import CalendarPicker from 'react-native-calendar-picker';
import {getDataFromPhone} from '../localStorage'
export default function Booking({ route }) {
    const { data } = route.params;
    console.log(data)
    const navigation = useNavigation()
    const [name, setName] = React.useState("")
    const [number, setNumber] = React.useState("")
    const [quality, setQuality] = React.useState("")
    const [value, setValue] = React.useState("")
    const [showModal2, setShowModal2] = useState(false)
    const [selectDate, setSelectDate] = React.useState(null)
      const [udata, setUData] = useState('')
    useEffect(() => {
        getDataFromPhone('userEmail').then((res) => setUData(JSON.parse(res)))
      }, [])

      console.log(udata)
    const Submit = async () => {
        const date = (`${selectDate.date()}.${selectDate.month()}.${selectDate.year()}`)
        await Axios.post('https://smartfarm012.herokuapp.com/userBooking', {
            name: name,
            email:udata.email,
            number: number,
            quantity: quality,
            day: value,
            date: date,
            farmname:data.Title,
            owneremail:data.Email,
            coustumeremail:udata.email,
        }).then(alert('Submit'))
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
                            <Radio.Group
                                name="myRadioGroup"
                                accessibilityLabel="favorite number"
                                value={value}
                                onChange={(nextValue) => {
                                    setValue(nextValue)
                                }}
                            >
                                <Box flexDirection='row'>
                                    <Radio value="Full Day" my={1} mr='2'>
                                        Full Day
                                    </Radio>
                                    <Radio value="Half Day" my={1}>
                                        Half Day
                                    </Radio>
                                </Box>
                            </Radio.Group>
                            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                                <Modal.Content w="100%">
                                    <Modal.Body p='8'>
                                    <Box borderRadius='15' w='100%' alignSelf='center' p='0%'>
                                        <CalendarPicker
                                            onDateChange={val => setSelectDate(val)}
                                            width={340}
                                            previousTitleStyle={{ color: 'black', }}
                                            nextTitleStyle={{ color: 'black', }}
                                        />
                                    </Box>
                                        <Button borderRadius='20' onPress={() => (Submit(), setShowModal2(false))
                                        }>Ok</Button>
                                    </Modal.Body>
                                </Modal.Content>
                            </Modal>
                            <Box width="50%" mt="5">
                                <VStack space={3}>
                                    <Button
                                        borderRadius='30'
                                        h="48px"
                                        onPress={() => setShowModal2(true)
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
