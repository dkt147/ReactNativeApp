import { Box, Text, Center, ScrollView, Image, Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import Axios from "axios"
import styles from './main.style'
import GridImageView from 'react-native-grid-image-viewer';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getDataFromPhone } from '../packages/localStorage';
import { ActivityIndicator } from "react-native";
let UserData = ''
const FarmPackagesinfo = () => {
    const [udata, setUdata] = useState([])
    useEffect(() => {
        getDataFromPhone('UserEmail').then((res) => { UserData = res }).then(async () => await Filter())
    }, [])
    const Filter = async () => {
        await Axios.get("https://smartfarm012.herokuapp.com/getPackage").then(
            (reponse) => {
                if (UserData !== '') {
                    const newdata = reponse.data
                    setUdata(newdata)
                }
            })
    }
    console.log(udata)
    const Delete = (_id) => {
        Axios.delete(`https://smartfarm012.herokuapp.com/deletePackage/${_id}`).then(alert('Package Delete'))
    }
    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {udata != '' ?
                        udata.map((data) => (
                            <Box>
                                <Box style={styles.mainBox}>
                                    {/* <Box>
                                        <YoutubePlayer
                                            mute={true}
                                            height={200}
                                            play={false}
                                            videoId={data.Video}
                                        />
                                    </Box> */}
                                    <GridImageView data={[data.Image1, data.Image2, data.Image3]} />
                                    <Text style={styles.text}>Title: 
                                    <Text fontWeight='400'>
                                    {data.Title}</Text>
                                    </Text>
                                    <Text style={styles.text}>Description: 
                                    <Text fontWeight='400'>
                                    {data.Description}</Text>
                                    </Text>
                                    <Text style={styles.text}>Address: 
                                    <Text fontWeight='400'>
                                    {data.Address}</Text>
                                    </Text>
                                    <Text style={styles.text}>Video: 
                                    <Text fontWeight='400'>
                                    {data.Video}</Text>
                                    </Text>
                                    <Text style={styles.text}>Price For 12 Hours: 
                                    <Text fontWeight='400'>
                                    {data.PriceFor12}</Text>
                                    </Text>
                                    <Text style={styles.text}>Price For 24 Hours: 
                                    <Text fontWeight='400'>
                                    {data.PriceFor24}</Text>
                                    </Text>
                                <Button onPress={() => Delete(data._id)}>Delete</Button>
                                </Box>
                            </Box>
                        )) : <ActivityIndicator size='large' color='black' />}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default FarmPackagesinfo