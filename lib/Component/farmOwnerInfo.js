import { Box, Text, Center, ScrollView, Image, Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import Axios from "axios"
import styles from './main.style'
const farmOwnerInfo = () => {
    const [udata, setUdata] = useState([])
    useEffect(() => {
        Axios.get("https://smartfarm012.herokuapp.com/getUser").then(
            (reponse) => {
                const newdata = reponse.data
                setUdata(newdata.filter(x => x.userType == 'Farmhouse'))
            })
    }, [])

    const Delete = (_id) => {
        Axios.delete(`https://smartfarm012.herokuapp.com/deleteUser/${_id}`).then(alert('User Delete'))
    }

    return (
        <ScrollView>
            <Center mt="5" px="3">
                <Box w="100%" p="10px">
                    {udata.map((data) => (
                    <Box>
                        <Box style={styles.mainBox}>
                            <Text style={styles.text}>Username: 
                            <Text fontWeight='400'>
                            {data.username}</Text>
                                    </Text>
                            <Text style={styles.text}>Useremail: 
                            <Text fontWeight='400'>
                            {data.email}</Text>
                                    </Text>
                            <Text style={styles.text}>Userphone: 
                            <Text fontWeight='400'>
                            {data.phoneNo}</Text>
                                    </Text>
                            <Button onPress={() => Delete(data._id)}>Delete</Button>
                        </Box>
                    </Box>
                    ))}
                </Box>
            </Center>
        </ScrollView>
    )
}

export default farmOwnerInfo