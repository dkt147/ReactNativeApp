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
  FlatList

} from "native-base";
import React, { useState, useEffect } from "react";
import Axios from "axios"
import { ImageBackground, ActivityIndicator } from "react-native";
import styles from "./Home.style";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from 'react-native'
import moment from "moment"
let lng = ''
const Home = () => {
  const navigation = useNavigation()
  const [udata, setUdata] = useState([])
  const [udata1, setUdata1] = useState([])
  const [udata2, setUdata2] = useState([])
  const [udata3, setUdata3] = useState([])
  const [showModal2, setShowModal2] = useState(true)
  const [price, setPrice] = useState(0)
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    Axios.get("https://smartfarm012.herokuapp.com/getPackage").then(
      (reponse) => {
        const newdata = reponse.data
        setMasterDataSource(newdata)
        setUdata(newdata.filter((x) => x.Category == 'Diamond'))
      })
  }, [])
  useEffect(() => {
    Axios.get("https://smartfarm012.herokuapp.com/getPackage").then(
      (reponse) => {
        const newdata = reponse.data
        lng = newdata.length
        setUdata1(newdata.filter((x) => x.Category == 'Golden'))
      })
  }, [])
  useEffect(() => {
    Axios.get("https://smartfarm012.herokuapp.com/getPackage").then(
      (reponse) => {
        const newdata = reponse.data
        setUdata2(newdata.filter((x) => x.Category == 'Silver'))
      })
  }, [])

  const filter = () => {
 
    if (price !== '') {
      const newData = masterDataSource.filter(x => moment(x.PriceFor12) <= moment(price))
      navigation.navigate('Search', { data: newData })
    } else {
      alert('Please enter price')
    }

  }
  
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    setIsFetching(false);
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };
  return (
    <ScrollView>
      <Center flex={1} px="3">
        <Box w="100%" p="2px">
          <TouchableOpacity style={{ marginTop: '2%' }} onPress={() => setShowModal2(true)}>
            <Box borderRadius={20} bg='#25A9B6' h='10' p='3' flexDirection='row' ml='auto'>
              <Text mt='-1' fontFamily='Ubuntu-Regular'>Enter Desired Budget</Text>
            </Box>
          </TouchableOpacity>
          <Box mt="5" >
            <Box borderTopRightRadius='20' bg='#25A9B6' w='50%' mb='5'>

              <Text fontSize='24' style={styles.Heading} ml='20%' >Diamond</Text>
            </Box>
            {udata != '' ?
              <FlatList
                horizontal={true}
                flexDirection="row"
                data={udata}
                onRefresh={onRefresh}
                refreshing={isFetching}
                extraData={udata}
                renderItem={({ item }) => (
                  <Box borderRadius='20' p='2' borderWidth='1' borderColor='black.100' mr="7">
                    <ImageBackground
                      resizeMode="cover"
                      borderRadius={20}
                      style={{
                        opacity: 0.8
                      }}
                      source={{ uri: item.Image1 }}
                    >
                      <Box style={styles.couseBox1} />
                    </ImageBackground>
                    <Text style={styles.courseHeading} fontSize="24">
                      {item.Title}
                    </Text>
                    <Box mt='1' w='100' ml='auto' mr='2' mb='2'>
                      <Button rounded='20' onPress={() => navigation.navigate('ProductPage', { data: item })}>Booking</Button>
                    </Box>
                  </Box>
                )}
              />
              : <ActivityIndicator color='#25A9B6' size='large' />}
          </Box>
          <Box mt="10" >
            <Box borderTopRightRadius='20' bg='#25A9B6' w='50%' mb='5'>
              <Text fontSize='24' style={styles.Heading} ml='20%'>Golden</Text>
            </Box>
            {udata1 != '' ?
              <FlatList
                horizontal={true}
                flexDirection="row"
                data={udata1}
                onRefresh={onRefresh}
                refreshing={isFetching}
                extraData={udata1}
                renderItem={({ item }) => (
                  <Box borderRadius='20' p='2' borderWidth='1' borderColor='black.100' mr="7">
                    <ImageBackground
                      resizeMode="cover"
                      borderRadius={20}
                      style={{
                        opacity: 0.8
                      }}
                      source={{ uri: item.Image1 }}
                    >
                      <Box style={styles.couseBox1} />
                    </ImageBackground>
                    <Text style={styles.courseHeading} fontSize="24">
                      {item.Title}
                    </Text>
                    <Box mt='4' w='100' ml='auto' mr='2' mb='2'>
                      <Button rounded='20' onPress={() => navigation.navigate('ProductPage', { data: item })}>Booking</Button>
                    </Box>
                  </Box>
                )}
              />
              : <ActivityIndicator color='#25A9B6' size='large' />}
          </Box>
          <Box mt="10" >
            <Box borderTopRightRadius='20' bg='#25A9B6' w='50%' mb='5'>
              <Text fontSize='24' style={styles.Heading} ml='20%'>Silver</Text>
            </Box>
            {udata2 != '' ?
              <FlatList
                horizontal={true}
                flexDirection="row"
                data={udata2}
                onRefresh={onRefresh}
                refreshing={isFetching}
                extraData={udata2}
                renderItem={({ item }) => (
                  <Box borderRadius='20' p='2' borderWidth='1' borderColor='black.100' mr="7">
                    <ImageBackground
                      resizeMode="cover"
                      borderRadius={20}
                      style={{
                        opacity: 0.8
                      }}
                      source={{ uri: item.Image1 }}
                    >
                      <Box style={styles.couseBox1} />
                    </ImageBackground>
                    <Text style={styles.courseHeading} fontSize="24">
                      {item.Title}
                    </Text>
                    <Box mt='4' w='100' ml='auto' mr='2' mb='2'>
                      <Button rounded='20' onPress={() => navigation.navigate('ProductPage', { data: item })}>Booking</Button>
                    </Box>
                  </Box>
                )}
              />
              : <ActivityIndicator color='#25A9B6' size='large' />}
          </Box>
          <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
            <Modal.Content w="100%">
              <Modal.Body p='8'>
                <Box borderRadius='15' w='100%' alignSelf='center' p='0%'>
                  <Input
                    pl='5'
                    onChangeText={(text) => setPrice(text)}
                    borderRadius='30'
                    keyboardType='numeric'
                    value={price}
                    placeholder="Enter Your Budget Price" // mx={4}
                    _light={{
                      placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                      placeholderTextColor: "blueGray.50",
                    }}
                  />
                </Box>
                <Box flexDirection='row'>
                  <Button mt='5' w='50%' borderRadius='20' onPress={() => setShowModal2(false)} >Close</Button>
                  <Button mt='5' w='50%' mr='2' borderRadius='20' onPress={() => filter()} >Ok</Button>
                </Box>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </Box>
      </Center>
    </ScrollView>
  )
}

export default Home
