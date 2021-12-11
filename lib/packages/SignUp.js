import React, { useState, useEffect } from "react";
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
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import { saveDataInPhone } from "./localStorage";

// import QuenoTextIcon from "../../../assets/images/QuenoTextIcon.png";
// import RoutesKey from "../../../navigation/routesKey";
// import { useSelector, useDispatch } from "react-redux";
// import { authOperations } from "../duck/index";
import Axios from "axios"

export default function SignUp(props) {
    //   const dispatch = useDispatch();
    //   const userData = useSelector((state) => state.main.user.initialState.user);
    //   console.log("reducer", userData);
    const navigation = useNavigation()
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [pincode, setPincode] = useState("");
    const [conformPincode, setConformPincode] = useState("");
    const [udata, setUdata] = useState([])

    useEffect(() => {
        Axios.get("https://smartfarm012.herokuapp.com/getUser").then(
            (reponse) => {
                const newdata = reponse.data
                setUdata(newdata)
            })
    }, [])
    // const userEmail = udata.filter(x => x.email == userName)
    console.log(udata)
    const login = async () => {
        try {
            if (email !== '' && phoneNo != '' && userName != '' && pincode === conformPincode) {
                auth()
                    .createUserWithEmailAndPassword(email, pincode)
                    .then(
                        Axios.post('https://smartfarm012.herokuapp.com/createUser', {
                            username: userName,
                            email: email,
                            phoneNo: phoneNo,
                            password: pincode,
                            userType: 'user'
                        }).then(saveDataInPhone('userEmail', JSON.stringify(userEmail[0])))
                    ).then((res) => console.log('res', res))
            } 
            if (userName == '' || pincode == '' || email == '' || phoneNo == '') {
                alert('Password Not Match Or Field Are Empty')
            }

        } catch (error) {
            alert(error)
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
                                        Sign Up!
                                    </Button>
                                    <HStack mt='6' justifyContent='center'>
                                        <Text fontSize='sm'
                                            color='coolGray.600'
                                        >
                                            All ready have Account{' '}
                                        </Text>
                                        <Link onPress={() => props.navigation.navigate('signin')}>Sign in</Link>
                                    </HStack>
                                </VStack>
                            </Box>
                        </Center>
                    </Box>
                </Box>
            </Center>
        </ScrollView>
    );
}