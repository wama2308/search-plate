import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Application from 'expo-application';
import * as Clipboard from 'expo-clipboard';
import UserInactivity from 'react-native-user-inactivity';
import ModalAlert from '../../components/Modal';
import { useGeneral } from '../../hooks/General';
import { useModal } from '../../hooks/Modal';


function SearchPlateScreen(props) {
  //console.log(props)
  const { navigation } = props
  const { open, setOpen } = useModal()

  const { setAcumShowForm, setShowForm, activeDevice } = useGeneral()
  const [active, setActive] = useState(true);
  const [hola, setHola] = useState('');
  const [timer, setTimer] = useState(5000);


  useEffect(() => {
    if (!active) {
      setShowForm(false)
      setAcumShowForm(0)
    }
  }, [active]);

  useEffect(() => {
    setOpen(false)
    // const interval = setInterval(() => {
    //   console.log('Hola');
    // }, 5000);

    // const interval_ = setInterval(() => {
    //   console.log('Como estas?');
    // }, 10000);
    // return () => { clearInterval(interval); clearInterval(interval_); };
    // if (showForm) {

    //AQUIIIII  
    // const interval = setInterval(() => {
    //   console.log('Interval')
    //   setShowForm(false)
    //   setAcumShowForm(0)
    // }, 10000);

    // return () => clearInterval(interval);
    //}
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(Application.androidId);
  };

  return (
    <UserInactivity
      isActive={active}
      timeForInactivity={timer}
      onAction={isActive => { setActive(isActive); }}
      style={{ flex: 1 }}
    >
      {
        (open) && (
          <ModalAlert
            action={() => { copyToClipboard(); setOpen(false) }}
            title='Copiar código'
            buttonCancel
            cancel={() => setOpen(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, paddingHorizontal: 20 }}>{Application.androidId}</Text>
            </View>
          </ModalAlert>
        )
      }
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <TextInput
              label='Placa'
              onChangeText={(e) => setHola(e)}
              mode='outlined'
              activeOutlineColor="#0d6efd"
              value={hola}
            />

          </View>
          <View style={{ marginTop: 20, justifyContent: 'center' }}>
            <Button
              mode="contained"
              buttonColor="#0d6efd"
              onPress={() => navigation.navigate('searchPlate')}
              disabled={!activeDevice}
            >
              Buscar
            </Button>
          </View>
          <View>
            <Text style={{ textAlign: 'center' }}>{active ? 'ACTIVE' : 'NOT ACTIVE'}</Text>
            <Text style={{color: 'red', textAlign:'center'}}>¡Para poder consultar una placa debe registrar su dispositivo!</Text>
          </View>
        </View>
      </View>
    </UserInactivity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dedede',
  },
  content: {
    display: 'flex',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,

  }
});

export default SearchPlateScreen