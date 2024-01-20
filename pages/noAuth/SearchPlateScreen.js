import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Application from 'expo-application';
import * as Clipboard from 'expo-clipboard';
import UserInactivity from 'react-native-user-inactivity';
import ModalAlert from '../../components/Modal';
import { useGeneral } from '../../hooks/General';
import { useModal } from '../../hooks/Modal';
import { deviceExistAction, searchPlateAction } from '../../api/actions';
import { flashMessageAction } from '../../helpers/helpers';


function SearchPlateScreen(props) {
  //console.log(props)
  const { navigation } = props
  const { open, setOpen } = useModal()

  const { setAcumShowForm, setShowForm, activeDevice, setActiveDevice } = useGeneral()
  const [active, setActive] = useState(true);
  const [plate, setPlate] = useState('');
  const [plateShow, setPlateShow] = useState('');
  const [errorPlate, setErrorPlate] = useState(false);
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(30000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!active) {
      setShowForm(false)
      setAcumShowForm(0)
    }
  }, [active]);

  useEffect(() => {
    setOpen(false)
  }, []);

  const searchPlate = () => {
    if (plate) {
      setLoading(true)
      setData(null)
      searchPlateAction({
        plate: plate
      })
        .then((res) => {
          if (res.data === 'no_exist') {
            setData(res.data)
            setPlateShow(plate)
            setPlate('')
          } else {
            if (res.data.data && res.data.result) {
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
        .finally(() => {
          setLoading(false)
          outScreen()
        })
    } else {
      setErrorPlate(true)
    }
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(Application.androidId);
  };

  const outScreen = () => {
    const timer = setTimeout(() => {
      setShowForm(false);
      setAcumShowForm(0);
    }, 5000);
    return () => clearTimeout(timer);
  }

  const retryConnection = () => {
    setLoading(true)
    deviceExistAction({
      code: Application.androidId
    })
      .then((res) => {
        if (res.data) {
          setActiveDevice(true)
          flashMessageAction(
            "¡Dispositivo verificado!",
            "success",
          );
        } else {
          setActiveDevice(false)
          flashMessageAction(
            "¡Error de conexión con el servidor, verifique su conexión a internet o intente mas tarde!",
            "danger"
          );
        }
      })
      .catch(() => {
        setActiveDevice(false)
        flashMessageAction(
          "¡Error de conexión con el servidor, verifique su conexión a internet o intente mas tarde!",
          "danger"
        );
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
      <ScrollView style={styles.container} >
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
            {
              activeDevice ?
                <Button
                  mode="contained"
                  buttonColor="#0d6efd"
                  onPress={() => searchPlate()}
                  disabled={(!activeDevice || loading) ? true : false}
                  loading={loading}
                >
                  {loading ? '' : 'Buscar'}
                </Button>
                :
                <Button
                  mode="contained"
                  buttonColor="#0d6efd"
                  onPress={() => retryConnection()}
                  disabled={loading ? true : false}
                  loading={loading}
                >
                  {loading ? '' : 'Reconectar'}
                </Button>
            }
          </View>
          <View style={{ marginTop: 10, justifyContent: 'center' }}>
            <Button
              mode="contained"
              buttonColor="#dc3545"
              onPress={() => {
                setShowForm(false);
                setAcumShowForm(0);
              }}
              disabled={loading}
            >
              Atras
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
                    data.notes.length ?
                      <SafeAreaView style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 700 }}>
                          NOTAS
                        </Text>
                        {
                          data.notes.map((item, index) => (
                            <Text style={{ color: '#000', fontSize: 16, fontWeight: 400 }} key={index}>
                              {`-) ${item.note}`}
                            </Text>
                          ))
                        }
                        {/* <FlatList
                          data={data.notes?.length ? epale : []}
                          renderItem={({ item }) =>
                            <Text style={{ color: '#000', fontSize: 16, fontWeight: 400 }}>
                              {`-) ${item.note}`}
                            </Text>
                          }
                          keyExtractor={item => item.id}
                          scrollEnabled
                        /> */}
                      </SafeAreaView>
                      :
                      null
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
      </ScrollView>
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