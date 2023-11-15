import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useGeneral } from '../../hooks/General';
import { useModal } from '../../hooks/Modal';
import UserInactivity from 'react-native-user-inactivity';
import ModalAlert from '../../components/Modal';


function SearchPlateScreen(props) {
  console.log(props)
  const { navigation } = props
  const { open, setOpen } = useModal()

  const { setAcumShowForm, setShowForm } = useGeneral()
  const [active, setActive] = useState(true);
  const [hola, setHola] = useState('');
  const [timer, setTimer] = useState(3000);


  useEffect(() => {
    if (!active) {
      setShowForm(false)
      setAcumShowForm(0)
    }
  }, [active]);

  useEffect(() => {

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

  return (
    <>
      {
        (open) && (
          <ModalAlert
            action={() => { console.log("codigo copiar") }}
            title='Código'
            buttonCancel
            cancel={() => setOpen(false)}
          >

            <Text>Para poder usar la APP debe conceder los permisos de ubicación</Text>

          </ModalAlert>
        )
      }
      <View style={styles.container}>
        {/* <UserInactivity
        isActive={active}
        timeForInactivity={timer}
        onAction={isActive => { setActive(isActive); }}
        style={{ flex: 1, paddingTop: '10%' }}
      > */}
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
            >
              Buscar
            </Button>
          </View>
          <View>
            <Text style={{ textAlign: 'center' }}>{active ? 'ACTIVE' : 'NOT ACTIVE'}</Text>
          </View>
        </View>
        {/* </UserInactivity> */}
      </View>
    </>
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