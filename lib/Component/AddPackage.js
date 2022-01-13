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
    CheckIcon,
    Select,
    Modal,
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import Axios from "axios"
import { launchImageLibrary } from 'react-native-image-picker';
import storage from "@react-native-firebase/storage";
import { getDataFromPhone } from '../packages/localStorage'
import { utils } from '@react-native-firebase/app';
export default function AddPackage(props) {
    const navigation = useNavigation()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [video, setVideo] = useState("");
    const [price12, setPrice12] = useState("");
    const [price24, setPrice24] = useState("");
    let [service, setService] = React.useState("")
    const [Img, setImg] = useState("");
    const [ImgURL2, setImgURL2] = useState('');
    const [ImgURL3, setImgURL3] = useState('');
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)
    const [data, setData] = useState('')
    const [number, setNumber] = useState('')


    useEffect(() => {
        getDataFromPhone('userEmail').then((res) => setData(JSON.parse(res)))
    }, [])
    const AddPackage = () => {


        if (title !== '' && description !== '' && address !== '' && video !== '' && price12 !== '' && price24 !== '' && service !== '' && Img !== '') {
            Axios.post('https://smartfarm012.herokuapp.com/addPackage', {
                Title: title,
                Description: description,
                Address: address,
                Video: video,
                PriceFor12: price12,
                PriceFor24: price24,
                Image1: Img,
                Image2: ImgURL2,
                Account: number,
                Image3: ImgURL3,
                Email: data.email,
                Category: service,

            }).then((res) => {
                console.log(res)
            }).then(alert('Package added')).then({
                setTitle: setTitle(''),
                setAddress: setAddress(''),
                setVideo: setVideo(''),
                setDescription: setDescription(''),
                setPrice12: setPrice12(''),
                setPrice24: setPrice24(''),
                setNumber: setNumber(''),
            })
        } else {
            alert('Some field is empty ')
        }

    }

    const uploadImgOne = () => {
        const options = {
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName;
                const source = {
                    uri,
                    type,
                    name,
                }
                cloudinaryUploadOne(source)
            }
        });
    };
    const cloudinaryUploadOne = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'hl08r4ih')
        data.append("cloud_name", "da6xurnwg")
        fetch("https://api.cloudinary.com/v1_1/da6xurnwg/upload", {
            method: "post",
            body: data
        }).then(res => (res.json()))
            .then(data => {
                setImg(data.url)
            }).then(async () => await alert('Submit')).catch(err => {
                alert(err)
            })
    }
    console.log(Img)
    const uploadImgTwo = () => {
        const options = {
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName;
                const source = {
                    uri,
                    type,
                    name,
                }
                cloudinaryUploadTwo(source)
            }
        });
    };

    const cloudinaryUploadTwo = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'hl08r4ih')
        data.append("cloud_name", "da6xurnwg")
        fetch("https://api.cloudinary.com/v1_1/da6xurnwg/upload", {
            method: "post",
            body: data
        }).then(res => (res.json()))
            .then(data => {
                setImgURL2(data.url)
            }).then(async () => await alert('Submit')).catch(err => {
                alert(err)
            })
    }


    const uploadImgThird = () => {
        const options = {
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName;
                const source = {
                    uri,
                    type,
                    name,
                }
                cloudinaryUploadThree(source)
            }
        });
    };

    const cloudinaryUploadThree = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'hl08r4ih')
        data.append("cloud_name", "da6xurnwg")
        fetch("https://api.cloudinary.com/v1_1/da6xurnwg/upload", {
            method: "post",
            body: data
        }).then(res => (res.json()))
            .then(data => {
                setImgURL3(data.url)
            }).then(async () => await alert('Submit')).catch(err => {
                alert(err)
            })
    }


    return (
        <ScrollView>
            <Center flex={1} px="3">
                <Box w="100%" p="10px">
                    <Box mt="10" height="100%">
                        <Center>
                            {/* <Image source={QuenoTextIcon} alt="Alternate Text" /> */}
                            <Heading mt="30px" mb='10' fontFamily='Merriweather'>Add Package!</Heading>

                            <Input
                                onChangeText={(val) => setTitle(val)}
                                borderRadius='30'
                                value={title}
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
                                placeholder="Farmhouse Title" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setDescription(val)}
                                value={description}
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
                                placeholder="Farmhouse Description" // mx={4}
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
                                placeholder="Farmhouse Address" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setVideo(val)}
                                value={video}
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
                                placeholder="Farmhouse Video Link" // mx={4}
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
                                keyboardType='numeric'
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
                                placeholder="Enter Your jazzcash or easypaisa number" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setPrice24(val)}
                                value={price24}
                                borderRadius='30'
                                mt="16px"
                                keyboardType='numeric'
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
                                placeholder="Farmhouse Price For 24 Hours" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                onChangeText={(val) => setPrice12(val)}
                                value={price12}
                                borderRadius='30'
                                mt="16px"
                                keyboardType='numeric'
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
                                placeholder="Farmhouse Price For 12 Hours" // mx={4}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Box mt='2'>
                                <Select
                                    selectedValue={service}
                                    minWidth="360"
                                    borderRadius='20'
                                    accessibilityLabel="Choose Service"
                                    placeholder="Choose Service"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />,
                                    }}
                                    mt={1}
                                    onValueChange={(itemValue) => setService(itemValue)}
                                >
                                    <Select.Item label="Diamond (71K To 100K)" value="Diamond" />
                                    <Select.Item label="Golden (41K To 70K)" value="Golden" />
                                    <Select.Item label="Silver (15K To 40K)" value="Silver" />
                                </Select>
                            </Box>
                            <Box width="80%" mt="10">
                                <VStack space={3}>
                                    <Button
                                        borderRadius='30'
                                        h="48px"
                                        onPress={() => uploadImgOne()
                                        }
                                    >
                                        Select First Image!
                                    </Button>
                                </VStack>
                            </Box>
                            <Box width="80%" mt='5'>
                                <VStack space={3}>
                                    <Button
                                        borderRadius='30'
                                        h="48px"
                                        onPress={() => uploadImgTwo()
                                        }
                                    >
                                        Select Second Image!
                                    </Button>
                                </VStack>
                            </Box>
                            <Box width="80%" mt='5'>
                                <VStack space={3}>
                                    <Button
                                        borderRadius='30'
                                        h="48px"
                                        onPress={() => uploadImgThird()
                                        }
                                    >
                                        Select Third Image!
                                    </Button>
                                </VStack>
                            </Box>
                            <Box width="50%" mt="5">
                                <VStack space={3}>
                                    <Button
                                        borderRadius='30'
                                        h="48px"
                                        onPress={() => AddPackage()
                                        }
                                    >
                                        Add Package!
                                    </Button>
                                </VStack>
                            </Box>
                            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.Body p='8'>
                                        <Text alignSelf='center' fontSize='20' mb='5'>Image Upload</Text>
                                        <Button borderRadius='20' onPress={() => (getImageURLTwo(), setShowModal2(false))
                                        }>Ok</Button>
                                    </Modal.Body>
                                </Modal.Content>
                            </Modal>
                            <Modal isOpen={showModal3} onClose={() => setShowModal3(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.Body p='8'>
                                        <Text alignSelf='center' fontSize='20' mb='5'>Image Upload</Text>
                                        <Button borderRadius='20' onPress={() => (getImageURLThird(), setShowModal3(false))
                                        }>Ok</Button>
                                    </Modal.Body>
                                </Modal.Content>
                            </Modal>
                        </Center>
                    </Box>

                </Box>
            </Center>
        </ScrollView>
    );
}