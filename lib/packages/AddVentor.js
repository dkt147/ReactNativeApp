import React, { useState } from "react";
// 1. import `NativeBaseProvider` component
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
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import Axios from "axios"

export default function AddVentor(props) {
    const navigation = useNavigation()
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [pincode, setPincode] = useState("");
    const [conformPincode, setConformPincode] = useState("");
    let [service, setService] = React.useState("")

    const login = async () => {
        if (email !== '' && pincode === conformPincode) {
            auth()
                .createUserWithEmailAndPassword(email, pincode)
                .then(
                    Axios.post('https://smartfarm012.herokuapp.com/createUser', {
                        username: userName,
                        email: email,
                        phoneNo: phoneNo,
                        password: pincode,
                        userType: service
                    }).then((res) => {
                        console.log(res)
                    })
                )
        } else {
            alert('Password Not Match or some field is empty ')
        }
    }

    return (
        <ScrollView>
            <Center flex={1} px="3">
                <Box w="100%" p="10px">
                    <Box mt="1/3" height="100%">
                        <Center>
                            {/* <Image source={QuenoTextIcon} alt="Alternate Text" /> */}
                            <Heading mt="30px">Welcome to Smart Farm’s Loop!</Heading>
                            <Heading mt="30px" mb="20px" size="sm">
                                Sign up
                            </Heading>

                            <Input
                                onChangeText={(val) => setUserName(val)}
                                borderRadius='30'
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
                                placeholder="Username" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setEmail(val)}
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
                                placeholder="Email" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setPhoneNo(val)}
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
                                placeholder="Phone No" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />

                            <Input
                                onChangeText={(val) => setPincode(val)}
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="lock" outli={false} outline />}
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
                                InputRightElement={
                                    <Icon
                                        as={<FontAwesome5 name="eye-slash" />}
                                        size="4"
                                        m={4}
                                        mr="5"

                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                type="password"
                                placeholder="Password" // mx={4}
                                mt="16px"
                                borderRadius='30'
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setConformPincode(val)}
                                InputLeftElement={
                                    <Icon
                                        as={<FontAwesome5 name="lock" outli={false} outline />}
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
                                InputRightElement={
                                    <Icon
                                        as={<FontAwesome5 name="eye-slash" />}
                                        size="4"
                                        m={4}
                                        mr="5"

                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    />
                                }
                                type="password"
                                placeholder="Conform Password" // mx={4}
                                mt="16px"
                                borderRadius='30'
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />

                            <VStack mt="16px" alignItems="center" space={4}>
                                <Select
                                    borderRadius='30'
                                    
                                    selectedValue={service}
                                    minWidth="360"
                                    accessibilityLabel="Choose Type"
                                    placeholder="Choose Type"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />,
                                    }}
                                    mt={1}
                                    onValueChange={(itemValue) => setService(itemValue)}
                                >
                                    <Select.Item label="Catering" value="catering" />
                                    <Select.Item label="Transport" value="Transport" />
                                    <Select.Item label="Farmhouse" value="Farmhouse" />
                                </Select>
                            </VStack>
                            <Box width="100%" mt="10">
                                <VStack space={3}>
                                    <Button
                                        borderRadius='30'
                                        h="48px"
                                        onPress={() => login()
                                            // authOperations.login(data, dispatch).then((res) => {
                                            //   if(res.role == 'student'){
                                            //   }
                                            // }
                                            // )
                                        }
                                    >
                                        Add Ventor!
                                    </Button>
                                </VStack>
                            </Box>
                        </Center>
                    </Box>
                </Box>
            </Center>
        </ScrollView>
    );
}