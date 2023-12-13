import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Application from 'expo-application';
import { deviceExistAction, registerDeviceLocationAction } from './api/actions';

import ImageVirusDetected from './components/ImageVirusDetected';
import RoutesNoAuth from './pages/noAuth/RoutesNoAuth';
import { useGeneral } from './hooks/General';
import { useModal } from "./hooks/Modal";
import { flashMessageAction } from "./helpers/helpers";
import ModalAlert from "./components/Modal";

function SelectRoute() {
    const { showForm, acumShowForm, activeDevice, setActiveDevice } = useGeneral()
    const { open, setOpen } = useModal()
    const [locationBackground, setLocationBackground] = useState(null);
    const [permissionLocation, setPermissionLocation] = useState(null);
    const [timerCount, increaseTimer] = useState(0);

    // console.log("showForm ", showForm)
    // console.log("acumShowForm ", acumShowForm)

    useEffect(() => {
        console.log("aaaaa ", Application.androidId)
        deviceExistAction({
            code: Application.androidId
        })
            .then((res) => {
                if (res.data) {
                    console.log("siiii")
                    setActiveDevice(true)
                } else {
                    console.log("nooo")
                    setActiveDevice(false)
                }
            })
            .catch((error) => {
                console.log("error en el select route hola ", error)
                setActiveDevice(false)
            })
        getPermissions()
    }, []);

    useEffect(() => {
        let myTimerId;

        myTimerId = setInterval(() => {
            increaseTimer(timerCount + 1);
            if (locationBackground && activeDevice) {
                console.log("locationBackground ", locationBackground)
                console.log("activeDevice ", activeDevice)
                registerDeviceLocationAction({
                    lat: locationBackground.latitude,
                    log: locationBackground.longitude,
                    device_id: Application.androidId
                })
            }
        }, 10000);

        return () => clearInterval(myTimerId);
    }, [timerCount]);


    const getPermissions = () => {
        Location.requestForegroundPermissionsAsync()
            .then((res) => {
                setPermissionLocation(res)
            })
            .catch((error) => {
                setPermissionLocation(null)
            })
    }

    const currentPosition = async () => {
        await Location.watchPositionAsync({ accuracy: Location.Accuracy.BestForNavigation }, backgroundPosition)
    }

    const backgroundPosition = (position) => {
        setLocationBackground(position.coords)
    }

    useEffect(() => {
        if (permissionLocation && permissionLocation.status !== 'granted' && permissionLocation.canAskAgain) {
            setOpen(true)
            return
        }
        if (permissionLocation && permissionLocation.status !== 'granted' && !permissionLocation.canAskAgain) {
            flashMessageAction(
                "Debe ir al administrador de aplicaciones de su dispositivo para otorgar permisos de ubicación a la APP",
                "warning"
            );
            return
        }
        if (permissionLocation && permissionLocation.status === 'granted') {
            currentPosition()
        }
    }, [permissionLocation]);

    return (
        <>
            {
                (open && permissionLocation && permissionLocation.status !== 'granted' && permissionLocation.canAskAgain) && (
                    <ModalAlert
                        action={() => {
                            setPermissionLocation(null)
                            setOpen(false);
                            getPermissions()
                        }}
                        title='Permisos de ubicación'
                    >

                        <Text>Para poder usar la APP debe conceder los permisos de ubicación</Text>

                    </ModalAlert>
                )
            }
            <NavigationContainer>
                {
                    showForm ?
                        <RoutesNoAuth />
                        :
                        <ImageVirusDetected />
                }

            </NavigationContainer>
        </>
    );
}

export default SelectRoute;