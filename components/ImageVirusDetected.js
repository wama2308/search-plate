import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import { useGeneral } from '../hooks/General';

const ImageVirusDetected = () => {
    const { acumShowForm, setAcumShowForm } = useGeneral()
    return (
        <TouchableOpacity style={styles.container} onPress={() => setAcumShowForm(acumShowForm + 1)}>
            <Image
                source={require('../assets/virus-detected.jpg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch'
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
});

export default ImageVirusDetected