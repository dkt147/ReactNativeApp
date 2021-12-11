import {
  Box,
  Text,
  Center,
  VStack,
  ScrollView,
  Avatar,
  Image,
  Switch,
  Input,
  Icon,
  Button,
  Modal
} from "native-base";
import React, { useState, useEffect } from "react";
import styles from "./Profile.style.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
//   import RoutesKey from "../../navigation/routesKey";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import { getDataFromPhone, removeStorage } from "../localStorage.js";
import Axios from "axios"

export default function profile() {
  const [udata, setUdata] = useState([])
  const [data, setData] = useState('')
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [conformPincode, setConformPincode] = useState("");
  useEffect(() => {
    getDataFromPhone('userEmail').then((res) => setData(JSON.parse(res)) )
  }, [])
  console.log('user',data)
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation()

 console.log('profile',data)
  const logout = async () => {
    try {
      await auth().signOut().then(navigation.navigate('signin'))
    } catch (error) {
      alert(error);
    }
  }


  return (
    <ScrollView>
      <Center mt="5" px="3">
        <Box w="100%" p="10px">
          <VStack>
            <Box mt='5'>
              <Avatar
                size="xl"
                alignSelf="center"
              // source={require("../../assets/shapes/kidprofile.png")}
              />
            </Box>
           
            {/* {udata.map((data) => ( */}

            {/* <Box style={styles.box2}>
              <Input
                mb="5"
                defaultValue={data.username}
                // value={userName}
                InputLeftElement={
                  <>
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
                  </>
                }
                InputRightElement={
                  <Icon
                    as={<Feather name="edit-3" />}
                    size="4"
                    m={4}
                    mr="5"
                    _light={{
                      color: 'black',
                    }}
                    _dark={{
                      color: 'gray.300',
                    }}
                  />
                }
                placeholder="Login" // mx={4}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
              <Input
                mb="5"
                defaultValue={data.phoneNo}
                // value={phoneNo}
                InputLeftElement={
                  <>
                    <Icon
                      as={<Feather name="phone" />}
                      size="4"
                      m={4}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  </>
                }
                InputRightElement={
                  <Icon
                    as={<Feather name="edit-3" />}
                    size="4"
                    m={4}
                    mr="5"
                    _light={{
                      color: 'black',
                    }}
                    _dark={{
                      color: 'gray.300',
                    }}
                  />
                }
                placeholder="Login" // mx={4}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
              <Input
                mb="5"
                defaultValue={data.email}
                InputLeftElement={
                  <>
                    <Icon
                      as={<Ionicons name="mail-outline" />}
                      size="4"
                      m={4}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  </>
                }
                InputRightElement={
                  <Icon
                    as={<Feather name="edit-3" />}
                    size="4"
                    m={4}
                    mr="5"
                    _light={{
                      color: 'black',
                    }}
                    _dark={{
                      color: 'gray.300',
                    }}
                  />
                }
                placeholder="Login" // mx={4}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
              <Input
                mb="5"
                defaultValue={data.password}
                // value={pincode}
                type="password"
                InputLeftElement={
                  <>
                    <Icon
                      as={<Ionicons name="lock-closed-outline" />}
                      size="4"
                      m={4}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  </>
                }
                InputRightElement={
                  <Icon
                    as={<Feather name="edit-3" />}
                    size="4"
                    m={4}
                    mr="5"
                    _light={{
                      color: 'black',
                    }}
                    _dark={{
                      color: 'gray.300',
                    }}
                  />
                }
                placeholder="Login" // mx={4}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
              <Input
                mb="5"
                value={conformPincode}
                type="password"
                InputLeftElement={
                  <>
                    <Icon
                      as={<Ionicons name="lock-closed-outline" />}
                      size="4"
                      m={4}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  </>
                }
                InputRightElement={
                  <Icon
                    as={<Feather name="edit-3" />}
                    size="4"
                    m={4}
                    mr="5"
                    _light={{
                      color: 'black',
                    }}
                    _dark={{
                      color: 'gray.300',
                    }}
                  />
                }
                placeholder="Login" // mx={4}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
            </Box> */}
             {/* ))} */}
            <Button style={styles.btn} borderRadius='30' w='100%' onPress={() => setShowModal(true)}>Update</Button>
            <Button style={styles.btn} borderRadius='30' w='50%' onPress={() =>
              logout().then
                (setShowModal(false)).then(
                  removeStorage('userData'),
                  removeStorage('userEmail')
                )}>Signout</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content borderRadius="30" w="343px" h="505px">
                <Modal.CloseButton />
                <Modal.Body>
                  <Center>
                    <Image
                      // source={require("../../assets/images/scooty.png")}
                      alt="logoutimage"
                    />
                    <Text fontSize="18px">
                      Changes saved
                    </Text>
                    <Box flexDirection="row" mt="10">
                      <Button
                        w="120px"
                        h="40px"
                        onPress={() =>
                          logout().then
                            (setShowModal(false)).then(
                              removeStorage('userData'),
                              removeStorage('userEmail')
                            )}
                      >
                        OK
                      </Button>
                    </Box>
                  </Center>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
}