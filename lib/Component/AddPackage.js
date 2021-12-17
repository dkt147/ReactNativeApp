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
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import Axios from "axios"
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
export default function AddPackage(props) {
    const navigation = useNavigation()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [video, setVideo] = useState("");
    const [price12, setPrice12] = useState("");
    const [price24, setPrice24] = useState("");

    const [newimage, setnewimage] = useState("");
    const [Img, setImg] = useState("");
    const [newimage2, setnewimage2] = useState("");
    const [Img2, setImg2] = useState("");
    const [newimage3, setnewimage3] = useState("");
    const [Img3, setImg3] = useState("");
    const [ImgURL2, setImgURL2] = useState('');
    const [ImgURL3, setImgURL3] = useState('');
    const AddPackage = () => {


        if (title !== '' && description !== '' && address !== '' && video !== '' && price12 !== '' && price24 !== '') {
            getImageURLOne().then(async (imgurl) =>
                await Axios.post('https://smartfarm012.herokuapp.com/addPackage', {
                    Title: title,
                    Description: description,
                    Address: address,
                    Video: video,
                    PriceFor12: price12,
                    PriceFor24: price24,
                    Image1: imgurl,
                    Image2: ImgURL2,
                    Image3: ImgURL3,

                }).then((res) => {
                    console.log(res)
                }).then(alert('Package added')).then({
                    setTitle: setTitle(''),
                    setAddress: setAddress(''),
                    setVideo: setVideo(''),
                    setDescription: setDescription(''),
                    setPrice12: setPrice12(''),
                    setPrice24: setPrice24(''),
                })
            )
        } else {
            alert('Some field is empty ')
        }

    }

    const uploadImgOne = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async (image) => {
            console.log(image);
            const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
            setImg(imageUri);
            let imgName = image.path.substring(image.path.lastIndexOf("/") + 1);
            const reference = storage().ref(imgName);
            setnewimage(imgName);
            try {
                reference.putFile(imageUri).then(() => {
                    alert("Image Stored");
                });
            } catch (error) {
                console.log(error);
            }
        });
    };
    console.log(ImgURL2)
    async function getImageURLOne() {
        return await storage()
            .ref(newimage)
            .getDownloadURL()
            .then((uri) => {
                return uri
            })
            .catch((e) => console.log(e));
    }
    const uploadImgTwo = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async (image) => {
            console.log(image);
            const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
            setImg2(imageUri);
            let imgName = image.path.substring(image.path.lastIndexOf("/") + 1);
            const reference = storage().ref(imgName);
            setnewimage2(imgName);
            try {
                reference.putFile(imageUri).then(() => {
                    alert("Image Stored");
                });
            } catch (error) {
                console.log(error);
            }
        });
    };

    async function getImageURLTwo() {
        return await storage()
            .ref(newimage2)
            .getDownloadURL()
            .then((uri) => {
                setImgURL2(uri)
            }).then(alert('image upload success'))
            .catch((e) => console.log(e));
    }

    const uploadImgThird = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async (image) => {
            console.log(image);
            const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
            setImg3(imageUri);
            let imgName = image.path.substring(image.path.lastIndexOf("/") + 1);
            const reference = storage().ref(imgName);
            setnewimage3(imgName);
            try {
                reference.putFile(imageUri).then(() => {
                    alert("Image Stored");
                });
            } catch (error) {
                console.log(error);
            }
        });
    };

    async function getImageURLThird() {
        return await storage()
            .ref(newimage3)
            .getDownloadURL()
            .then((uri) => {
                setImgURL3(uri)
            }).then(alert('image upload success'))
            .catch((e) => console.log(e));
    }

    return (
        <ScrollView>
            <Center flex={1} px="3">
                <Box w="100%" p="10px">
                    <Box mt="10" height="100%">
                        <Center>
                            {/* <Image source={QuenoTextIcon} alt="Alternate Text" /> */}
                            <Heading mt="30px" mb='10'>Add Package!</Heading>

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
                                onChangeText={(val) => setPrice24(val)}
                                value={price24}
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
                            <Box alignSelf='flex-start' mt='10%'>
                                <Text fontSize='24'>Optional Images</Text>
                            </Box>
                            <Box mt="5%" flexDirection='row'>
                                <Box width="50%" mr='3'>
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
                                <Box width="50%">
                                    <VStack space={3}>
                                        <Button
                                            borderRadius='30'
                                            h="48px"
                                            onPress={() => getImageURLTwo()
                                            }
                                        >
                                            Upload Second Image!
                                        </Button>
                                    </VStack>
                                </Box>
                            </Box>
                            <Box mt="5%" flexDirection='row'>
                                <Box width="50%" mr='3'>
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
                                <Box width="50%">
                                    <VStack space={3}>
                                        <Button
                                            borderRadius='30'
                                            h="48px"
                                            onPress={() => getImageURLThird()
                                            }
                                        >
                                            Upload Third Image!
                                        </Button>
                                    </VStack>
                                </Box>
                            </Box>

                        </Center>
                    </Box>

                </Box>
            </Center>
        </ScrollView>
    );
}