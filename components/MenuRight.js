import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { Feather } from '@expo/vector-icons';
import { dataMenuAccount } from '../helpers/helpers';

export default function MenuRight(props) {

    const [visible, setVisible] = useState(false);
    const [dataMenu, setDataMenu] = useState(null);

    const getData = () => {
        const selectData = {
            account: dataMenuAccount,
        }
        setDataMenu(selectData[props.option])
    }

    useEffect(() => {
        getData()
    }, [])

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Menu
                visible={visible}
                anchor={<Feather
                    onPress={showMenu}
                    name="menu"
                    size={24}
                    color="black"
                />}
                onRequestClose={hideMenu}
            >
                {
                    dataMenu && dataMenu.map((menu, key) => {
                        return (
                            <MenuItem
                                key={key}
                                onPress={() => {
                                    props.action();
                                    hideMenu();
                                }}
                            >
                                {menu.label}
                            </MenuItem>
                        )
                    })
                }

            </Menu>
        </View>
    );
}