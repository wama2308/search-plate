import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Application from 'expo-application';
import * as Clipboard from 'expo-clipboard';
import UserInactivity from 'react-native-user-inactivity';
import ModalAlert from '../../components/Modal';
import { useGeneral } from '../../hooks/General';
import { useModal } from '../../hooks/Modal';
import { searchPlateAction } from '../../api/actions';


function SearchPlateScreen(props) {
  //console.log(props)
  const { navigation } = props
  const { open, setOpen } = useModal()

  const { setAcumShowForm, setShowForm, activeDevice } = useGeneral()
  const [active, setActive] = useState(true);
  const [plate, setPlate] = useState('');
  const [plateShow, setPlateShow] = useState('');
  const [errorPlate, setErrorPlate] = useState(false);
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(600000);
  const [loading, setLoading] = useState(false);
  const notes = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];


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

  const searchPlate = () => {
    if (plate) {
      setLoading(true)
      setData(null)
      searchPlateAction({
        plate: plate
      })
        .then((res) => {
          console.log("inicio ", res)
          if (res.data === 'no_exist') {
            setData(res.data)
            setPlateShow(plate)
            setPlate('')
          } else {
            if (res.data.data && res.data.count && res.data.result) {
              console.log("siiiii ", res.data.data)
              setData(res.data.data)
              setCount(res.data.count)
              setResult(res.data.result)
              setPlateShow(plate)
              setPlate('')
            } else {
              setData(null)
              setCount(null)
              setResult(null)
              setPlateShow('')
            }
          }
        })
        .catch((error) => {
          setData(null)
          setCount(null)
          setResult(null)
          setPlateShow('')
        })
        .finally(() => setLoading(false))
    } else {
      setErrorPlate(true)
    }
  }

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
              onChangeText={(e) => { setPlate(e); setErrorPlate(false); }}
              mode='outlined'
              activeOutlineColor="#0d6efd"
              value={plate}
              error={errorPlate}
              disabled={loading}
            />
            {
              errorPlate && (
                <Text style={styles.errorMessages}>Debe ingresar la placa</Text>
              )
            }
          </View>
          <View style={{ marginTop: 20, justifyContent: 'center' }}>
            <Button
              mode="contained"
              buttonColor="#0d6efd"
              onPress={() => searchPlate()}
              disabled={(!activeDevice || loading) ? true : false}
              loading={loading}
            >
              {loading ? '' : 'Buscar'}
            </Button>
          </View>
          <View>
            {/* <Text style={{ textAlign: 'center' }}>{active ? 'ACTIVE' : 'NOT ACTIVE'}</Text> */}
            {
              !activeDevice && (
                <Text style={{ color: 'red', textAlign: 'center' }}>¡Para poder consultar una placa debe registrar su dispositivo!</Text>
              )
            }
          </View>
          {
            (data && data === 'no_exist') && (
              <View style={styles.noExist}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{plateShow}</Text>
              </View>
            )
          }
          {
            (data && data !== 'no_exist') && (
              <>
                <View style={styles.viewYellow}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 700 }}>ALINEADA:</Text>
                    <Text style={{ color: '#000', fontSize: 16, marginLeft: 5 }}>{data.created_at}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 700 }}>ÚLTIMO PAGO:</Text>
                    <Text style={{ color: '#000', fontSize: 16, marginLeft: 5 }}>{data.last_payment}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 700 }}>
                      {data.replacement === 'NO' ? 'RUTA' : "REPUESTOS"}
                    </Text>
                  </View>
                  {
                    notes.length && (
                      <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 700 }}>
                          Notas
                        </Text>
                        <FlatList
                          data={notes}
                          renderItem={({ item }) => <Item title={item.title} />}
                          keyExtractor={item => item.id}
                        />
                      </View>
                    )
                  }
                </View>
                <View style={{ ...styles.result, backgroundColor: result === 'solvent' ? 'green' : 'red' }}>
                  <View>
                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>{plateShow}</Text>
                  </View>
                  <View>
                    <Text style={{ color: '#fff', fontSize: 18 }}>+{count}</Text>
                  </View>
                </View>
              </>
            )
          }
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

  },
  errorMessages: {
    color: '#A91D13'
  },
  noExist: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    borderRadius: 5,
  },
  viewYellow: {
    display: 'flex',
    backgroundColor: 'yellow',
    marginTop: 20,
    borderRadius: 5,
    padding: 15
  },
  result: {
    display: 'flex',
    marginTop: 20,
    borderRadius: 5,
    padding: 15
  }
});

export default SearchPlateScreen

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);