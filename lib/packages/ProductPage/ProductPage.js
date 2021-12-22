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
    Divider
} from "native-base";
import YoutubePlayer from 'react-native-youtube-iframe';
import GridImageView from 'react-native-grid-image-viewer';
import { useNavigation } from "@react-navigation/native";

export default function ProductPage({ route }) {
    const navigation = useNavigation()

    const { data } = route.params;
    return (
        <ScrollView >
            <Center mt="5" px="3">
                {data !== '' ? 
                <Box w="100%" p="10px">
                    <Box borderRadius={20}>
                        <YoutubePlayer
                            style={{ borderRadius: 20, }}
                            mute={true}
                            height={200}
                            play={false}
                            videoId={data.Video}
                        />
                    </Box>
                    <Box mt='5'>
                        <GridImageView data={[data.Image1, data.Image2, data.Image3]} />
                    </Box>
                    <Box bg='#25A9B6' borderRadius='10'>
                        <Text fontSize='24' alignSelf='center' color='white'>FarmHouse Detail</Text>
                    </Box>
                    <Box mt='3'>
                        <Text fontSize='18'>Name: {data.Title}</Text>
                        <Text fontSize='18'>Address: {data.Address}</Text>
                        <Text fontSize='18'>Category: {data.Category}</Text>
                        <Text fontSize='18'>Full day Price: {data.PriceFor12}</Text>
                        <Text fontSize='18'>HalF day Price: {data.PriceFor24}</Text>
                    </Box>
                    <Box mt='5' bg='#25A9B6' borderRadius='20'>
                        <Text mt='2' alignSelf='center' fontSize='16' color='white'>Description</Text>
                        <Divider mb='2' alignSelf='center' w='50%' />
                        <Text mb='3' alignSelf='center' color='white'>{data.Description}</Text>
                    </Box>
                    <Button mt='5' rounded={20} w='50%' alignSelf='center' onPress={() => navigation.navigate('Booking', { data: data})}>Booking</Button>
                </Box>
                :null}
            </Center>
        </ScrollView>
    )
}
