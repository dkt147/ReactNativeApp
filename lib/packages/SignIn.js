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
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import Axios from "axios"
// import QuenoTextIcon from "../../../assets/images/QuenoTextIcon.png";
// import RoutesKey from "../../../navigation/routesKey";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../Store/reducers/userReducer";
import { saveDataInPhone } from "./localStorage";
import { TouchableOpacity } from 'react-native'
// import PushNotification from "react-native-push-notification";

export default function SignIn(props) {
    const [show, setShow] = React.useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    //   const userData = useSelector((state) => state.main.user.initialState.user);
    //   console.log("reducer", userData);
    const [userName, setUserName] = useState("");
    const [pincode, setPincode] = useState("");
    const [udata, setUdata] = useState([])
    useEffect(() => {
        Axios.get("https://smartfarm012.herokuapp.com/getUser").then(
            (reponse) => {
                const newdata = reponse.data
                setUdata(newdata)
            })
        // createChannel()
    }, [])

    const userInfo = udata.filter(x => x.email == userName).map((data) => data.userType)
    const email = udata.filter(x => x.email == userName).map((data) => data.email)
    const userEmail = udata.filter(x => x.email == userName)
    console.log('email', email[0])
    const login = async () => {
        try {
            if (userName == email[0]) {
                if (userName !== '' && pincode !== '') {
                    await
                        auth()
                            .signInWithEmailAndPassword(userName, pincode).then(
                                // dispatch(loginUser(udata.filter(x => x.email == userName) )),
                                saveDataInPhone('userData', userInfo[0]),
                                saveDataInPhone('userEmail', JSON.stringify(userEmail[0])),
                                saveDataInPhone('UserEmail', email[0]) ,
                            )
                }

                if (userName == '' || pincode == '') {
                    alert('Please Enter Email and Password')
                }
            } else {
                alert('user not found')
            }
        } catch (error) {
            alert(error)
        }

    }


    // const createChannel = () => {
    //     PushNotification.createChannel(
    //         {
    //             channelId: 'test-channel',
    //             channelName: 'Test channel'
    //         }
    //     )
    // }

    return (
        <ScrollView>
            <Center flex={1} px="3">
                <Box w="100%" p="5px">
                    <Box mt="1/3" height="110%">
                        <Center>
                            <Image source={require('../Assets/farmLogo-removebg-preview.png')} />
                            <Heading mb="20px" size="sm">
                                Sign In
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
                                    <TouchableOpacity onPress={() => setShow(!show)}>
                                        <Icon
                                            as={<FontAwesome5 name={show ? "eye-slash" : 'eye'} />}
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
                                    </TouchableOpacity>
                                }
                                type={show ? "text" : "password"}
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
                                        Sign In!
                                    </Button>
                                    <HStack mt='6' justifyContent='center'>
                                        <Text fontSize='sm'
                                            color='coolGray.600'
                                        >
                                            I'm a new user{' '}
                                        </Text>
                                        <Link onPress={() => navigation.navigate('signup')}>Sign Up</Link>
                                    </HStack>
                                    <HStack mt='6' justifyContent='center'>
                                        <Text fontSize='sm'
                                            color='coolGray.600'
                                        >
                                            For vendors {' '}
                                        </Text>
                                        <Link onPress={() => navigation.navigate('VentorReg')}>Registration</Link>
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