import { Box, Text, Center, ScrollView, Image } from 'native-base'
import React, { useEffect, useState } from 'react'
import Axios from "axios"
import styles from './main.style'
const CateringInfo = () => {
    const [udata, setUdata] = useState([])
    useEffect(() => {
        Axios.get("https://smartfarm012.herokuapp.com/getUser").then(
            (reponse) => {
                const newdata = reponse.data
                setUdata(newdata.filter(x => x.userType == 'catering'))
            })
    }, [])

    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {udata.map((data) => (
                    <Box>
                        <Box style={styles.mainBox}>
                            <Text style={styles.text}>Username: {data.username}</Text>
                            <Text style={styles.text}>Useremail: {data.email}</Text>
                            <Text style={styles.text}>Userphone: {data.phoneNo}</Text>
                        </Box>
                    </Box>
                    ))}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default CateringInfo