import { Box, Text, Center, ScrollView, Image } from 'native-base'
import React, { useEffect, useState } from 'react'
import Axios from "axios"
import styles from './main.style'
import GridImageView from 'react-native-grid-image-viewer';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getDataFromPhone } from '../packages/localStorage';
import { ActivityIndicator } from "react-native";
let UserData = ''
const AllPackages = () => {
    const [udata, setUdata] = useState([])
    useEffect(() => {
        getDataFromPhone('UserEmail').then((res) => { UserData = res }).then(async () => await Filter())
    }, [])
    const Filter = async () => {
        await Axios.get("https://smartfarm012.herokuapp.com/getPackage").then(
            (reponse) => {
                if (UserData !== '') {
                    const newdata = reponse.data
                    setUdata(newdata.filter((x) => x.Email === UserData))
                }
            })
    }
    console.log(udata)
    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {udata != '' ?
                        udata.map((data) => (
                            <Box>
                                <Box style={styles.mainBox}>
                                    <Box>
                                        <YoutubePlayer
                                            mute={true}
                                            height={200}
                                            play={false}
                                            videoId={data.Video}
                                        />
                                    </Box>
                                    <GridImageView data={[data.Image1, data.Image2, data.Image3]} />
                                    <Text style={styles.text}>Title: {data.Title}</Text>
                                    <Text style={styles.text}>Description: {data.Description}</Text>
                                    <Text style={styles.text}>Address: {data.Address}</Text>
                                    <Text style={styles.text}>Video: {data.Video}</Text>
                                    <Text style={styles.text}>Price For 12 Hours: {data.PriceFor12}</Text>
                                    <Text style={styles.text}>Price For 24 Hours: {data.PriceFor24}</Text>
                                </Box>
                            </Box>
                        )) : <ActivityIndicator size='large' color='black' />}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default AllPackages