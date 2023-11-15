import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchPlateScreen from './SearchPlateScreen';
import MenuRight from '../../components/MenuRight';
import { useModal } from '../../hooks/Modal';

const Stack = createNativeStackNavigator();

function RoutesNoAuth(props) {
    const { navigation } = props;

    const { open, setOpen } = useModal()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="searchPlate"
                component={SearchPlateScreen}
                options={{ 
                    title: 'Buscar placa',
                    headerRight: () => (
                        <MenuRight
                            navigation={navigation}
                            option='account'
                            logoutAction={() => setOpen(true)}
                        />
                    ), 
                }}
                
            />
        </Stack.Navigator>
    );
}

export default RoutesNoAuth;
