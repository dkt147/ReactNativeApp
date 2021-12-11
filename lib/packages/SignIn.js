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
export default function SignIn(props) {
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
    }, [])

   const userInfo = udata.filter(x => x.email == userName).map((data) => data.userType)
   const userEmail = udata.filter(x => x.email == userName)
   console.log('email',userInfo)
    const login = async () => {
        try {
            if (userName !== '' && pincode !== '') {
                await 
                auth()
                    .signInWithEmailAndPassword(userName, pincode).then(
                        // dispatch(loginUser(udata.filter(x => x.email == userName) )),
                        saveDataInPhone('userData', userInfo[0] ) ,
                        saveDataInPhone('userEmail', JSON.stringify(userEmail[0]) ) ,
                    console.log(udata.filter(x => x.email == userName) )
                    )
            }

            if (userName == '' || pincode == '') {
                alert('Please Enter Email and Password')
            }

        } catch (error) {
            alert(error)
        }

    }

    return (
        <Center flex={1} px="3">
            <Box w="100%" p="10px">
                <Box mt="1/3" height="100%">
                    <Center>
                        {/* <Image source={QuenoTextIcon} alt="Alternate Text" /> */}
                        <Heading mt="30px">Welcome to Smart Farm’s Loop!</Heading>
                        <Heading mt="30px" mb="20px" size="sm">
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
                            </VStack>
                        </Box>
                    </Center>
                </Box>
            </Box>
        </Center>
    );
}