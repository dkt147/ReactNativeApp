import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveDataInPhone(key, data) {
    // let data1=JSON.stringify(data);
    AsyncStorage.setItem(key, data).then(() => {
        console.log('data saved');
    });
}


export async function getDataFromPhone(key) {
    return new Promise((resolve) => {
        AsyncStorage.getItem(key).then((res) => {
            //   let data=JSON.parse(res);
            resolve(res);
            // console.log('res',res);

            // return data
        });
    });
}

export async function removeStorage(key) {
    AsyncStorage.removeItem(key).then((res) => {
        console.log('removeRes', res)
    })}