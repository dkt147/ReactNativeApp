import { Box, Text, Center, ScrollView, Image } from 'native-base'
import React, { useEffect, useState } from 'react'
import Axios from "axios"
import styles from './main.style'
const AllPackages = () => {
    const [udata, setUdata] = useState([])
    useEffect(() => {
        Axios.get("https://smartfarm012.herokuapp.com/getPackage").then(
            (reponse) => {
                const newdata = reponse.data
                setUdata(newdata)
            })
    }, [])

    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {udata.map((data) => (
                    <Box>
                        <Box style={styles.mainBox}>
                            <Text style={styles.text}>Title: {data.Title}</Text>
                            <Text style={styles.text}>Description: {data.Description}</Text>
                            <Text style={styles.text}>Address: {data.Address}</Text>
                            <Text style={styles.text}>Video: {data.Video}</Text>
                            <Text style={styles.text}>Price For 12 Hours: {data.PriceFor12}</Text>
                            <Text style={styles.text}>Price For 24 Hours: {data.PriceFor24}</Text>
                        </Box>
                    </Box>
                    ))}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default AllPackages