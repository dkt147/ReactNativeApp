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
const Home = () => {
  const navigation = useNavigation()
  const [udata, setUdata] = useState([])
  const [udata1, setUdata1] = useState([])
  const [udata2, setUdata2] = useState([])
  useEffect(() => {
    Axios.get("https://smartfarm012.herokuapp.com/getPackage").then(
      (reponse) => {
        const newdata = reponse.data
        setUdata(newdata.filter((x) => x.Category == 'Diamond'))
      })
  }, [])
  useEffect(() => {
    Axios.get("https://smartfarm012.herokuapp.com/getPackage").then(
      (reponse) => {
        const newdata = reponse.data
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
          <Box mt="10" >
            <Box borderTopRightRadius='20' bg='#25A9B6' w='50%' mb='5'>
              <Text fontSize='24' ml='20%'>Diamond</Text>
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
                  <Box borderRadius='20' borderWidth='1' borderColor='black.100' mr="7">
                    <ImageBackground
                      resizeMode="stretch"
                      borderRadius={10}
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
              <Text fontSize='24' ml='20%'>Golden</Text>
            </Box>
            {udata != '' ?
              <FlatList
                horizontal={true}
                flexDirection="row"
                data={udata1}
                onRefresh={onRefresh}
                refreshing={isFetching}
                extraData={udata1}
                renderItem={({ item }) => (
                  <Box borderRadius='20' borderWidth='1' borderColor='black.100' mr="7">
                    <ImageBackground
                      resizeMode="stretch"
                      borderRadius={10}
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
              <Text fontSize='24' ml='20%'>Silver</Text>
            </Box>
            {udata != '' ?
              <FlatList
                horizontal={true}
                flexDirection="row"
                data={udata2}
                onRefresh={onRefresh}
                refreshing={isFetching}
                extraData={udata2}
                renderItem={({ item }) => (
                  <Box borderRadius='20' borderWidth='1' borderColor='black.100' mr="7">
                    <ImageBackground
                      resizeMode="stretch"
                      borderRadius={10}
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
        </Box>
      </Center>
    </ScrollView>
  )
}

export default Home
