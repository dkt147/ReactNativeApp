import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    ImageBackground
} from 'react-native';
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
import { useNavigation } from "@react-navigation/native";

const Search = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation()
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        fetch('https://smartfarm012.herokuapp.com/getPackage')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    console.log(data)
    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.PriceFor12
                        ? item.PriceFor12.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text;
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }

    };
    const nopackage = () => {
        alert('nopackage')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    data={data !== [] ? data : (() => nopackage()) }
                    // extraData={data !== ''? data : filteredDataSource}
                    renderItem={({ item }) => (
                        <Box borderRadius='20' borderWidth='1' borderColor='black.100' mt='4' w='98%' alignSelf='center'>
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
                            <Text style={styles.courseHeading} fontSize="20">
                                Name: {item.Title}
                            </Text>
                            <Text style={styles.courseHeading} fontSize="18">
                                Price for 12 Hours: {item.PriceFor12}
                            </Text>
                            <Text style={styles.courseHeading} fontSize="18">
                                Price for 24 Hours: {item.PriceFor24}
                            </Text>
                            <Box mt='1' w='100' ml='auto' mr='2' mb='2'>
                                <Button rounded='20' onPress={() => navigation.navigate('ProductPage', { data: item })}>Booking</Button>
                            </Box>
                        </Box>
                    )}
                />

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
});

export default Search;