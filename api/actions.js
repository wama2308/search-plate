import axios from 'axios'

export const deviceExistAction = (data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/device/exist`, data)
            .then(res => {
                resolve(res)
            })
            .catch(error => {                
                reject(error)
            })
    })
}

export const registerDeviceLocationAction = (data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/device/location`, data)
            .then(res => {
                resolve(res)
            })
            .catch(error => {                
                reject(error)
            })
    })
}