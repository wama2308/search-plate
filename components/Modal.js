import React, { Children } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
// import { useUser } from '../../hooks/User';


export default function ModalAlert(props) {
    // const { permissionLocation, permissionCamera } = useUser();

    const handleOk = () => {
        props.action()
    };

    const handleCancel = () => {
        props.cancel()
    };

    const modalHeader = (
        <View style={styles.modalHeader}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.divider}></View>
        </View>
    )

    const modalBody = (
        <View style={styles.modalBody}>
            <Text style={styles.bodyText}>{props.children}</Text>
        </View>
    )

    const modalFooter = (
        <View style={styles.modalFooter}>
            <View style={styles.divider}></View>
            <View style={{ flexDirection: "row-reverse", margin: 10 }}>
                <TouchableOpacity
                    style={{ ...styles.actions, backgroundColor: "#007bff" }}
                    onPress={handleOk}
                >
                    <Text style={styles.actionText}>Copiar</Text>
                </TouchableOpacity>
                {
                    (props.buttonCancel) && (
                        <TouchableOpacity
                            style={{ ...styles.actions, backgroundColor: "#dc3545" }}
                            onPress={handleCancel}
                        >
                            <Text style={styles.actionText}>Cancel</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )

    const modalContainer = (
        <View style={styles.modalContainer}>
            {modalHeader}
            {modalBody}
            {modalFooter}
        </View>
    )

    const modal = (
        <Modal
            transparent={false}
            visible={props.open}
            onRequestClose={handleCancel}>
            <View style={styles.modal}>
                <View>
                    {modalContainer}
                </View>
            </View>
        </Modal>
    )

    return (
        <View>
            {modal}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: "#00000099",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: "#f9fafb",
        width: "100%",
        borderRadius: 5,
        maxWidth: '95%',
        margin: 0

    },
    modalHeader: {

    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 15,
        color: "#000"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray"
    },
    modalBody: {                
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    modalFooter: {
    },
    actions: {
        borderRadius: 5,
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    actionText: {
        color: "#fff"
    }
});